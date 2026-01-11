'use client';
import React, { useState } from 'react';
import {
  Layout,
  Card,
  Row,
  Col,
  Button,
  Typography,
  Divider,
  List,
  Tag,
  Space,
  Grid,
  Modal,
  Form,
  Input,
  message
} from 'antd';
import {
  RocketOutlined,
  TeamOutlined,
  BookOutlined,
  TrophyOutlined,
  ExperimentOutlined,
  ThunderboltOutlined,
  CrownOutlined,
  CloudServerOutlined,
  SolutionOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import './index.css';
// import Header from '../Header';

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

// 高校解决方案页面组件
const UniversitySolution: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConsult = (values: any) => {
    console.log('咨询表单数据:', values);
    message.success('提交成功！我们的顾问将尽快联系您');
    setIsModalVisible(false);
    form.resetFields();
  };

  // 问题列表数据
  const problemData = [
    {
      icon: <CrownOutlined />,
      title: '硬件昂贵',
      content: 'GPU资源价格昂贵，高校GPU资源规模有限，无法满足学校算力资源需求'
    },
    {
      icon: <ExperimentOutlined />,
      title: '缺少人工智能实训平台',
      content: '学校需要提供专业机房/硬件软件，才能让学生做实验'
    },
    {
      icon: <TeamOutlined />,
      title: '缺乏行业交流',
      content: '人工智能是个新专业，目前缺乏一个专业的人工智能技术交流社区'
    }
  ];

  // 解决方案数据
  const solutionData = [
    '一体化训练平台',
    '无需采购硬件',
    '无需维护',
    'GPU种类丰富',
    '一键注册',
    '预装框架',
    '计费方式多样',
    '行业优势定价',
    '多种数据存储',
    '数据传输方便',
    '公共数据集',
    '团队协作',
    '强大社区'
  ];

  // 使用效果数据
  const effectData = [
    {
      group: '学校/学院',
      items: ['高性价比', '提升学校服务体系', '轻松管理']
    },
    {
      group: '老师',
      items: ['方便教学', '实时使用数据', '数据共享']
    },
    {
      group: '学生',
      items: ['方便训练', '协作交流']
    }
  ];

  // 平台优势数据
  const advantageData = [
    '专注人工智能领域',
    '专业技术服务',
    '强大社区'
  ];

  // 更多合作数据
  const cooperationData = [
    {
      title: '人工智能赛事合作',
      icon: <TrophyOutlined />
    },
    {
      title: '实验室建设计划',
      icon: <ExperimentOutlined />
    },
    {
      title: '学生加速福利',
      icon: <ThunderboltOutlined />
    }
  ];

  return (
    <>
    {/* <Header /> */}
    <div className="university-solution-page">
      {/* 科技感背景元素 */}
      <div className="tech-bg-elements">
        <div className="tech-circle circle-1"></div>
        <div className="tech-circle circle-2"></div>
        <div className="tech-circle circle-3"></div>
        <div className="tech-grid"></div>
      </div>
      
      <Layout className="layout-content">
        {/* 顶部Banner */}
        <section className="hero-banner">
          <div className="banner-content">
            <Title level={1} className="banner-title">
              高校解决方案
            </Title>
            <Paragraph className="banner-description">
              恒源云专门为高校用户定制的算力解决方案，通过公有云私有云的形式为高校解决人工智能算力的问题，帮助高校更好的开展教育科研工作。
            </Paragraph>
            <Button 
              type="primary" 
              size="large" 
              icon={<SolutionOutlined />}
              onClick={showModal}
              className="consult-btn"
            >
              立即咨询
            </Button>
          </div>
          <div className="banner-visual">
            <div className="floating-card">
              <CloudServerOutlined className="server-icon" />
            </div>
          </div>
        </section>

        {/* 问题描述部分 */}
        <section className="section problems-section">
          <Divider orientation="center" className="section-divider">
            <Title level={2} className="section-title">
              人工智能教学的算力困扰
            </Title>
          </Divider>
          
          <Row gutter={[32, 32]} className="problems-row">
            {problemData.map((item, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="problem-card" hoverable>
                  <div className="card-icon">{item.icon}</div>
                  <Title level={4}>{item.title}</Title>
                  <Paragraph>{item.content}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* 解决方案部分 */}
        <section className="section solution-section">
          <Divider orientation="center" className="section-divider">
            <Title level={2} className="section-title">
              如果学校没有AI服务器？
            </Title>
          </Divider>
          
          <Card className="solution-card">
            <Title level={3} className="solution-subtitle">公有云解决方案</Title>
            <Paragraph className="solution-desc">
              为学校提供人工智能训练一体化平台
            </Paragraph>
            
            <div className="solution-tags">
              {solutionData.map((item, idx) => (
                <Tag key={idx} className="solution-tag">{item}</Tag>
              ))}
            </div>
          </Card>
        </section>

        {/* 使用效果部分 */}
        <section className="section effect-section">
          <Divider orientation="center" className="section-divider">
            <Title level={2} className="section-title">
              使用效果
            </Title>
          </Divider>
          
          <Row gutter={[32, 32]} className="effect-row">
            {effectData.map((group, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="effect-card" hoverable>
                  <Title level={4}>{group.group}</Title>
                  <List
                    dataSource={group.items}
                    renderItem={item => (
                      <List.Item>
                        <Text>- {item}</Text>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* 平台优势部分 */}
        <section className="section advantage-section">
          <Divider orientation="center" className="section-divider">
            <Title level={2} className="section-title">
              平台优势
            </Title>
          </Divider>
          
          <Row gutter={[32, 32]} justify="center">
            {advantageData.map((item, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="advantage-card">
                  <Paragraph className="advantage-text">{item}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* 更多合作部分 */}
        <section className="section cooperation-section">
          <Divider orientation="center" className="section-divider">
            <Title level={2} className="section-title">
              更多合作
            </Title>
          </Divider>
          
          <Row gutter={[32, 32]} className="cooperation-row">
            {cooperationData.map((item, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="cooperation-card" hoverable>
                  <div className="cooperation-icon">{item.icon}</div>
                  <Title level={4}>{item.title}</Title>
                </Card>
              </Col>
            ))}
          </Row>
          
          <div className="consult-footer">
            <Button 
              type="primary" 
              size="large" 
              icon={<PhoneOutlined />}
              onClick={showModal}
              className="consult-bottom-btn"
            >
              立即咨询
            </Button>
          </div>
        </section>
      </Layout>

      {/* 咨询模态框 */}
      <Modal
        title="咨询高校解决方案"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="consult-modal"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleConsult}
        >
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入您的姓名' }]}
          >
            <Input placeholder="请输入您的姓名" />
          </Form.Item>
          <Form.Item
            name="school"
            label="学校/单位"
            rules={[{ required: true, message: '请输入学校或单位名称' }]}
          >
            <Input placeholder="请输入学校或单位名称" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱地址' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱地址" />
          </Form.Item>
          <Form.Item
            name="requirement"
            label="具体需求"
          >
            <Input.TextArea rows={4} placeholder="请简要描述您的需求" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              提交咨询
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </>
  );
};

export default UniversitySolution;