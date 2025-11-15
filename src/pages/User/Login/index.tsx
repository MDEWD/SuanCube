"use client";
import { useState, useEffect } from "react";
import { 
  Card, 
  Input, 
  Button, 
  Typography, 
  Space, 
  Form,
  message,
  Alert
} from "antd";
import { 
  WechatOutlined, 
  QrcodeOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { userLoginByWxOpenUsingGet } from '@/services/backend/userController';
import { useModel, history } from '@umijs/max';

const { Title, Text } = Typography;

// 开发环境固定验证码
const DEV_CODE = '123456';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setInitialState } = useModel('@@initialState');

  // 从URL参数获取验证码提示
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const showCode = urlParams.get('showCode');
    if (showCode === 'true') {
      message.info({
        content: `开发验证码：${DEV_CODE}（可直接使用此验证码登录）`,
        duration: 5,
        key: 'dev-code'
      });
    }
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // 如果是开发验证码，直接模拟登录成功
      if (values.code === DEV_CODE) {
        // 调用登录API
        const res = await userLoginByWxOpenUsingGet({
          code: DEV_CODE
        });
        
        if (res.data) {
          message.success('登录成功！');
          // 保存用户信息
          setInitialState({
            currentUser: res.data,
          });
          // 跳转到之前的页面或首页
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
        } else {
          // 如果API返回失败，使用模拟数据
          const mockUser: API.LoginUserVO = {
            id: 'dev-user-001',
            userName: '开发用户',
            userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            userRole: 'user',
            userProfile: '开发测试用户'
          };
          setInitialState({
            currentUser: mockUser,
          });
          message.success('登录成功！（开发模式）');
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
        }
      } else {
        // 普通验证码登录
        const res = await userLoginByWxOpenUsingGet({
          code: values.code
        });
        
        if (res.data) {
          message.success('登录成功！');
          setInitialState({
            currentUser: res.data,
          });
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
        } else {
          message.error('验证码错误或已过期');
        }
      }
    } catch (error: any) {
      // 如果API调用失败，开发验证码仍然可以登录
      if (values.code === DEV_CODE) {
        const mockUser: API.LoginUserVO = {
          id: 'dev-user-001',
          userName: '开发用户',
          userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          userRole: 'user',
          userProfile: '开发测试用户'
        };
        setInitialState({
          currentUser: mockUser,
        });
        message.success('登录成功！（开发模式）');
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
            <div 
              style={{
                width: '140px',
                height: '140px',
                margin: '0 auto 8px',
                background: '#fafafa',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e8e8e8'
              }}
            >
              <QrcodeOutlined style={{ fontSize: '40px', color: '#1890ff' }} />
            </div>
            <Text style={{ fontSize: '12px', color: '#666' }}>
              微信扫码关注后发送"登录"
            </Text>
          </div>

          {/* 登录表单 */}
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
                { len: 6, message: '验证码为6位数字' }
              ]}
            >
              <Input
                placeholder="输入6位验证码"
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
                登录
              </Button>
            </Form.Item>
          </Form>

          {/* 开发验证码提示 */}
          <Alert
            message={
              <Space>
                <ThunderboltOutlined />
                <Text strong>开发验证码：{DEV_CODE}</Text>
              </Space>
            }
            description="开发环境可直接使用此验证码登录，无需扫码"
            type="info"
            showIcon
            style={{ fontSize: '12px' }}
            closable
          />

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