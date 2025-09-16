import React from 'react';
import { 
  UserAddOutlined, 
  PaperClipOutlined, 
  CheckCircleOutlined, 
  UserOutlined,
  CodeOutlined,
  ShoppingOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { Button, Card, Row, Col, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';
import './index.css'; // 假设存在此CSS文件用于额外样式
// import Header from '../Header';

const { Title, Paragraph } = Typography;

const PartnerPage: React.FC = () => {
  // 申请步骤数据
  const applicationSteps = [
    {
      icon: <UserAddOutlined />,
      title: '注册恒源智享云账号',
      description: '使用手机号或邮箱注册恒源智享云平台账号',
      step: '01'
    },
    {
      icon: <PaperClipOutlined />,
      title: '提交合作申请',
      description: '填写合作申请表并上传相关资质证明',
      step: '02'
    },
    {
      icon: <CheckCircleOutlined />,
      title: '资质审核',
      description: '平台将在3-5个工作日内完成资质审核',
      step: '03'
    },
    {
      icon: <UserOutlined />,
      title: '成为合作伙伴',
      description: '审核通过后，正式成为平台合作伙伴',
      step: '04'
    }
  ];

  // 合作伙伴权益数据
  const partnerBenefits = [
    {
      icon: <UserOutlined />,
      title: '培训支持',
      description: '解决方案及产品培训，培训赋能',
      imageUrl: 'https://picsum.photos/id/26/600/400'
    },
    {
      icon: <CodeOutlined />,
      title: '技术支持',
      description: '重点项目架构师支持，技术难题解决',
      imageUrl: 'https://picsum.photos/id/48/600/400'
    },
    {
      icon: <ShoppingOutlined />,
      title: '销售支持',
      description: '服务快速通道，专业销售支持',
      imageUrl: 'https://picsum.photos/id/20/600/400'
    }
  ];

  return (
    <>
          {/* <Header /> */}
    <div className="partner-page">
      {/* 头部横幅区域 */}
      <div className="partner-banner">
        <div className="banner-content">
          <Title level={1} style={{color: '#ffffff'}}>合作伙伴计划</Title>
          <Paragraph className="banner-description">
            是指具备相应资质和能力，获得智享云授权，面向用户提供智享云产品的推广及服务，
            引导用户在智享云官网购买智享云产品和服务的合作伙伴
          </Paragraph>
          <div className="banner-actions">
            <Link to="/partner/apply">
              <Button 
                type="primary" 
                size="large" 
                className="primary-button"
              >
                立即加入
              </Button>
            </Link>
            <Link to="/partner/consult">
              <Button 
                size="large" 
                className="secondary-button"
              >
                立即咨询
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 申请步骤区域 */}
      <div className="application-steps section-container">
        <Title level={2} className="section-title">申请步骤</Title>
        <Divider className="section-divider" />
        
        <Row gutter={[32, 24]}>
          {applicationSteps.map((step, index) => (
            <Col xs={24} sm={12} md={6} key={step.step} className="step-item">
              <div className="step-icon-container">
                <div className="step-number">{step.step}</div>
                <div className="step-icon">{step.icon}</div>
              </div>
              <Title level={4} className="step-title">{step.title}</Title>
              <Paragraph className="step-description">{step.description}</Paragraph>
            </Col>
          ))}
        </Row>
      </div>

      {/* 合作伙伴权益区域 */}
      <div className="partner-benefits section-container bg-gray">
        <Title level={2} className="section-title">合作伙伴权益</Title>
        <Divider className="section-divider" />
        
        <Row gutter={[32, 24]} className="benefits-row">
          {partnerBenefits.map((benefit, index) => (
            <Col xs={24} md={8} key={index} className="benefit-item">
              <Card className="benefit-card">
                <div className="benefit-image-container">
                  <img 
                    src={benefit.imageUrl} 
                    alt={benefit.title} 
                    className="benefit-image"
                  />
                  <div className="benefit-icon">{benefit.icon}</div>
                </div>
                <Title level={4} className="benefit-title">{benefit.title}</Title>
                <Paragraph className="benefit-description">{benefit.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="benefits-cta">
          <Link to="/partner/apply">
            <Button 
              type="primary" 
              size="large" 
              className="primary-button"
            >
              立即加入
            </Button>
          </Link>
        </div>
      </div>

      {/* 签到按钮 - 固定在右下角 */}
      <div className="check-in-button">
        <Button shape="circle" size="large" className="check-in-icon">
          <CalendarOutlined />
        </Button>
      </div>
    </div>
    </>
  );
};

export default PartnerPage;
