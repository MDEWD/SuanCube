import { useModel } from '@umijs/max';
import React from 'react';
import Partner from './components/partner';
import ProductIntro from './components/productIntro';
import NewsCarousel from './components/newsCarousel';
import { Card, Typography, Row, Col, Space } from 'antd';
import { 
  PlayCircleOutlined,
  DollarOutlined,
  SafetyCertificateOutlined,
  ContactsOutlined
} from '@ant-design/icons';
import ProductDisplay from './components/productDisplay';
const Welcome: React.FC = () => {
  const { Title, Text } = Typography;

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
        gap: '20px',
        padding: '20px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        {/* 左侧轮播图区域 */}
        <div style={{ 
          flex: 1, 
          borderRadius: '12px',
          overflow: 'hidden',
          height: '280px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          backgroundColor: '#fff'
        }}>
          <NewsCarousel />
        </div>
        
        {/* 右侧产品介绍区域 */}
        <div style={{ 
          flex: 1, 
          borderRadius: '12px',
          overflow: 'hidden',
          height: '280px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <ProductIntro />
        </div>
      </div>
      <ProductDisplay />

      {/* 主要内容区域 */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px'
      }}>
        {/* 服务保障部分 */}
        <Card 
          title={
            <Space>
              <SafetyCertificateOutlined style={{ color: '#52c41a' }} />
              <span style={{ fontSize: '20px', fontWeight: 600 }}>服务保障</span>
            </Space>
          }
          style={{ 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            marginBottom: '40px'
          }}
          headStyle={{ 
            borderBottom: '1px solid #f0f0f0',
            padding: '16px 24px'
          }}
        >
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
                    fontWeight: 600
                  }}>
                    {service.title}
                  </Title>
                  <Text type="secondary" style={{ 
                    fontSize: '14px',
                    lineHeight: 1.5
                  }}>
                    {service.description}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </div>

      {/* 合作伙伴部分 */}
      <Partner />
    </div>
  );
};

export default Welcome;