import { useModel } from '@umijs/max';
import React from 'react';
import Partner from './components/partner';
import ProductIntro from './components/productIntro';
import NewsCarousel from './components/newsCarousel';
import CaseStudy from './components/caseStudy';
import Footer from './components/Footer';
import { Typography, Row, Col, Space, Grid } from 'antd';

const { useBreakpoint } = Grid;
import { 
  PlayCircleOutlined,
  DollarOutlined,
  SafetyCertificateOutlined,
  ContactsOutlined
} from '@ant-design/icons';
import ProductDisplay from './components/productDisplay';
const Welcome: React.FC = () => {
  const { Title, Text } = Typography;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // 服务保障数据
  const servicesData = [
    {
      icon: <SafetyCertificateOutlined style={{ fontSize: 48, color: '#52c41a' }} />,
      title: '数据安全',
      description: '银行级数据加密保护，确保您的数据安全'
    },
    {
      icon: <DollarOutlined style={{ fontSize: 48, color: '#faad14' }} />,
      title: '价格透明',
      description: '无隐藏费用，所有价格明码标价'
    },
    {
      icon: <PlayCircleOutlined style={{ fontSize: 48, color: '#1890ff' }} />,
      title: '稳定可靠',
      description: '99.9% 服务可用性，保障业务连续性'
    },
    {
      icon: <ContactsOutlined style={{ fontSize: 48, color: '#722ed1' }} />,
      title: '专业支持',
      description: '7×24小时专业技术支持团队'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* 顶部轮播图和产品介绍区域 */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '16px' : '20px',
        padding: isMobile ? '16px' : '20px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        {/* 左侧轮播图区域 */}
        <div style={{ 
          flex: 1, 
          borderRadius: '12px',
          overflow: 'hidden',
          height: isMobile ? '200px' : '280px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          backgroundColor: '#fff',
          width: '100%'
        }}>
          <NewsCarousel />
        </div>
        
        {/* 右侧产品介绍区域 */}
        <div style={{ 
          flex: 1, 
          borderRadius: '12px',
          overflow: 'hidden',
          height: isMobile ? 'auto' : '280px',
          minHeight: isMobile ? '200px' : '280px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '100%'
        }}>
          <ProductIntro />
        </div>
      </div>
      <ProductDisplay />

      {/* 主要内容区域 */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '40px 16px' : '50px 40px'
      }}>
        {/* 服务保障部分 */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ 
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <SafetyCertificateOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
            <Title level={2} style={{ 
              margin: 0,
              fontSize: '24px',
              fontWeight: 600,
              color: '#262626'
            }}>
              服务保障
            </Title>
          </div>
          <Row gutter={[32, 32]}>
            {servicesData.map((service, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <div style={{ 
                  textAlign: 'center',
                  padding: '24px 16px'
                }}>
                  <div style={{ marginBottom: '16px' }}>
                    {service.icon}
                  </div>
                  <Title level={4} style={{ 
                    marginBottom: '8px',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#262626'
                  }}>
                    {service.title}
                  </Title>
                  <Text style={{ 
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: '#595959'
                  }}>
                    {service.description}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* 案例分享部分 */}
      <CaseStudy />

      {/* 合作伙伴部分 */}
      <Partner />

      {/* 页脚部分 */}
      <Footer />
    </div>
  );
};

export default Welcome;