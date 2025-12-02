"use client";
import { useState, useEffect, useRef } from "react";
import { 
  Card, 
  Input, 
  Button, 
  Typography, 
  Space, 
  Form,
  message,
  Spin,
  Avatar
} from "antd";
import { 
  WechatOutlined, 
  QrcodeOutlined,
  ReloadOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { 
  getQrCodeUsingGet, 
  checkTicketUsingGet, 
  userLoginByCodeUsingPost 
} from '@/services/backend/userController';

const { Text } = Typography;

interface WechatCodeLoginProps {
  onLoginSuccess?: (user: API.LoginUserVO) => void;
}

const WechatCodeLogin: React.FC<WechatCodeLoginProps> = ({ onLoginSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  
  // 二维码相关状态
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [ticket, setTicket] = useState<string>('');
  const [scanned, setScanned] = useState<boolean>(false);
  const [openId, setOpenId] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 获取二维码
  const fetchQrCode = async () => {
    setQrLoading(true);
    try {
      const res = await getQrCodeUsingGet();
      console.log('二维码接口响应:', res);
      // 兼容不同的响应格式
      if (res && (res.code === 0 || res.code === undefined)) {
        // 优先使用 res.data，如果没有则使用 res 本身
        const responseData = res.data || (res as any);
        if (responseData && (responseData.qrCodeUrl || responseData.ticket)) {
          setQrCodeUrl(responseData.qrCodeUrl || '');
          setTicket(responseData.ticket || '');
          setScanned(false);
          setOpenId(''); // 重置 openId
          setNickname(''); // 重置 nickname
          setAvatar(''); // 重置 avatar
          form.setFieldsValue({ code: '' }); // 清空验证码输入
          // 开始轮询
          if (responseData.ticket) {
            startPolling(responseData.ticket);
          }
          console.log('二维码接口响应:', responseData.qrCodeUrl);
        } else {
          message.error('获取二维码失败：响应数据格式错误');
        }
      } else {
        message.error(res?.message || '获取二维码失败，请重试');
      }
    } catch (error: any) {
      console.error('获取二维码错误:', error);
      // 尝试从错误响应中获取数据
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.code === 0 || errorData.data) {
          const responseData = errorData.data || (errorData as any);
          if (responseData.qrCodeUrl || responseData.ticket) {
            setQrCodeUrl(responseData.qrCodeUrl || '');
            setTicket(responseData.ticket || '');
            setScanned(false);
            setOpenId(''); // 重置 openId
            setNickname(''); // 重置 nickname
            setAvatar(''); // 重置 avatar
            form.setFieldsValue({ code: '' }); // 清空验证码输入
            if (responseData.ticket) {
              startPolling(responseData.ticket);
            }
            return;
          }
        }
      }
      message.error(`获取二维码失败：${error.message || error.response?.data?.message || '请重试'}`);
    } finally {
      setQrLoading(false);
    }
  };

  // 开始轮询检查是否已扫描
  const startPolling = (ticketValue: string) => {
    // 清除之前的轮询
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    // 开始新的轮询，每2秒检查一次
    pollingIntervalRef.current = setInterval(async () => {
      try {
        const res = await checkTicketUsingGet({ ticket: ticketValue });
        console.log('轮询检查响应（完整）:', res);
        
        // 由于使用了 skipErrorHandler，响应拦截器返回的是完整的 response 对象
        // 需要从 response.data 中获取实际数据
        let responseData: any = null;
        const resAny = res as any;
        
        // 如果 res 有 data 属性，说明是响应对象，需要取 res.data.data
        if (resAny && resAny.data) {
          // res.data 可能是 { code, data, message } 结构
          if (resAny.data.data) {
            responseData = resAny.data.data;
          } else if (resAny.data.scanned !== undefined || resAny.data.openId !== undefined) {
            // 或者 res.data 本身就是数据
            responseData = resAny.data;
          }
        } else if (resAny && typeof resAny === 'object') {
          // 如果 res 本身就是数据
          responseData = resAny;
        }
        
        console.log('解析后的响应数据:', responseData);
        
        // 检查是否已扫描（兼容字符串 'true' 和布尔值 true）
        const isScanned = responseData?.scanned === 'true' || responseData?.scanned === true;
        
        // 后端返回格式: {scanned: true, userInfo: {openId, nickname, avatar}}
        // 或者旧格式: {scanned: true, openId, nickname, avatar}
        const userInfo = responseData?.userInfo || responseData;
        const hasOpenId = userInfo?.openId;
        
        console.log('轮询检查结果:', { 
          isScanned, 
          hasOpenId, 
          scanned: responseData?.scanned, 
          openId: userInfo?.openId,
          userInfo: userInfo
        });
        
        if (isScanned && hasOpenId) {
          // 已扫描，停止轮询
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
          setScanned(true);
          setOpenId(userInfo.openId || '');
          setNickname(userInfo.nickname || '');
          setAvatar(userInfo.avatar || '');
          console.log('扫码成功，可以输入验证码', {
            openId: userInfo.openId,
            nickname: userInfo.nickname,
            avatar: userInfo.avatar
          });
          message.success('扫码成功！请输入验证码');
        } else if (isScanned && !hasOpenId) {
          console.warn('已扫描但缺少 openId', { responseData, userInfo });
        }
      } catch (error: any) {
        // 403 错误可能是接口路径不对或需要认证，记录但不中断轮询
        if (error.response?.status === 403) {
          console.warn('轮询检查权限错误(403)，可能接口路径不正确或需要认证:', error.response?.data);
        } else {
          console.error('轮询检查失败:', error);
        }
        // 继续轮询，不中断
      }
    }, 2000);

    // 5分钟后停止轮询（二维码过期）
    setTimeout(() => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
      if (!scanned) {
        message.warning('二维码已过期，请刷新重新获取');
      }
    }, 300000);
  };

  // 组件挂载时获取二维码
  useEffect(() => {
    fetchQrCode();
    
    // 组件卸载时清除轮询
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // 登录处理
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (!openId) {
        message.warning('请先扫描二维码获取验证码');
        return;
      }

      const loginParams: any = {
        code: values.code,
        openId: openId
      };
      
      // 如果提供了 nickname 和 avatar，一起发送（可选字段）
      if (nickname) {
        loginParams.nickname = nickname;
      }
      if (avatar) {
        loginParams.avatar = avatar;
      }
      
      console.log('登录请求参数:', loginParams);
      
      const res = await userLoginByCodeUsingPost(loginParams);
      console.log('登录响应（完整）:', JSON.stringify(res, null, 2));
      
      // 处理响应数据
      // 由于没有使用 skipErrorHandler，响应拦截器返回的是完整的 axios response 对象
      // 后端返回格式: {code: 0, message: "登录成功", data: {token: "...", user: {...}}}
      // 响应拦截器处理后，返回的是 response 对象
      // 所以：
      // - res = axios response 对象 {data: {code: 0, message: "...", data: {...}}, status: 200, ...}
      // - res.data = {code: 0, message: "登录成功", data: {token: "...", user: {...}}}
      // - res.data.data = {token: "...", user: {...}}
      
      const resAny = res as any;
      let responseData: any = null;
      
      // 提取登录响应数据
      if (resAny?.data?.data) {
        // 标准格式: res.data.data 包含登录响应数据
        responseData = resAny.data.data;
        console.log('✅ 使用 res.data.data 格式，提取到数据:', responseData);
      } else if (resAny?.data && (resAny.data.token || resAny.data.user)) {
        // 或者 res.data 本身就是登录响应数据（兼容格式）
        responseData = resAny.data;
        console.log('✅ 使用 res.data 格式，提取到数据:', responseData);
      } else if (resAny && (resAny.token || resAny.user)) {
        // 如果 res 本身就是登录响应数据（直接格式）
        responseData = resAny;
        console.log('✅ 使用 res 直接格式，提取到数据:', responseData);
      } else {
        console.error('❌ 无法解析响应数据，响应结构:', {
          hasRes: !!resAny,
          hasResData: !!resAny?.data,
          hasResDataData: !!resAny?.data?.data,
          resKeys: resAny ? Object.keys(resAny) : [],
          resDataKeys: resAny?.data ? Object.keys(resAny.data) : []
        });
        throw new Error('响应数据格式错误，无法解析登录信息');
      }
      
      // 验证响应数据
      if (!responseData) {
        throw new Error('响应数据为空');
      }
      
      console.log('✅ 解析后的登录响应数据:', responseData);
      console.log('✅ Token:', responseData.token ? '存在' : '不存在');
      console.log('✅ User:', responseData.user ? '存在' : '不存在');
      
      // 保存token
      if (responseData.token) {
        localStorage.setItem('token', responseData.token);
        console.log('✅ Token已保存到 localStorage');
      } else {
        console.warn('⚠️ 响应中没有 token 字段');
      }
      
      // 处理用户信息
      if (!responseData.user) {
        console.error('❌ 响应数据中没有 user 字段');
        throw new Error('登录响应中缺少用户信息');
      }
      
      // 将后端返回的用户信息映射到前端需要的格式
      const mappedUser: API.LoginUserVO = {
        id: responseData.user.id,
        userName: responseData.user.nickname || responseData.user.userName,
        userAvatar: responseData.user.avatar || responseData.user.userAvatar,
        userRole: responseData.user.userRole,
        createTime: responseData.user.createTime,
      };
      
      console.log('✅ 映射后的用户信息:', mappedUser);
      
      // 显示成功消息
      message.success('登录成功！');
      
      // 调用回调进行跳转
      if (onLoginSuccess) {
        console.log('✅ 准备调用登录成功回调');
        // 立即调用回调，不使用 setTimeout
        try {
          onLoginSuccess(mappedUser);
          console.log('✅ 登录成功回调已调用');
        } catch (callbackError) {
          console.error('❌ 调用登录成功回调时出错:', callbackError);
          throw callbackError;
        }
      } else {
        console.error('❌ onLoginSuccess 回调不存在！');
        throw new Error('登录成功回调未定义');
      }
    } catch (error: any) {
      message.error(`登录失败：${error.message || error.response?.data?.message || '请重试'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 二维码区域 */}
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        {qrLoading ? (
          <div 
            style={{
              width: '240px',
              height: '240px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fafafa',
              borderRadius: '12px',
              border: '2px dashed #d9d9d9'
            }}
          >
            <Spin size="large" />
          </div>
        ) : qrCodeUrl ? (
          <>
            <div 
              style={{
                width: '240px',
                height: '240px',
                margin: '0 auto 16px',
                background: '#ffffff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #e8e8e8',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s'
              }}
            >
              <img 
                src={qrCodeUrl} 
                alt="二维码" 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '10px'
                }} 
              />
              {scanned && (
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(24, 144, 255, 0.9)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    gap: '8px'
                  }}
                >
                  <CheckCircleOutlined style={{ fontSize: '48px', color: '#fff' }} />
                  <Text style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>
                    扫码成功
                  </Text>
                </div>
              )}
            </div>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Text style={{ fontSize: '14px', color: scanned ? '#52c41a' : '#666', fontWeight: scanned ? 'bold' : 'normal' }}>
                {scanned ? '✅ 扫码成功！请输入验证码' : '📱 微信扫码关注公众号获取验证码'}
              </Text>
              
              {/* 扫码成功后显示用户信息 */}
              {scanned && (nickname || avatar) && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: '#f0f9ff',
                  borderRadius: '8px',
                  border: '1px solid #bae7ff'
                }}>
                  {avatar ? (
                    <Avatar src={avatar} size={24} />
                  ) : (
                    <Avatar size={24} icon={<WechatOutlined />} />
                  )}
                  <Text style={{ fontSize: '13px', color: '#1890ff', fontWeight: 500 }}>
                    {nickname || '微信用户'}
                  </Text>
                </div>
              )}
              
              <Space>
                <Button 
                  type="link" 
                  size="small" 
                  icon={<ReloadOutlined />}
                  onClick={fetchQrCode}
                  style={{ fontSize: '13px' }}
                >
                  刷新二维码
                </Button>
              </Space>
            </Space>
          </>
        ) : (
          <div 
            style={{
              width: '240px',
              height: '240px',
              margin: '0 auto',
              background: '#fafafa',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #d9d9d9',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <QrcodeOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
            <Button 
              type="primary" 
              size="middle"
              onClick={fetchQrCode}
              style={{ borderRadius: '8px' }}
            >
              获取二维码
            </Button>
          </div>
        )}
      </div>

      {/* 验证码输入框 */}
      <Card
        style={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          border: 'none',
          borderRadius: '12px',
          marginTop: '16px'
        }}
        bodyStyle={{ padding: '24px' }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="code"
            style={{ marginBottom: '20px' }}
            rules={[
              { required: true, message: '请输入验证码' },
              { len: 6, message: '验证码为6位数字' },
              { pattern: /^\d{6}$/, message: '验证码必须为6位数字' }
            ]}
          >
            <Input
              placeholder="扫码获取登录验证码"
              prefix={<WechatOutlined style={{ color: '#1890ff', fontSize: '16px' }} />}
              maxLength={6}
              size="large"
              style={{ 
                fontSize: '16px',
                height: '48px',
                borderRadius: '8px'
              }}
              disabled={!openId}
            />
          </Form.Item>

          {!openId && (
            <div style={{ 
              marginBottom: '16px', 
              padding: '12px', 
              background: '#fff3cd', 
              borderRadius: '8px',
              border: '1px solid #ffc107'
            }}>
              <Text style={{ fontSize: '13px', color: '#856404' }}>
                ⚠️ 请先扫描上方二维码，关注公众号后获取验证码
              </Text>
            </div>
          )}

          {openId && (
            <div style={{ 
              marginBottom: '16px', 
              padding: '12px', 
              background: '#d4edda', 
              borderRadius: '8px',
              border: '1px solid #28a745'
            }}>
              <Text style={{ fontSize: '13px', color: '#155724' }}>
                ✅ 扫码成功！请输入公众号发送的验证码
              </Text>
            </div>
          )}

          <Form.Item style={{ marginBottom: '0' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              disabled={!openId}
              style={{
                height: '48px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                background: openId 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : '#d9d9d9',
                border: 'none',
                boxShadow: openId ? '0 4px 12px rgba(102, 126, 234, 0.4)' : 'none',
                cursor: openId ? 'pointer' : 'not-allowed'
              }}
            >
              {openId ? '登录' : '请先扫码'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default WechatCodeLogin;

