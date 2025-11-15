import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  CloudOutlined, 
  DatabaseOutlined, 
  QuestionCircleOutlined, 
  FileTextOutlined, 
  SoundOutlined, 
  UserOutlined,
  RightOutlined,
  NotificationOutlined,
  RocketOutlined,
  SafetyOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { Button, Popover, List, Tag, Typography, Drawer, Grid } from 'antd';

const { useBreakpoint } = Grid;

const Header: React.FC = () => {
  const { Text } = Typography;
  const navigate = useNavigate(); // 获取navigate对象用于路由跳转
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  
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
    { icon: <QuestionCircleOutlined />, label: '招募算力同盟', key: 'product', path: '/partner' }, // 合作伙伴页面路径
    { icon: <FileTextOutlined />, label: '团队解决方案', key: 'news', path: '/solution' },
    { icon: <SoundOutlined />, label: '帮助文档', key: 'help', path: '/help' },
    { icon: <UserOutlined />, label: '个人中心', key: 'profile', path: '/profile' },
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
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        minHeight: '60px'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
         onClick={() => handleNavClick('/welcome')}
        >
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#000'
          }}>
            SUANQ
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            算立方
          </div>
        </div>

        {/* 桌面端导航菜单 */}
        {!isMobile && (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {navItems.map(item => (
            <div 
              key={item.key} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: '6px',
                transition: 'all 0.3s'
              }}
              onClick={() => handleNavClick(item.path)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
              }}
            >
              {item.icon}
              <span style={{ fontSize: '13px', color: '#333' }}>{item.label}</span>
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
                padding: '6px 10px',
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
              <NotificationOutlined style={{ fontSize: '16px', color: '#333' }} />
            </div>
          </Popover>
        </div>
        )}

        {/* 移动端菜单按钮和用户操作 */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {isMobile && (
            <>
              {/* 移动端通知图标 */}
              <Popover
                content={updatesContent}
                title={null}
                trigger="click"
                placement="bottomRight"
                overlayStyle={{ padding: 0 }}
              >
                <Button
                  type="text"
                  icon={<NotificationOutlined style={{ fontSize: '18px' }} />}
                  style={{ padding: '4px 8px' }}
                />
              </Popover>
              
              {/* 移动端菜单按钮 */}
              <Button
                type="text"
                icon={<MenuOutlined style={{ fontSize: '18px' }} />}
                onClick={() => setDrawerVisible(true)}
                style={{ padding: '4px 8px' }}
              />
            </>
          )}
          
          {/* 桌面端登录按钮 */}
          {!isMobile && (
            <Button 
              type="primary" 
              icon={<RightOutlined />}
              onClick={() => navigate('/user/login')}
              style={{
                background: 'linear-gradient(135deg, #ff9a56 0%, #ff6b35 100%)',
                border: 'none',
                borderRadius: '20px',
                padding: '4px 12px',
                height: '36px',
                fontSize: '12px',
                fontWeight: '500',
                minWidth: '80px',
                alignItems: 'center'
              }}
            >
              登录/注册
            </Button>
          )}
        </div>
      </div>

      {/* 移动端抽屉菜单 */}
      <Drawer
        title="菜单"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map(item => (
            <div
              key={item.key}
              onClick={() => {
                handleNavClick(item.path);
                setDrawerVisible(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
              }}
            >
              {item.icon}
              <span style={{ fontSize: '15px', color: '#333' }}>{item.label}</span>
            </div>
          ))}
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
            <Button 
              type="primary" 
              block
              icon={<RightOutlined />}
              onClick={() => {
                navigate('/user/login');
                setDrawerVisible(false);
              }}
              style={{
                background: 'linear-gradient(135deg, #ff9a56 0%, #ff6b35 100%)',
                border: 'none',
                height: '40px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              登录/注册
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
