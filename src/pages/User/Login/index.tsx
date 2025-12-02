"use client";
import { Card, Typography, Space, message } from "antd";
import { WechatOutlined } from '@ant-design/icons';
import { useModel, history } from '@umijs/max';
import WechatCodeLogin from './components/WechatCodeLogin';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');

  // 处理登录成功
  const handleLoginSuccess = (user: API.LoginUserVO) => {
    console.log('🎉 登录成功回调被调用，用户信息:', user);
    
    if (!user) {
      console.error('❌ 用户信息为空，无法完成登录');
      message.error('登录失败：用户信息缺失');
      return;
    }
    
    try {
      // 保存用户信息到全局状态
      console.log('📝 正在设置用户状态...');
      setInitialState({
        currentUser: user,
      });
      console.log('✅ 用户状态已设置:', user);
      
      // 获取跳转地址
      const urlParams = new URL(window.location.href).searchParams;
      const redirect = urlParams.get('redirect') || '/';
      console.log('🚀 准备跳转到:', redirect);
      
      // 使用 history.push 跳转
      // 注意：如果 history.push 不生效，可能是路由配置问题
      history.push(redirect);
      console.log('✅ history.push 已调用');
      
      // 如果 500ms 后还在登录页，使用 window.location 强制跳转
      setTimeout(() => {
        if (window.location.pathname === '/user/login') {
          console.warn('⚠️ history.push 未生效，使用 window.location 强制跳转');
          window.location.href = redirect;
        } else {
          console.log('✅ 跳转成功，当前路径:', window.location.pathname);
        }
      }, 500);
    } catch (error) {
      console.error('❌ 处理登录成功时出错:', error);
      message.error('登录成功但跳转失败，请刷新页面');
      // 即使出错也尝试跳转
      const urlParams = new URL(window.location.href).searchParams;
      const redirect = urlParams.get('redirect') || '/';
      window.location.href = redirect;
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
              扫码关注公众号后输入验证码登录
            </Text>
          </div>

          {/* 微信登录 */}
          <WechatCodeLogin onLoginSuccess={handleLoginSuccess} />

          {/* 提示信息 */}
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              首次使用扫码关注即可注册
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Login;