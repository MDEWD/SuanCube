"use client";
import { useState } from "react";
import { 
  Card, 
  Input, 
  Button, 
  Typography, 
  Space, 
  Divider,
  Image,
  Alert,
  Form,
  message
} from "antd";
import { 
  WechatOutlined, 
  QrcodeOutlined,
  CustomerServiceOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success(`登录成功！验证码：${values.code}`);
      // 这里可以添加实际的登录逻辑
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <Card 
          bordered={false}
          style={{
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}
          bodyStyle={{ padding: 0 }}
        >
          <div style={{ display: 'flex', minHeight: '500px' }}>
            {/* 左侧宣传区域 */}
            <div 
              style={{
                flex: '0 0 40%',
                background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={1} style={{ color: 'white', margin: 0, fontSize: '2.5rem' }}>
                    FunHPC
                  </Title>
                  <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
                    高性能计算云平台
                  </Text>
                </div>

                <Space direction="vertical" size="middle">
                  {[
                    { icon: <ThunderboltOutlined />, text: '超高计算性能' },
                    { icon: <SafetyCertificateOutlined />, text: '简单易用操作' },
                    { icon: <WechatOutlined />, text: '极致性价比' }
                  ].map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div 
                        style={{
                          width: '32px',
                          height: '32px',
                          background: 'rgba(255,255,255,0.2)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {item.icon}
                      </div>
                      <Text style={{ color: 'white', fontSize: '16px' }}>
                        {item.text}
                      </Text>
                    </div>
                  ))}
                </Space>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <Image
                    src="/cloud-3d.png"
                    alt="cloud"
                    width={120}
                    height={120}
                    preview={false}
                    style={{ opacity: 0.9 }}
                  />
                </div>
              </Space>
            </div>

            {/* 右侧登录区域 */}
            <div 
              style={{
                flex: '0 0 60%',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                  <Title level={2} style={{ marginBottom: '8px' }}>
                    公众号登录
                  </Title>
                  <Text type="secondary">
                    关注公众号获取验证码登录
                  </Text>
                </div>

                {/* 二维码区域 */}
                <Card
                  style={{ 
                    border: '2px dashed #d9d9d9',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}
                  bodyStyle={{ padding: '24px' }}
                >
                  <Space direction="vertical" size="middle">
                    <div 
                      style={{
                        width: '160px',
                        height: '160px',
                        margin: '0 auto',
                        background: '#f5f5f5',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #e8e8e8'
                      }}
                    >
                      <QrcodeOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                    </div>
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                        微信扫描关注公众号
                      </Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        关注后发送"登录"获取验证码
                      </Text>
                    </div>
                  </Space>
                </Card>

                {/* 登录表单 */}
                <Form
                  form={form}
                  onFinish={onFinish}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    name="code"
                    label="验证码"
                    rules={[
                      { required: true, message: '请输入验证码' },
                      { len: 6, message: '验证码为6位数字' }
                    ]}
                  >
                    <Input
                      placeholder="请输入公众号获取的6位验证码"
                      prefix={<WechatOutlined style={{ color: '#1890ff' }} />}
                      maxLength={6}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      block
                      size="large"
                      style={{
                        height: '48px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}
                    >
                      登录
                    </Button>
                  </Form.Item>
                </Form>

                {/* 提示信息 */}
                <Alert
                  message="登录说明"
                  description={
                    <Space direction="vertical" size="small">
                      <Text>• 首次使用？关注公众号即可自动注册</Text>
                      <Text>• 验证码5分钟内有效</Text>
                      <Text>• 遇到问题请联系客服</Text>
                    </Space>
                  }
                  type="info"
                  showIcon
                  icon={<CustomerServiceOutlined />}
                  style={{ borderRadius: '8px' }}
                />

                <Divider>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    客服微信：funhpc-support
                  </Text>
                </Divider>
              </Space>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;