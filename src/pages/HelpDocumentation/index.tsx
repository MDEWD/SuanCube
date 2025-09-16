import React, { useState } from 'react';
import { Layout, Card, Typography, List, Divider, Button, Space, Tag, Row, Col, Alert, Breadcrumb } from 'antd';
import { 
  SoundOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  BookOutlined,
  DollarOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  ContactsOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
  HomeOutlined
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

// 帮助文档分类
const helpCategories = [
  {
    key: 'getting-started',
    label: '新手入门',
    icon: <RocketOutlined />,
    children: [
      { key: 'quick-start', label: '快速入门指南' },
      { key: 'account-setup', label: '账号注册与设置' },
      { key: 'first-project', label: '创建第一个项目' },
    ]
  },
  {
    key: 'billing',
    label: '计费方式',
    icon: <DollarOutlined />,
    children: [
      { key: 'pricing', label: '价格说明' },
      { key: 'payment-methods', label: '支付方式' },
      { key: 'invoice', label: '发票申请' },
    ]
  },
  {
    key: 'earnings',
    label: '赚取收益',
    icon: <DollarOutlined />,
    children: [
      { key: 'provider-guide', label: '算力提供方指南' },
      { key: 'revenue-share', label: '收益分成说明' },
      { key: 'withdrawal', label: '提现流程' },
    ]
  },
  {
    key: 'security',
    label: '安全指南',
    icon: <SafetyCertificateOutlined />,
    children: [
      { key: 'data-protection', label: '数据保护' },
      { key: 'access-control', label: '访问控制' },
      { key: 'best-practices', label: '最佳实践' },
    ]
  }
];

// 必看教程数据
const mustReadTutorials = [
  {
    title: '快速入门上手使用',
    description: '帮助中心 > 新手必看',
    icon: <PlayCircleOutlined style={{ color: '#1890ff' }} />,
    path: '/help/getting-started/quick-start'
  },
  {
    title: '计费方式',
    description: '帮助中心 > 计费方式',
    icon: <DollarOutlined style={{ color: '#52c41a' }} />,
    path: '/help/billing/pricing'
  },
  {
    title: '赚取收益',
    description: '帮助中心 > 赚取收益',
    icon: <DollarOutlined style={{ color: '#faad14' }} />,
    path: '/help/earnings/provider-guide'
  }
];

// 常见问题数据
const faqData = [
  {
    question: '如何注册账号？',
    answer: '访问官网首页，点击"注册"按钮，填写邮箱和密码即可完成注册。',
    category: 'getting-started'
  },
  {
    question: '算力租用如何计费？',
    answer: '按小时计费，根据选择的算力配置不同，价格从每小时几元到几十元不等。',
    category: 'billing'
  },
  {
    question: '如何成为算力提供方？',
    answer: '在个人中心提交算力提供申请，通过审核后即可发布算力产品。',
    category: 'earnings'
  },
  {
    question: '支持哪些支付方式？',
    answer: '支持支付宝、微信支付、银联等多种支付方式。',
    category: 'billing'
  }
];

const HelpDocumentation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('getting-started');

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* 右侧内容区域 - 全宽度 */}
      <Layout>
        <Content style={{ 
          margin: '24px', 
          padding: 0
        }}>
          {/* 面包屑导航 */}
          <Breadcrumb style={{ marginBottom: 16 }}>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
              首页
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <SoundOutlined />
              帮助文档
            </Breadcrumb.Item>
          </Breadcrumb>

          {/* 警告提示 */}
          <Alert
            message="这是必看教程，请一定要看！"
            type="warning"
            showIcon
            style={{ marginBottom: 24 }}
            action={
              <Button type="link" size="small">
                立即查看
              </Button>
            }
          />

          {/* 必看教程区域 */}
          <Card 
            title={
              <Space>
                <BookOutlined />
                <Text strong>必看教程</Text>
              </Space>
            }
            style={{ marginBottom: 24 }}
            extra={
              <Button type="link" icon={<EyeOutlined />}>
                查看视频教程
              </Button>
            }
          >
            <Row gutter={[24, 24]}>
              {mustReadTutorials.map((tutorial, index) => (
                <Col xs={24} md={8} key={index}>
                  <Card
                    hoverable
                    style={{ height: '100%', textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => window.open(tutorial.path, '_blank')}
                  >
                    <div style={{ fontSize: 48, marginBottom: 16 }}>
                      {tutorial.icon}
                    </div>
                    <Title level={4} style={{ marginBottom: 8 }}>{tutorial.title}</Title>
                    <Text type="secondary">{tutorial.description}</Text>
                    <div style={{ marginTop: 16 }}>
                      <Button type="primary">立即查看</Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>

          <Row gutter={24}>
            {/* 左侧分类菜单 */}
            <Col xs={24} lg={8}>
              <Card title="文档分类" style={{ marginBottom: 24 }}>
                <List
                  size="large"
                  dataSource={helpCategories}
                  renderItem={category => (
                    <List.Item
                      style={{ 
                        cursor: 'pointer',
                        background: selectedCategory === category.key ? '#f0f8ff' : 'transparent',
                        borderLeft: selectedCategory === category.key ? '3px solid #1890ff' : '3px solid transparent',
                        padding: '12px 16px'
                      }}
                      onClick={() => setSelectedCategory(category.key)}
                    >
                      <List.Item.Meta
                        avatar={category.icon}
                        title={<Text strong>{category.label}</Text>}
                      />
                    </List.Item>
                  )}
                />
              </Card>

              {/* 联系支持 */}
              <Card title="需要帮助？">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button type="primary" size="large" block icon={<ContactsOutlined />}>
                    在线客服
                  </Button>
                  <Button size="large" block icon={<QuestionCircleOutlined />}>
                    提交工单
                  </Button>
                  <Button size="large" block icon={<FileTextOutlined />}>
                    反馈建议
                  </Button>
                </Space>
                <Divider />
                <div style={{ textAlign: 'center' }}>
                  <Text type="secondary">服务时间: 7×24小时</Text>
                  <br />
                  <Text type="secondary">邮箱: support@xianyouyun.com</Text>
                </div>
              </Card>
            </Col>

            {/* 右侧内容区域 */}
            <Col xs={24} lg={16}>
              {/* 常见问题 */}
              <Card 
                title="常见问题" 
                style={{ marginBottom: 24 }}
                extra={<Button type="link">查看全部问题</Button>}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={faqData}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <Space>
                            <Text strong style={{ fontSize: '16px' }}>{item.question}</Text>
                            <Tag color="blue">
                              {helpCategories.find(cat => cat.key === item.category)?.label}
                            </Tag>
                          </Space>
                        }
                        description={item.answer}
                      />
                    </List.Item>
                  )}
                />
              </Card>

              {/* 最新更新 */}
              <Card title="最新更新">
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    {
                      title: '新功能发布：算力市场竞价模式',
                      description: '2024-01-15 · 新增了算力竞价功能，可以更灵活地租用算力',
                      tag: <Tag color="green">新功能</Tag>
                    },
                    {
                      title: '价格调整通知',
                      description: '2024-01-10 · 部分算力产品价格优化调整',
                      tag: <Tag color="orange">公告</Tag>
                    },
                    {
                      title: '安全升级完成',
                      description: '2024-01-05 · 完成系统安全升级，提升数据保护能力',
                      tag: <Tag color="red">安全</Tag>
                    },
                    {
                      title: 'API文档更新',
                      description: '2024-01-03 · 更新了开发者API接口文档',
                      tag: <Tag color="blue">文档</Tag>
                    }
                  ]}
                  renderItem={item => (
                    <List.Item
                      extra={item.tag}
                    >
                      <List.Item.Meta
                        title={<Text strong>{item.title}</Text>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>

          {/* 底部服务保障 */}
          <Card title="服务保障" style={{ marginTop: 24 }}>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} md={6}>
                <div style={{ textAlign: 'center' }}>
                  <SafetyCertificateOutlined style={{ fontSize: 40, color: '#52c41a' }} />
                  <Title level={5} style={{ marginTop: 16 }}>数据安全</Title>
                  <Text type="secondary">银行级数据加密保护，确保您的数据安全</Text>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div style={{ textAlign: 'center' }}>
                  <DollarOutlined style={{ fontSize: 40, color: '#faad14' }} />
                  <Title level={5} style={{ marginTop: 16 }}>价格透明</Title>
                  <Text type="secondary">无隐藏费用，所有价格明码标价</Text>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div style={{ textAlign: 'center' }}>
                  <PlayCircleOutlined style={{ fontSize: 40, color: '#1890ff' }} />
                  <Title level={5} style={{ marginTop: 16 }}>稳定可靠</Title>
                  <Text type="secondary">99.9% 服务可用性，保障业务连续性</Text>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div style={{ textAlign: 'center' }}>
                  <ContactsOutlined style={{ fontSize: 40, color: '#722ed1' }} />
                  <Title level={5} style={{ marginTop: 16 }}>专业支持</Title>
                  <Text type="secondary">7×24小时专业技术支持团队</Text>
                </div>
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HelpDocumentation;