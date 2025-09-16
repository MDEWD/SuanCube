import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Card,
  List,
  Avatar,
  Button,
  Tag,
  Input,
  Space,
  Divider,
  Form,
  Select,
  Row,
  Col,
  Statistic,
  Typography,
  Dropdown,
  Badge,
  Popover
} from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  MessageOutlined,
  EyeOutlined,
  LikeOutlined,
  StarOutlined,
  EditOutlined,
  ShareAltOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  FilterOutlined,
  SortAscendingOutlined
} from '@ant-design/icons';
// import Header from '../Header';
import ReactMarkdown from 'react-markdown';
import './index.css';

const { Content, Sider } = Layout;
const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

// 模拟数据
const mockPosts = [
  {
    id: 1,
    title: '如何优化GPU计算中的内存使用？',
    content: '我在训练大型模型时遇到GPU内存不足的问题，有什么好的优化策略吗？\n\n```python\n# 示例代码\ndef train_model():\n    # 这里有一些内存密集型操作\n    pass\n```',
    author: { name: '张工程师', avatar: '', isExpert: true, reputation: 1245 },
    tags: ['GPU', '性能优化', 'PyTorch'],
    createdAt: '2023-04-15',
    voteCount: 18,
    answerCount: 7,
    viewCount: 243,
    hasAcceptedAnswer: true
  },
  {
    id: 2,
    title: '分布式TensorFlow训练的最佳实践',
    content: '最近在搭建多机多卡训练环境，大家有什么经验分享吗？特别是关于参数同步和梯度聚合方面的。',
    author: { name: '李研究员', avatar: '', isExpert: true, reputation: 2876 },
    tags: ['TensorFlow', '分布式训练', '机器学习'],
    createdAt: '2023-04-14',
    voteCount: 12,
    answerCount: 5,
    viewCount: 187,
    hasAcceptedAnswer: false
  },
  {
    id: 3,
    title: 'CUDA核心编程入门指南',
    content: '这是我整理的CUDA编程入门教程，适合刚开始接触GPU编程的开发者。',
    author: { name: '王开发者', avatar: '', isExpert: false, reputation: 542 },
    tags: ['CUDA', 'GPU编程', '教程'],
    createdAt: '2023-04-13',
    voteCount: 26,
    answerCount: 3,
    viewCount: 412,
    hasAcceptedAnswer: true
  }
];

const mockAnswers = [
  {
    id: 1,
    content: '可以尝试使用混合精度训练，并检查是否有不必要的中间变量被保存。另外，梯度累积也是一个有效的技术。\n\n```python\n# 混合精度训练示例\nfrom torch.cuda.amp import autocast, GradScaler\n\nscaler = GradScaler()\n\nwith autocast():\n    output = model(input)\n    loss = loss_fn(output, target)\n\nscaler.scale(loss).backward()\nscaler.step(optimizer)\nscaler.update()\n```',
    author: { name: '陈专家', avatar: '', isExpert: true, reputation: 3562 },
    createdAt: '2023-04-15 14:23',
    voteCount: 9,
    isAccepted: true
  },
  {
    id: 2,
    content: '除了上述方法，还可以尝试使用梯度检查点技术，它通过重新计算前向传播来减少内存使用，虽然会增加计算时间，但能显著降低内存占用。',
    author: { name: '刘架构师', avatar: '', isExpert: true, reputation: 2987 },
    createdAt: '2023-04-15 16:45',
    voteCount: 5,
    isAccepted: false
  }
];

const popularTags = [
  '深度学习', '机器学习', 'GPU', 'PyTorch', 'TensorFlow', 
  'CUDA', '分布式训练', '模型优化', '算法', '大数据'
];

const topUsers = [
  { name: '张专家', reputation: 4567, isExpert: true },
  { name: '李教授', reputation: 3892, isExpert: true },
  { name: '王工程师', reputation: 3124, isExpert: false },
  { name: '赵研究员', reputation: 2987, isExpert: true },
  { name: '钱架构师', reputation: 2765, isExpert: true }
];

// 代码高亮组件
const CodeBlock = ({ language, value }: { language: string | null, value: string }) => {
  return (
    <div className="code-block">
      <div className="code-header">
        <span>{language || 'code'}</span>
        <Button size="small" type="text">复制</Button>
      </div>
      <pre className="code-content">
        <code>{value}</code>
      </pre>
    </div>
  );
};

// 主应用组件
const CloudComputingCommunity: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigateTo = (page: string, post?: any) => {
    setCurrentPage(page);
    if (post) setSelectedPost(post);
  };

  const renderHomePage = () => (
    <div className="page-container">
      <div className="page-header">
        <Title level={2}>技术讨论社区</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigateTo('ask')}>
          提问
        </Button>
      </div>
      
      <div className="filters">
        <Space>
          <Select defaultValue="all" style={{ width: 120 }}>
            <Option value="all">全部</Option>
            <Option value="questions">问题</Option>
            <Option value="discussions">讨论</Option>
            <Option value="shares">分享</Option>
          </Select>
          <Select defaultValue="newest" style={{ width: 120 }}>
            <Option value="newest">最新</Option>
            <Option value="popular">热门</Option>
            <Option value="unanswered">未回答</Option>
          </Select>
          <Button icon={<FilterOutlined />}>筛选</Button>
        </Space>
        
        <Input 
          placeholder="搜索话题..." 
          prefix={<SearchOutlined />} 
          style={{ width: 200 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onPressEnter={() => navigateTo('search')}
        />
      </div>
      
      <Row gutter={16}>
        <Col span={18}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={mockPosts}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <Space key="votes">
                    <LikeOutlined /> {item.voteCount}
                  </Space>,
                  <Space key="answers">
                    <MessageOutlined /> {item.answerCount}
                  </Space>,
                  <Space key="views">
                    <EyeOutlined /> {item.viewCount}
                  </Space>,
                  <Space key="time">{item.createdAt}</Space>
                ]}
                extra={
                  item.hasAcceptedAnswer && (
                    <Tag color="green" icon={<StarOutlined />}>已解决</Tag>
                  )
                }
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={<a onClick={() => navigateTo('detail', item)}>{item.title}</a>}
                  description={
                    <Space>
                      <span>{item.author.name}</span>
                      {item.author.isExpert && <Tag color="blue">专家</Tag>}
                      <Tag>声望: {item.author.reputation}</Tag>
                    </Space>
                  }
                />
                <div className="post-content-preview">
                  {item.content.substring(0, 150)}...
                </div>
                <div className="tags-container">
                  {item.tags.map(tag => (
                    <Tag key={tag} color="blue">{tag}</Tag>
                  ))}
                </div>
              </List.Item>
            )}
          />
        </Col>
        
        <Col span={6}>
          <Card title="热门标签" size="small" style={{ marginBottom: 16 }}>
            <div className="tags-cloud">
              {popularTags.map(tag => (
                <Tag key={tag} className="tag-item">{tag}</Tag>
              ))}
            </div>
          </Card>
          
          <Card title="社区排行榜" size="small">
            <List
              size="small"
              dataSource={topUsers}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar size="small" icon={<UserOutlined />} />}
                    title={
                      <Space>
                        <span>{item.name}</span>
                        {item.isExpert && <Tag color="blue">专家</Tag>}
                      </Space>
                    }
                    description={`声望: ${item.reputation}`}
                  />
                  <Tag color={index < 3 ? "gold" : "default"}>{index + 1}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderDetailPage = () => (
    <div className="page-container">
      <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigateTo('home')}>
        返回列表
      </Button>
      
      <div className="post-header">
        <Title level={2}>{selectedPost.title}</Title>
        <Space>
          <Button icon={<EditOutlined />}>编辑</Button>
          <Button icon={<ShareAltOutlined />}>分享</Button>
          <Button icon={<ExclamationCircleOutlined />}>举报</Button>
        </Space>
      </div>
      
      <div className="post-meta">
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span>{selectedPost.author.name}</span>
          {selectedPost.author.isExpert && <Tag color="blue">专家</Tag>}
          <Tag>声望: {selectedPost.author.reputation}</Tag>
          <span>发布于 {selectedPost.createdAt}</span>
        </Space>
        
        <Space>
          <EyeOutlined /> {selectedPost.viewCount} 次浏览
        </Space>
      </div>
      
      <div className="tags-container" style={{ marginBottom: 16 }}>
      {selectedPost.tags.map((tag: string) => (
          <Tag key={tag} color="blue">{tag}</Tag>
        ))}
      </div>
      
      <Card>
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {selectedPost.content}
        </ReactMarkdown>
        
        <Divider />
        
        <Space>
          <Button type="text" icon={<LikeOutlined />}>赞 {selectedPost.voteCount}</Button>
          <Button type="text" icon={<MessageOutlined />}>回答</Button>
          <Button type="text" icon={<StarOutlined />}>收藏</Button>
        </Space>
      </Card>
      
      <Title level={3} style={{ marginTop: 24 }}>
        {mockAnswers.length} 个回答
      </Title>
      
      {mockAnswers.map(answer => (
        <Card key={answer.id} style={{ marginTop: 16 }}>
          <div className="answer-header">
            <Space>
              <Avatar icon={<UserOutlined />} />
              <span>{answer.author.name}</span>
              {answer.author.isExpert && <Tag color="blue">专家</Tag>}
              <Tag>声望: {answer.author.reputation}</Tag>
              <span>{answer.createdAt}</span>
            </Space>
            
            {answer.isAccepted && <Tag color="green" icon={<StarOutlined />}>最佳答案</Tag>}
          </div>
          
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {answer.content}
          </ReactMarkdown>
          
          <Divider />
          
          <Space>
            <Button type="text" icon={<LikeOutlined />}>赞 {answer.voteCount}</Button>
            <Button type="text">评论</Button>
            {!answer.isAccepted && <Button type="text" icon={<StarOutlined />}>采纳答案</Button>}
          </Space>
        </Card>
      ))}
      
      <Card title="撰写回答" style={{ marginTop: 24 }}>
        <Form layout="vertical">
          <Form.Item>
            <TextArea rows={8} placeholder="详细描述您的解决方案..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary">提交回答</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );

  const renderAskPage = () => (
    <div className="page-container">
      <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigateTo('home')}>
        返回列表
      </Button>
      
      <Title level={2}>提出新问题</Title>
      
      <Card>
        <Form layout="vertical">
          <Form.Item label="问题标题" required>
            <Input placeholder = "请用一句话清晰明了地概括你的问题" />
          </Form.Item>
          
          <Form.Item label="问题详情" required>
            <TextArea 
              rows={10} 
              placeholder="详细描述您遇到的问题，包括相关的代码和错误信息。支持Markdown格式。" 
            />
          </Form.Item>
          
          <Form.Item label="标签" required>
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="添加至多5个标签（如：Python, GPU）"
            >
              {popularTags.map(tag => (
                <Option key={tag} value={tag}>{tag}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary">发布问题</Button>
              <Button>存为草稿</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      
      <Card title="预览" style={{ marginTop: 24 }}>
        <div className="preview-area">
          <Title level={4}>问题标题预览</Title>
          <Text>这里是内容预览区域，支持Markdown格式渲染。</Text>
        </div>
      </Card>
    </div>
  );

  const renderSearchPage = () => (
    <div className="page-container">
      <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigateTo('home')}>
        返回列表
      </Button>
      
      <Title level={2}>搜索结果："{searchQuery}"</Title>
      
      <div className="filters">
        <Space>
          <Text>筛选：</Text>
          <Select defaultValue="all">
            <Option value="all">全部</Option>
            <Option value="questions">问题</Option>
            <Option value="answers">回答</Option>
          </Select>
          <Select defaultValue="relevance">
            <Option value="relevance">相关度</Option>
            <Option value="newest">最新</Option>
            <Option value="votes">投票数</Option>
          </Select>
          <Button icon={<FilterOutlined />}>更多筛选</Button>
        </Space>
      </div>
      
      <Text>找到 15 个结果</Text>
      
      <List
        itemLayout="vertical"
        size="large"
        dataSource={mockPosts.filter(post => 
          post.title.includes(searchQuery) || 
          post.content.includes(searchQuery) ||
          post.tags.some(tag => tag.includes(searchQuery))
        )}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <Space key="votes">
                <LikeOutlined /> {item.voteCount}
              </Space>,
              <Space key="answers">
                <MessageOutlined /> {item.answerCount}
              </Space>,
              <Space key="views">
                <EyeOutlined /> {item.viewCount}
              </Space>,
              <Space key="time">{item.createdAt}</Space>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={<a onClick={() => navigateTo('detail', item)}>{item.title}</a>}
              description={
                <Space>
                  <span>{item.author.name}</span>
                  {item.author.isExpert && <Tag color="blue">专家</Tag>}
                  <Tag>声望: {item.author.reputation}</Tag>
                </Space>
              }
            />
            <div className="post-content-preview">
              {item.content.substring(0, 150)}...
            </div>
            <div className="tags-container">
              {item.tags.map(tag => (
                <Tag key={tag} color="blue">{tag}</Tag>
              ))}
            </div>
          </List.Item>
        )}
      />
    </div>
  );

  // 渲染当前页面
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': return renderHomePage();
      case 'detail': return renderDetailPage();
      case 'ask': return renderAskPage();
      case 'search': return renderSearchPage();
      default: return renderHomePage();
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* <Header /> */}
      
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['home']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => navigateTo('home')}>
              首页
            </Menu.Item>
            <Menu.Item key="questions" icon={<QuestionCircleOutlined />}>
              问题
            </Menu.Item>
            <Menu.Item key="tags" icon={<TagsOutlined />}>
              标签
            </Menu.Item>
            <Menu.Item key="users" icon={<UserOutlined />}>
              用户
            </Menu.Item>
            <Menu.Item key="companies" icon={<TeamOutlined />}>
              公司
            </Menu.Item>
            <Menu.Item key="events" icon={<CalendarOutlined />}>
              活动
            </Menu.Item>
            <Divider />
            <Menu.Item key="ask" icon={<PlusOutlined />} onClick={() => navigateTo('ask')}>
              提问
            </Menu.Item>
          </Menu>
        </Sider>
        
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {renderCurrentPage()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

// 添加缺失的图标组件
const ArrowLeftOutlined = () => <span>←</span>;
const HomeOutlined = () => <span>🏠</span>;
const QuestionCircleOutlined = () => <span>❓</span>;
const TagsOutlined = () => <span>🏷️</span>;
const TeamOutlined = () => <span>👥</span>;
const CalendarOutlined = () => <span>📅</span>;

export default CloudComputingCommunity;