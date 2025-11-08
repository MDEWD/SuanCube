import { useNavigate } from 'react-router-dom';
import { 
  CloudOutlined, 
  DatabaseOutlined, 
  QuestionCircleOutlined, 
  FileTextOutlined, 
  SoundOutlined, 
  ContactsOutlined,
  RightOutlined,
  NotificationOutlined,
  RocketOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import { Button, Popover, List, Tag, Typography } from 'antd';

const Header: React.FC = () => {
  const { Text } = Typography;
  const navigate = useNavigate(); // 获取navigate对象用于路由跳转
  
  // 最新更新数据
  const updatesData = [
    {
      title: '新功能发布：算力市场竞价模式',
      description: '2024-01-15 · 新增了算力竞价功能，可以更灵活地租用算力',
      tag: <Tag icon={<RocketOutlined />} color="green">新功能</Tag>,
      icon: <RocketOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
    },
    {
      title: '价格调整通知',
      description: '2024-01-10 · 部分算力产品价格优化调整',
      tag: <Tag icon={<NotificationOutlined />} color="orange">公告</Tag>,
      icon: <NotificationOutlined style={{ color: '#fa8c16', fontSize: '16px' }} />
    },
    {
      title: '安全升级完成',
      description: '2024-01-05 · 完成系统安全升级，提升数据保护能力',
      tag: <Tag icon={<SafetyOutlined />} color="red">安全</Tag>,
      icon: <SafetyOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
    },
    {
      title: 'API文档更新',
      description: '2024-01-03 · 更新了开发者API接口文档',
      tag: <Tag icon={<FileTextOutlined />} color="blue">文档</Tag>,
      icon: <FileTextOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
    }
  ];

  const navItems = [
    { icon: <CloudOutlined />, label: '算力集市', key: 'market', path: '/market' },
    { icon: <DatabaseOutlined />, label: '社区', key: 'resources', path: '/community' },
    { icon: <QuestionCircleOutlined />, label: '合作伙伴', key: 'product', path: '/partner' }, // 合作伙伴页面路径
    { icon: <FileTextOutlined />, label: '高校解决方案', key: 'news', path: '/solution' },
    { icon: <SoundOutlined />, label: '帮助文档', key: 'help', path: '/help' },
    { icon: <ContactsOutlined />, label: '联系我们', key: 'contact', path: '/contact' },
  ];

  // 处理导航项点击事件
  const handleNavClick = (path: string) => {
    navigate(path);
  };

  // 最新更新Popover内容
  const updatesContent = (
    <div style={{ width: '400px', maxHeight: '500px', overflowY: 'auto' }}>
      <div style={{ 
        padding: '12px 16px', 
        borderBottom: '1px solid #f0f0f0',
        fontSize: '16px',
        fontWeight: 600
      }}>
        最新更新
      </div>
      <List
        itemLayout="horizontal"
        dataSource={updatesData}
        renderItem={item => (
          <List.Item
            style={{ 
              padding: '16px',
              borderBottom: '1px solid #f5f5f5'
            }}
            actions={[item.tag]}
          >
            <List.Item.Meta
              avatar={item.icon}
              title={
                <Text strong style={{ fontSize: '14px' }}>
                  {item.title}
                </Text>
              }
              description={
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {item.description}
                </Text>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #f0f0f0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      height: '80px'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px',cursor: 'pointer' }}
       onClick={() => handleNavClick('/welcome')}
      >
        <div style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#000'
        }}>
          SUANQ
        </div>
        <div style={{
        fontSize: '24px',
        fontWeight: 'bold',
          color: '#333'
        }}>
          算立方
        </div>
      </div>

      {/* 导航菜单 */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {navItems.map(item => (
          <div 
            key={item.key} 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'all 0.3s'
            }}
            onClick={() => handleNavClick(item.path)} // 添加点击事件
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
            }}
          >
            {item.icon}
            <span style={{ fontSize: '14px', color: '#333' }}>{item.label}</span>
          </div>
        ))}
        {/* 通知图标 */}
        <Popover
          content={updatesContent}
          title={null}
          trigger="hover"
          placement="bottomRight"
          overlayStyle={{ padding: 0 }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
            }}
          >
            <NotificationOutlined style={{ fontSize: '18px', color: '#333' }} />
          </div>
        </Popover>
      </div>

      {/* 用户操作 */}
      <div style={{ display: 'flex', gap: '1px' }}>
        <Button 
          type="primary" 
          icon={<RightOutlined />}
          onClick={() => navigate('/user/login')}
          style={{
            background: 'linear-gradient(135deg, #ff9a56 0%, #ff6b35 100%)',
            border: 'none',
            borderRadius: '20px',
            padding: '6px 16px',
            height: '40px',
            fontSize: '13px',
            fontWeight: '500',
            minWidth: '100px'
          }}
        >
          登录/注册
        </Button>
      </div>
    </div>
  );
};

export default Header;
