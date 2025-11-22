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
  Alert,
  Radio,
  Spin,
  Divider
} from "antd";
import { 
  WechatOutlined, 
  QrcodeOutlined,
  ThunderboltOutlined,
  UserOutlined,
  TeamOutlined,
  CrownOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { 
  getQrCodeUsingGet, 
  checkTicketUsingGet, 
  userLoginByCodeUsingPost 
} from '@/services/backend/userController';
import { useModel, history } from '@umijs/max';

const { Title, Text } = Typography;

// 开发环境验证码映射 - 使用不同的验证码区分不同角色
const DEV_CODES: Record<string, { code: string; role: string; name: string; iconType: 'user' | 'team' | 'crown' }> = {
  user: { 
    code: '123456', 
    role: 'user', 
    name: '普通用户',
    iconType: 'user'
  },
  partner: { 
    code: '123457', 
    role: 'partner', 
    name: '算力同盟',
    iconType: 'team'
  },
  admin: { 
    code: '123458', 
    role: 'admin', 
    name: '管理员',
    iconType: 'crown'
  }
};

// 图标映射
const IconMap = {
  user: UserOutlined,
  team: TeamOutlined,
  crown: CrownOutlined
};

// 默认验证码（普通用户）
const DEFAULT_DEV_CODE = DEV_CODES.user.code;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('user');
  const { setInitialState } = useModel('@@initialState');
  
  // 二维码相关状态
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [ticket, setTicket] = useState<string>('');
  const [scanned, setScanned] = useState<boolean>(false);
  const [openId, setOpenId] = useState<string>('');
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 获取二维码
  const fetchQrCode = async () => {
    setQrLoading(true);
    try {
      const res = await getQrCodeUsingGet();
      if (res.code === 0 && res.data) {
        setQrCodeUrl(res.data.qrCodeUrl || '');
        setTicket(res.data.ticket || '');
        setScanned(false);
        setShowCodeInput(false);
        // 开始轮询
        startPolling(res.data.ticket || '');
      } else {
        message.error('获取二维码失败，请重试');
      }
    } catch (error: any) {
      message.error(`获取二维码失败：${error.message || '请重试'}`);
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
        if (res.code === 0 && res.data) {
          if (res.data.scanned === 'true' && res.data.openId) {
            // 已扫描，停止轮询
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current);
              pollingIntervalRef.current = null;
            }
            setScanned(true);
            setOpenId(res.data.openId);
            setShowCodeInput(true);
            message.success('扫码成功！请输入验证码');
          }
        }
      } catch (error) {
        // 轮询错误不显示，继续轮询
        console.error('轮询检查失败:', error);
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

  // 当选择角色改变时，自动填充对应的验证码（仅开发模式）
  useEffect(() => {
    if (!showCodeInput) {
      const currentCode = DEV_CODES[selectedRole]?.code || DEFAULT_DEV_CODE;
      form.setFieldsValue({ code: currentCode });
    }
  }, [selectedRole, form, showCodeInput]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // 检查是否是开发验证码（开发模式备用）
      const devCodeEntry = Object.values(DEV_CODES).find(item => item.code === values.code);
      
      if (devCodeEntry && !showCodeInput) {
        // 开发验证码登录（测试模式，不需要openId）
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

      // 正常流程：使用验证码和openId登录
      if (!openId) {
        message.error('请先扫描二维码');
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
      // 如果API调用失败，检查是否是开发验证码
      const devCodeEntry = Object.values(DEV_CODES).find(item => item.code === values.code);
      if (devCodeEntry && !showCodeInput) {
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
      } else {
        message.error(`登录失败：${error.message || '请重试'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        background: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <Card 
        style={{
          width: '320px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
        bodyStyle={{ padding: '20px' }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {/* 标题区域 */}
          <div style={{ textAlign: 'center' }}>
            <Title level={3} style={{ marginBottom: '4px', fontSize: '16px' }}>
              公众号登录
            </Title>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              关注公众号获取验证码
            </Text>
          </div>

          {/* 二维码区域 */}
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            {qrLoading ? (
              <div 
                style={{
                  width: '200px',
                  height: '200px',
                  margin: '0 auto 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fafafa',
                  borderRadius: '4px',
                  border: '1px solid #e8e8e8'
                }}
              >
                <Spin size="large" />
              </div>
            ) : qrCodeUrl ? (
              <>
                <div 
                  style={{
                    width: '200px',
                    height: '200px',
                    margin: '0 auto 8px',
                    background: '#ffffff',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #e8e8e8',
                    position: 'relative'
                  }}
                >
                  <img 
                    src={qrCodeUrl} 
                    alt="二维码" 
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      objectFit: 'contain'
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
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px'
                      }}
                    >
                      <Text style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>
                        已扫描
                      </Text>
                    </div>
                  )}
                </div>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Text style={{ fontSize: '12px', color: '#666' }}>
                    {scanned ? '✅ 扫码成功！请输入验证码' : '微信扫码关注公众号获取验证码'}
                  </Text>
                  <Button 
                    type="link" 
                    size="small" 
                    icon={<ReloadOutlined />}
                    onClick={fetchQrCode}
                    style={{ fontSize: '12px', padding: 0 }}
                  >
                    刷新二维码
                  </Button>
                </Space>
              </>
            ) : (
              <div 
                style={{
                  width: '200px',
                  height: '200px',
                  margin: '0 auto 8px',
                  background: '#fafafa',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e8e8e8',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <QrcodeOutlined style={{ fontSize: '40px', color: '#1890ff' }} />
                <Button 
                  type="primary" 
                  size="small"
                  onClick={fetchQrCode}
                >
                  获取二维码
                </Button>
              </div>
            )}
          </div>

          {/* 登录表单 */}
          {showCodeInput && (
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              size="small"
            >
              <Form.Item
                name="code"
                style={{ marginBottom: '16px' }}
                rules={[
                  { required: true, message: '请输入验证码' },
                  { len: 6, message: '验证码为6位数字' },
                  { pattern: /^\d{6}$/, message: '验证码必须为6位数字' }
                ]}
              >
                <Input
                  placeholder="输入6位验证码"
                  prefix={<WechatOutlined style={{ color: '#1890ff', fontSize: '12px' }} />}
                  maxLength={6}
                  style={{ fontSize: '12px' }}
                  autoFocus
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: '8px' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  style={{
                    height: '32px',
                    borderRadius: '4px',
                    fontSize: '13px'
                  }}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          )}

          {/* 开发模式：测试账号快速登录（仅在未扫码时显示） */}
          {!showCodeInput && (
            <>
              <Divider style={{ margin: '16px 0', fontSize: '12px' }}>开发模式</Divider>
              
              {/* 角色选择 */}
              <div style={{ marginBottom: '12px' }}>
                <Text style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>
                  选择测试角色（无需扫码）：
                </Text>
                <Radio.Group
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  style={{ width: '100%' }}
                  size="small"
                >
                  <Space direction="vertical" style={{ width: '100%' }} size="small">
                    {Object.entries(DEV_CODES).map(([key, value]) => {
                      const IconComponent = IconMap[value.iconType];
                      return (
                        <Radio.Button 
                          key={key} 
                          value={key}
                          style={{ 
                            width: '100%',
                            textAlign: 'left',
                            height: '36px',
                            lineHeight: '36px',
                            borderRadius: '4px'
                          }}
                        >
                          <Space>
                            <IconComponent />
                            <span>{value.name}</span>
                            <span style={{ color: '#1890ff', marginLeft: 'auto' }}>
                              验证码：{value.code}
                            </span>
                          </Space>
                        </Radio.Button>
                      );
                    })}
                  </Space>
                </Radio.Group>
              </div>

              {/* 开发验证码登录表单 */}
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                size="small"
              >
                <Form.Item
                  name="code"
                  style={{ marginBottom: '16px' }}
                  rules={[
                    { required: true, message: '请输入验证码' },
                    { len: 6, message: '验证码为6位数字' },
                    { pattern: /^\d{6}$/, message: '验证码必须为6位数字' }
                  ]}
                >
                  <Input
                    placeholder="输入6位验证码（开发模式）"
                    prefix={<WechatOutlined style={{ color: '#1890ff', fontSize: '12px' }} />}
                    maxLength={6}
                    style={{ fontSize: '12px' }}
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: '8px' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    style={{
                      height: '32px',
                      borderRadius: '4px',
                      fontSize: '13px'
                    }}
                  >
                    快速登录（开发模式）
                  </Button>
                </Form.Item>
              </Form>

              {/* 开发验证码提示 */}
              <Alert
                message={
                  <Space>
                    <ThunderboltOutlined />
                    <Text strong>
                      当前验证码：{DEV_CODES[selectedRole]?.code || DEFAULT_DEV_CODE} 
                      （{DEV_CODES[selectedRole]?.name || '普通用户'}）
                    </Text>
                  </Space>
                }
                description="开发环境可直接使用此验证码登录，无需扫码。选择不同角色使用对应验证码。"
                type="info"
                showIcon
                style={{ fontSize: '12px' }}
                closable
              />
            </>
          )}

          {/* 提示信息 */}
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: '11px' }}>
              首次使用扫码关注即可注册
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Login;