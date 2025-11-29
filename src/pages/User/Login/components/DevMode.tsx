import React from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Radio, 
  Space, 
  Typography, 
  Alert,
  Card
} from 'antd';
import { 
  WechatOutlined, 
  ThunderboltOutlined,
  UserOutlined,
  TeamOutlined,
  CrownOutlined
} from '@ant-design/icons';

const { Text } = Typography;

// 开发环境验证码映射
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

interface DevModeProps {
  form: any;
  onFinish: (values: any) => void;
  loading: boolean;
}

const DevMode: React.FC<DevModeProps> = ({ form, onFinish, loading }) => {
  const [selectedRole, setSelectedRole] = React.useState<string>('user');

  // 当选择角色改变时，自动填充对应的验证码
  React.useEffect(() => {
    const currentCode = DEV_CODES[selectedRole]?.code || DEV_CODES.user.code;
    form.setFieldsValue({ code: currentCode });
  }, [selectedRole, form]);

  return (
    <Card
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: '12px',
        marginTop: '16px'
      }}
      bodyStyle={{ padding: '20px' }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* 标题 */}
        <div style={{ textAlign: 'center' }}>
          <ThunderboltOutlined style={{ fontSize: '24px', color: '#fff', marginBottom: '8px' }} />
          <Text strong style={{ color: '#fff', fontSize: '16px', display: 'block' }}>
            开发者模式
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
            快速测试登录，无需扫码
          </Text>
        </div>

        {/* 角色选择 */}
        <div>
          <Text style={{ color: '#fff', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
            选择测试角色：
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
                      height: '40px',
                      lineHeight: '40px',
                      borderRadius: '8px',
                      background: selectedRole === key ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                      border: selectedRole === key ? '2px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.2)',
                      color: '#fff',
                      transition: 'all 0.3s'
                    }}
                  >
                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                      <Space>
                        <IconComponent style={{ fontSize: '16px' }} />
                        <span style={{ fontWeight: selectedRole === key ? 'bold' : 'normal' }}>
                          {value.name}
                        </span>
                      </Space>
                      <span style={{ 
                        background: 'rgba(255,255,255,0.2)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {value.code}
                      </span>
                    </Space>
                  </Radio.Button>
                );
              })}
            </Space>
          </Radio.Group>
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
              { len: 6, message: '验证码为6位数字' },
              { pattern: /^\d{6}$/, message: '验证码必须为6位数字' }
            ]}
          >
            <Input
              placeholder="输入6位验证码"
              prefix={<WechatOutlined style={{ color: '#fff', fontSize: '14px' }} />}
              maxLength={6}
              style={{ 
                fontSize: '14px',
                height: '40px',
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                color: '#fff'
              }}
              className="dev-mode-input"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '0' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                height: '40px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                background: '#fff',
                border: 'none',
                color: '#667eea',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              快速登录
            </Button>
          </Form.Item>
        </Form>

        {/* 提示信息 */}
        <Alert
          message={
            <Text style={{ fontSize: '12px', color: '#fff' }}>
              当前验证码：<Text strong style={{ color: '#fff' }}>
                {DEV_CODES[selectedRole]?.code || DEV_CODES.user.code}
              </Text> （{DEV_CODES[selectedRole]?.name || '普通用户'}）
            </Text>
          }
          type="info"
          showIcon={false}
          style={{ 
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px'
          }}
        />
      </Space>

      <style>{`
        .dev-mode-input input {
          background: rgba(255,255,255,0.2) !important;
          border: 1px solid rgba(255,255,255,0.3) !important;
          color: #fff !important;
        }
        .dev-mode-input input::placeholder {
          color: rgba(255,255,255,0.6) !important;
        }
        .dev-mode-input:hover input {
          border-color: rgba(255,255,255,0.5) !important;
        }
        .dev-mode-input:focus-within input {
          border-color: rgba(255,255,255,0.7) !important;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.2) !important;
        }
      `}</style>
    </Card>
  );
};

export default DevMode;

