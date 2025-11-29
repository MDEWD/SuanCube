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
  Segmented
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
import { useModel, history } from '@umijs/max';
import ModeSwitch, { LoginMode } from './components/ModeSwitch';
import DevMode from './components/DevMode';

const { Title, Text } = Typography;

// 开发环境验证码映射
const DEV_CODES: Record<string, { code: string; role: string; name: string }> = {
  user: { 
    code: '123456', 
    role: 'user', 
    name: '普通用户'
  },
  partner: { 
    code: '123457', 
    role: 'partner', 
    name: '算力同盟'
  },
  admin: { 
    code: '123458', 
    role: 'admin', 
    name: '管理员'
  }
};

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [loginMode, setLoginMode] = useState<LoginMode>('wechat');
  const { setInitialState } = useModel('@@initialState');
  
  // 二维码相关状态
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [ticket, setTicket] = useState<string>('');
  const [scanned, setScanned] = useState<boolean>(false);
  const [openId, setOpenId] = useState<string>('');
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 获取二维码
  const fetchQrCode = async () => {
    setQrLoading(true);
    try {
      console.log('二维码接口响应:');
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
          form.setFieldsValue({ code: '' }); // 清空验证码输入
          // 开始轮询
          if (responseData.ticket) {
            startPolling(responseData.ticket);
          }
          console.log('二维码接口响应:', responseData);
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
        const hasOpenId = responseData?.openId;
        
        console.log('轮询检查结果:', { isScanned, hasOpenId, scanned: responseData?.scanned, openId: responseData?.openId });
        
        if (isScanned && hasOpenId) {
          // 已扫描，停止轮询
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
          setScanned(true);
          setOpenId(responseData.openId);
          console.log('扫码成功，可以输入验证码');
          message.success('扫码成功！请输入验证码');
        } else if (isScanned && !hasOpenId) {
          console.warn('已扫描但缺少 openId');
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

  // 组件挂载时，如果是公众号模式则获取二维码
  useEffect(() => {
    if (loginMode === 'wechat') {
      fetchQrCode();
    }
    
    // 组件卸载时清除轮询
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [loginMode]);

  // 模式切换时重置状态
  useEffect(() => {
    if (loginMode === 'wechat') {
      // 切换到公众号模式，获取二维码
      fetchQrCode();
    } else {
      // 切换到开发者模式，清除轮询
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
      setScanned(false);
      setQrCodeUrl('');
      setTicket('');
      setOpenId('');
      form.setFieldsValue({ code: '' }); // 清空验证码输入
    }
  }, [loginMode]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // 开发者模式：使用测试验证码登录
      if (loginMode === 'dev') {
        const devCodeEntry = Object.values(DEV_CODES).find(item => item.code === values.code);
        if (devCodeEntry) {
          const mockUser: API.LoginUserVO = {
            id: `test-${devCodeEntry.role}`,
            userName: devCodeEntry.name,
            userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            userRole: devCodeEntry.role,
            userProfile: '测试账号'
          };
          setInitialState({
            currentUser: mockUser,
          });
          message.success(`登录成功！（${devCodeEntry.name} - 开发模式）`);
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
          return;
        } else {
          message.error('验证码错误，请使用测试验证码');
          return;
        }
      }

      // 公众号模式：使用验证码和openId登录
      if (!openId) {
        message.warning('请先扫描二维码获取验证码');
        return;
      }

      const res = await userLoginByCodeUsingPost({
        code: values.code,
        openId: openId
      });
      
      if (res.code === 0 && res.data) {
        // 保存token（如果后端返回了token）
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
        
        // 保存用户信息
        if (res.data.user) {
          setInitialState({
            currentUser: res.data.user,
          });
        }
        
        message.success('登录成功！');
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
      } else {
        message.error(res.message || '验证码错误或已过期');
      }
    } catch (error: any) {
      // 如果API调用失败，开发者模式可以fallback到mock
      if (loginMode === 'dev') {
        const devCodeEntry = Object.values(DEV_CODES).find(item => item.code === values.code);
        if (devCodeEntry) {
          const mockUser: API.LoginUserVO = {
            id: `test-${devCodeEntry.role}`,
            userName: devCodeEntry.name,
            userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            userRole: devCodeEntry.role,
            userProfile: '测试账号'
          };
          setInitialState({
            currentUser: mockUser,
          });
          message.success(`登录成功！（${devCodeEntry.name} - 开发模式）`);
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
          return;
        }
      }
      message.error(`登录失败：${error.message || error.response?.data?.message || '请重试'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <Card 
        style={{
          width: '100%',
          maxWidth: '420px',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: 'none',
        }}
        bodyStyle={{ padding: '32px' }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 标题区域 */}
          <div style={{ textAlign: 'center' }}>
            <WechatOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={3} style={{ marginBottom: '8px', fontSize: '24px', fontWeight: 'bold' }}>
              欢迎登录
            </Title>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              选择登录方式
            </Text>
          </div>

          {/* 模式切换 */}
          <ModeSwitch mode={loginMode} onChange={setLoginMode} />

          {/* 公众号模式内容 */}
          {loginMode === 'wechat' && (
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

              {/* 验证码输入框（一直显示） */}
              {loginMode === 'wechat' && (
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
              )}
            </>
          )}

          {/* 开发者模式内容 */}
          {loginMode === 'dev' && (
            <DevMode form={form} onFinish={onFinish} loading={loading} />
          )}

          {/* 提示信息 */}
          {loginMode === 'wechat' && (
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                首次使用扫码关注即可注册
              </Text>
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default Login;