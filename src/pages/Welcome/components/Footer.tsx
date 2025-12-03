import React from 'react';
import { Row, Col, Typography, Space, Button, Divider } from 'antd';
import { 
  CustomerServiceOutlined,
  WechatOutlined,
  QqOutlined,
  ZhihuOutlined,
  BilibiliOutlined,
  UserOutlined,
  GithubOutlined
} from '@ant-design/icons';
import { Grid } from 'antd';

const { Text, Link } = Typography;
const { useBreakpoint } = Grid;

const Footer: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <div style={{ 
      backgroundColor: '#f5f7fa',
      color: '#262626',
      marginTop: '40px',
      position: 'relative'
    }}>
      {/* 主要内容区域 */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '40px 16px' : '50px 40px',
        backgroundColor: 'transparent'
      }}>
        <Row gutter={[48, 32]}>
          {/* 左侧：公司信息和联系方式 */}
          <Col xs={24} sm={24} md={8} lg={8}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* Logo 和公司名称 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>
                  算
                </div>
                <div>
                  <Text style={{ color: '#262626', fontSize: '18px', fontWeight: 600 }}>
                    算力方 Cloud
                  </Text>
                  <div style={{
                    display: 'inline-block',
                    marginLeft: '8px',
                    padding: '2px 8px',
                    background: '#1890ff',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: '#fff'
                  }}>
                    算力方
                  </div>
                </div>
              </div>

              {/* 联系方式 */}
              <div style={{ color: '#595959', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>
                  <Text style={{ color: '#595959' }}>商务合作: </Text>
                  <Link href="mailto:business@example.com" style={{ color: '#1890ff' }}>
                    business@example.com
                  </Link>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <Text style={{ color: '#595959' }}>上海算力方网络科技有限公司</Text>
                </div>
                <div>
                  <Text style={{ color: '#595959' }}>
                    地址: 上海市宜山路810号2幢2楼203室
                  </Text>
                </div>
              </div>

              {/* 社交媒体图标 */}
              <Space size="large">
                {[
                  { icon: <WechatOutlined />, key: 'wechat' },
                  { icon: <UserOutlined />, key: 'user' },
                  { icon: <QqOutlined />, key: 'qq' },
                  { icon: <ZhihuOutlined />, key: 'zhihu' },
                  { icon: <BilibiliOutlined />, key: 'bilibili' }
                ].map((item) => (
                  <div
                    key={item.key}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#1890ff';
                      e.currentTarget.style.transform = 'scale(1.1)';
                      const icon = e.currentTarget.querySelector('span');
                      if (icon) {
                        icon.style.color = '#fff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f5f5f5';
                      e.currentTarget.style.transform = 'scale(1)';
                      const icon = e.currentTarget.querySelector('span');
                      if (icon) {
                        icon.style.color = '#595959';
                      }
                    }}
                  >
                    <span style={{ fontSize: '20px', color: '#595959', transition: 'color 0.3s', display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                    </span>
                  </div>
                ))}
              </Space>
            </Space>
          </Col>

          {/* 中间：导航链接 */}
          <Col xs={24} sm={12} md={5} lg={5}>
            <Space direction="vertical" size="middle">
              <Text style={{ color: '#262626', fontSize: '16px', fontWeight: 600 }}>
                关于我们
              </Text>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Link 
                  href="#" 
                  style={{ 
                    color: '#595959', 
                    display: 'block',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1890ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#595959'}
                >
                  加入我们
                </Link>
                <Link 
                  href="#" 
                  style={{ 
                    color: '#595959', 
                    display: 'block',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1890ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#595959'}
                >
                  服务条款
                </Link>
                <Link 
                  href="#" 
                  style={{ 
                    color: '#595959', 
                    display: 'block',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1890ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#595959'}
                >
                  公告
                </Link>
              </Space>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={5} lg={5}>
            <Space direction="vertical" size="middle">
              <Text style={{ color: '#262626', fontSize: '16px', fontWeight: 600 }}>
                帮助与支持
              </Text>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Link 
                  href="#" 
                  style={{ 
                    color: '#595959', 
                    display: 'block',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1890ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#595959'}
                >
                  新手入门
                </Link>
                <Link 
                  href="#" 
                  style={{ 
                    color: '#595959', 
                    display: 'block',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1890ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#595959'}
                >
                  帮助文档
                </Link>
                <Link 
                  href="#" 
                  style={{ 
                    color: '#595959', 
                    display: 'block',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1890ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#595959'}
                >
                  FAQ
                </Link>
              </Space>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6} lg={6}>
            <Space direction="vertical" size="middle">
              <Text style={{ color: '#262626', fontSize: '16px', fontWeight: 600 }}>
                友情链接
              </Text>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Link 
                  href="https://github.com" 
                  target="_blank" 
                  style={{ 
                    color: '#595959', 
                    display: 'block',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1890ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#595959'}
                >
                  Github
                </Link>
                <Link 
                  href="https://www.kaggle.com" 
                  target="_blank" 
                  style={{ 
                    color: '#595959', 
                    display: 'block',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1890ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#595959'}
                >
                  Kaggle
                </Link>
                <Link 
                  href="https://huggingface.co" 
                  target="_blank" 
                  style={{ 
                    color: '#595959', 
                    display: 'block',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1890ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#595959'}
                >
                  HuggingFace
                </Link>
              </Space>
            </Space>
          </Col>
        </Row>
      </div>

      {/* 版权信息区域 - 使用白色背景卡片样式 */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: isMobile ? '24px 16px' : '24px 0',
        marginTop: '40px',
        borderTop: '1px solid #f0f0f0'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0 16px' : '0 40px',
          textAlign: 'center'
        }}>
          <Text style={{ color: '#8c8c8c', fontSize: '14px' }}>
            © Rights Reserved 2020-2025 沪ICP备2020034776号-1 沪公网安备31010402008940号
          </Text>
        </div>
      </div>

      {/* 客服按钮（固定在右下角） */}
      <div style={{
        position: 'fixed',
        right: isMobile ? '20px' : '40px',
        bottom: isMobile ? '20px' : '40px',
        zIndex: 1000
      }}>
        <div
          onClick={() => {
            // 这里可以添加客服功能
            console.log('打开客服');
          }}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(24, 144, 255, 0.4), 0 0 0 4px rgba(24, 144, 255, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(24, 144, 255, 0.5), 0 0 0 6px rgba(24, 144, 255, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(24, 144, 255, 0.4), 0 0 0 4px rgba(24, 144, 255, 0.1)';
          }}
        >
          {/* 脉冲动画背景 */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            animation: 'pulse 2s infinite'
          }} />
          <CustomerServiceOutlined style={{ 
            fontSize: '28px', 
            color: '#fff',
            zIndex: 1,
            position: 'relative'
          }} />
          <style>{`
            @keyframes pulse {
              0% {
                transform: scale(1);
                opacity: 1;
              }
              50% {
                transform: scale(1.2);
                opacity: 0.5;
              }
              100% {
                transform: scale(1.4);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Footer;

