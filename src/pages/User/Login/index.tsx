"use client";
import { useState } from "react";
import { 
  Card, 
  Input, 
  Button, 
  Typography, 
  Space, 
  Form,
  message
} from "antd";
import { 
  WechatOutlined, 
  QrcodeOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success(`登录成功！验证码：${values.code}`);
    } catch (error) {
      message.error('登录失败，请重试');
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