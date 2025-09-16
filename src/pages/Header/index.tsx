import { useNavigate } from 'react-router-dom';
import { 
  CloudOutlined, 
  DatabaseOutlined, 
  QuestionCircleOutlined, 
  FileTextOutlined, 
  SoundOutlined, 
  ContactsOutlined,
  RightOutlined
} from '@ant-design/icons';
import { Button } from 'antd';

const Header: React.FC = () => {
    const navigate = useNavigate(); // 获取navigate对象用于路由跳转
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

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #f0f0f0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
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
      <div style={{ display: 'flex', gap: '32px' }}>
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
      </div>

      {/* 用户操作 */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button 
          type="primary" 
          icon={<RightOutlined />}
          onClick={() => navigate('/user/login')}
          style={{
            background: 'linear-gradient(135deg, #ff9a56 0%, #ff6b35 100%)',
            border: 'none',
            borderRadius: '10px',
            padding: '4px 10px',
            height: 'auto',
            fontSize: '12px',
            fontWeight: '500',
            minWidth: '120px'
          }}
        >
          登录/注册
        </Button>
      </div>
    </div>
  );
};

export default Header;
