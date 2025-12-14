import React, { useState, useEffect } from 'react';
import { useParams, history, Link } from 'umi';
import { 
  Card, 
  Row, 
  Col, 
  Tag, 
  Button, 
  Divider, 
  Typography, 
  Space, 
  Rate,
  Descriptions,
  Image,
  Breadcrumb,
  Avatar,
  List,
  Tooltip,
  Input,
  message,
  Grid,
  Spin
} from 'antd';

const { useBreakpoint } = Grid;
import { 
  ShoppingCartOutlined, 
  HeartOutlined, 
  StarFilled,
  EnvironmentOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  LikeOutlined,
  DislikeOutlined,
  SendOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const { Title, Text } = Typography;
const { TextArea } = Input;
import { getProductByIdUsingGet } from '@/services/backend/productController';

// 类型定义
interface GPUInstance {
  id: string;
  name: string;
  model: string;
  availableUntil: string;
  rating: number;
  gpuAvailable: number;
  gpuTotal: number;
  cpu: string;
  memory: string;
  systemDisk: string;
  dataDisk: string;
  maxCudaVersion: string;
  price: number;
  tags: string[];
  isHot?: boolean;
  isNew?: boolean;
  region: string;
  gpuCountType: string;
  bandwidth: string;
  driverVersion: string;
  applicationScenes?: string[];
  dataCenterLocation?: string;
  dataCenterImages?: string[];
  isNewDataCenter?: boolean;
  dataCenterDescription?: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  // 评论状态
  interface CommentItem {
    id: string;
    author: string;
    avatar: string;
    content: string;
    rating: number;
    createTime: string; // YYYY-MM-DD HH:mm:ss
    likes: number;
    dislikes: number;
    isLiked?: boolean;
    isDisliked?: boolean;
  }

  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      author: '张工程师',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
      content: '机器稳定、网络通畅，训练任务跑得很顺畅。',
      rating: 5,
      createTime: dayjs().subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
      likes: 12,
      dislikes: 0
    },
    {
      id: 'c2',
      author: '李研究员',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
      content: '性价比不错，客服响应也挺快的。',
      rating: 4,
      createTime: dayjs().subtract(5, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      likes: 3,
      dislikes: 0
    }
  ]);
  const [newContent, setNewContent] = useState('');
  const [newRating, setNewRating] = useState<number>(5);
  const [submitting, setSubmitting] = useState(false);
  const [product, setProduct] = useState<GPUInstance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await getProductByIdUsingGet({ id });
      if (res?.data) {
        const item = res.data;
        setProduct({
          id: item.id || id,
          name: item.name || '',
          model: item.model || '',
          availableUntil: '2025-12-31', // API未返回该字段，使用默认值
          rating: item.rating > 0 ? item.rating : 4, // 只有当rating大于0时使用，否则使用默认值
          gpuAvailable: item.gpuCount || 0, // 使用gpuCount作为可用数量
          gpuTotal: item.gpuCount || 0, // 使用gpuCount作为总数
          cpu: item.cpu || '',
          memory: item.memory || '',
          systemDisk: item.systemDisk || '',
          dataDisk: item.dataDisk || '',
          maxCudaVersion: item.maxCudaVersion || '',
          price: item.price || 0,
          tags: item.tags || [],
          region: item.region || '',
          gpuCountType: `${item.gpuCount || 0}卡`, // 直接使用gpuCount生成
          bandwidth: item.bandwidth || '',
          driverVersion: item.driverVersion || '',
          applicationScenes: item.applicationScenes || [],
          dataCenterLocation: item.location || '', // 使用location作为机房位置
          dataCenterImages: item.images || [], // 使用images作为机房图片
          isNewDataCenter: Boolean(item.isNewDataCenter), // 转换为布尔值
          dataCenterDescription: item.dataCenterDescription || '',
          isHot: Boolean(item.isHot), // 转换为布尔值
          isNew: Boolean(item.isNew) // 转换为布尔值
        });
      }
    } catch (error) {
      console.error('加载产品详情失败:', error);
      message.error('加载产品详情失败');
      history.push('/market');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!newContent.trim()) {
      message.warning('请输入评论内容');
      return;
    }
    setSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const created: CommentItem = {
        id: String(Date.now()),
        author: '当前用户',
        avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=you',
        content: newContent.trim(),
        rating: newRating,
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        likes: 0,
        dislikes: 0
      };
      setComments([created, ...comments]);
      setNewContent('');
      setNewRating(5);
      message.success('评论发表成功');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleVote = (id: string, action: 'like' | 'dislike') => {
    setComments(prev => prev.map(c => {
      if (c.id !== id) return c;
      if (action === 'like') {
        const liked = !c.isLiked;
        return {
          ...c,
          isLiked: liked,
          isDisliked: false,
          likes: c.likes + (liked ? 1 : -1),
          dislikes: c.isDisliked ? c.dislikes - 1 : c.dislikes
        };
      } else {
        const disliked = !c.isDisliked;
        return {
          ...c,
          isDisliked: disliked,
          isLiked: false,
          dislikes: c.dislikes + (disliked ? 1 : -1),
          likes: c.isLiked ? c.likes - 1 : c.likes
        };
      }
    }));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Title level={2}>商品未找到</Title>
        <Button type="primary" onClick={() => history.push('/market')}>
          返回市场
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* 面包屑导航 */}
      <Breadcrumb style={{ marginBottom: '12px', fontSize: isMobile ? '12px' : '14px' }}>
        <Breadcrumb.Item>
          <Link to="/market">
            <HomeOutlined /> 计算市场
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>商品详情</Breadcrumb.Item>
        <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Card style={{ borderRadius: '12px' }}>
        {/* 返回按钮 */}
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => history.push('/market')}
          style={{ marginBottom: '16px', padding: isMobile ? '4px 8px' : undefined }}
        >
          返回市场
        </Button>

        {/* 商品基本信息 */}
        <div style={{ marginBottom: '24px' }}>
          <Row gutter={24} align={isMobile ? 'top' : 'middle'}>
            <Col xs={24} md={16}>
              <Title level={2} style={{ fontSize: isMobile ? '20px' : '24px', marginBottom: '8px' }}>
                {product.name}
              </Title>
              <Text type="secondary" style={{ fontSize: isMobile ? '14px' : '16px' }}>
                {product.model}
              </Text>
              <div style={{ marginTop: '8px' }}>
                <Space wrap size={[0, 4]}>
                  {product.tags.map(tag => (
                    <Tag 
                      key={tag} 
                      color={
                        tag === '限时特价' ? 'red' : 
                        tag === '推荐' ? 'orange' : 
                        tag === '免费带宽' ? 'green' : 'blue'
                      }
                      style={{ fontSize: isMobile ? '11px' : '12px' }}
                    >
                      {tag}
                    </Tag>
                  ))}
                </Space>
              </div>
            </Col>
            <Col xs={24} md={8} style={{ textAlign: isMobile ? 'left' : 'right', marginTop: isMobile ? '16px' : 0 }}>
              <div style={{ marginBottom: '8px' }}>
                <Rate 
                  disabled 
                  defaultValue={product.rating} 
                  character={<StarFilled />}
                  style={{ fontSize: isMobile ? '14px' : '16px' }}
                />
                <Text strong style={{ marginLeft: '8px', fontSize: isMobile ? '14px' : '16px' }}>
                  {product.rating}
                </Text>
              </div>
              <Text style={{ 
                fontSize: isMobile ? '24px' : '32px', 
                color: '#ff4d4f', 
                fontWeight: 'bold',
                lineHeight: '1.2'
              }}>
                ￥{product.price}
                <Text style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 'normal' }}>/月</Text>
              </Text>
            </Col>
          </Row>
        </div>

        <Divider />

        {/* 配置详情 */}
        <Row gutter={24}>
          <Col xs={24} md={16}>
            <Title level={4} style={{ fontSize: isMobile ? '16px' : '18px' }}>配置详情</Title>
            <Descriptions 
              bordered 
              column={isMobile ? 1 : 2} 
              style={{ marginBottom: '24px' }}
              size={isMobile ? 'small' : 'default'}
            >
              <Descriptions.Item label="GPU类型">{product.name}</Descriptions.Item>
              <Descriptions.Item label="GPU型号">{product.model}</Descriptions.Item>
              <Descriptions.Item label="库存">
                {product.gpuAvailable}/{product.gpuTotal}
              </Descriptions.Item>
              <Descriptions.Item label="地区">{product.region}</Descriptions.Item>
              <Descriptions.Item label="CPU">{product.cpu}</Descriptions.Item>
              <Descriptions.Item label="内存">{product.memory}</Descriptions.Item>
              <Descriptions.Item label="数据存储">
                系统盘 {product.systemDisk} + 数据盘 {product.dataDisk}
              </Descriptions.Item>
              <Descriptions.Item label="公网带宽">{product.bandwidth}</Descriptions.Item>
              {/* <Descriptions.Item label="CUDA版本">{product.maxCudaVersion}</Descriptions.Item> */}
              {/* <Descriptions.Item label="驱动版本">{product.driverVersion}</Descriptions.Item> */}
            </Descriptions>

            {/* 应用场景 */}
            <Title level={4}>推荐应用场景</Title>
            <Space wrap style={{ marginBottom: '24px' }}>
              {product.applicationScenes?.map(scene => (
                <Tag key={scene} color="blue" style={{ fontSize: '14px', padding: '4px 8px' }}>
                  {scene}
                </Tag>
              ))}
            </Space>

            {/* 机房信息 */}
            <Title level={4} style={{ fontSize: isMobile ? '16px' : '18px' }}>机房信息</Title>
            <Descriptions 
              bordered 
              column={isMobile ? 1 : 3}
              style={{ marginBottom: '24px' }}
              size={isMobile ? 'small' : 'default'}
            >
              <Descriptions.Item label="机房坐标" span={isMobile ? 1 : 3}>
                <Space>
                  <EnvironmentOutlined />
                  {product.dataCenterLocation}
                  {product.isNewDataCenter && (
                    <Tag color="green">新机房</Tag>
                  )}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="机房评语" span={isMobile ? 1 : 3}>
                {product.dataCenterDescription}
              </Descriptions.Item>
            </Descriptions>

            {/* 机房环境图片 */}
            {product.dataCenterImages && product.dataCenterImages.length > 0 && (
              <>
                <Title level={4} style={{ fontSize: isMobile ? '16px' : '18px' }}>机房环境</Title>
                <Image.PreviewGroup>
                  <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                    {product.dataCenterImages.map((img, index) => (
                      <Col xs={24} sm={12} md={8} key={index}>
                        <Image
                          src={img}
                          alt={`机房环境 ${index + 1}`}
                          style={{ 
                            borderRadius: '6px',
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover'
                          }}
                        />
                      </Col>
                    ))}
                  </Row>
                </Image.PreviewGroup>
              </>
            )}

            {/* 评论区域 */}
            <div style={{ marginTop: 32 }}>
              <Title level={4} style={{ marginBottom: 16 }}>用户评论</Title>

              {/* 发表评论卡片 */}
              <Card
                style={{
                  marginBottom: 20,
                  borderRadius: '12px',
                  border: '1px solid #e8e8e8',
                  background: '#fafafa'
                }}
                bodyStyle={{ padding: 20 }}
              >
                <div style={{ display: 'flex', gap: 16 }}>
                  <Avatar size={48} icon={<UserOutlined />} src={'https://api.dicebear.com/7.x/miniavs/svg?seed=you'} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <Text strong>我的评分</Text>
                      <Rate value={newRating} onChange={setNewRating} character={<StarFilled />} />
                      <Text type="secondary">{newRating} 星</Text>
                    </div>
                    <TextArea
                      rows={4}
                      placeholder="分享您的使用体验，对其他用户很有帮助…"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      maxLength={500}
                      showCount
                      style={{ borderRadius: 8, marginBottom: 24 }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button type="primary" icon={<SendOutlined />} onClick={handleSubmit} loading={submitting}>
                        发表评论
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 评论列表 */}
              <List
                itemLayout="horizontal"
                dataSource={comments}
                locale={{ emptyText: '还没有评论，来做第一个吧～' }}
                renderItem={(item) => (
                  <li>
                    <Card
                      style={{
                        marginBottom: 12,
                        borderRadius: 12,
                        border: '1px solid #f0f0f0',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                      }}
                      bodyStyle={{ padding: 16 }}
                    >
                      <div style={{ display: 'flex', gap: 12 }}>
                        <Avatar size={40} src={item.avatar} icon={<UserOutlined />} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <Space size="small" wrap>
                              <Text strong>{item.author}</Text>
                              <Rate disabled defaultValue={item.rating} character={<StarFilled />} style={{ fontSize: 14 }} />
                            </Space>
                            <Tooltip title={dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')}>
                              <Text type="secondary" style={{ fontSize: 12 }}>{dayjs(item.createTime).fromNow()}</Text>
                            </Tooltip>
                          </div>
                          <Text style={{ display: 'block', marginBottom: 8 }}>{item.content}</Text>
                          <Space size="middle">
                            <Button
                              type="text"
                              icon={<LikeOutlined />}
                              onClick={() => toggleVote(item.id, 'like')}
                              style={{ color: item.isLiked ? '#1677ff' : undefined }}
                            >
                              {item.likes}
                            </Button>
                            <Button
                              type="text"
                              icon={<DislikeOutlined />}
                              onClick={() => toggleVote(item.id, 'dislike')}
                              style={{ color: item.isDisliked ? '#ff4d4f' : undefined }}
                            >
                              {item.dislikes}
                            </Button>
                          </Space>
                        </div>
                      </div>
                    </Card>
                  </li>
                )}
              />
            </div>
          </Col>

          {/* 侧边操作面板 */}
          <Col xs={24} md={8}>
            <Card 
              title="租赁信息" 
              style={{ 
                position: isMobile ? 'static' : 'sticky', 
                top: isMobile ? 'auto' : '24px',
                marginTop: isMobile ? '24px' : 0
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Text style={{ 
                  fontSize: isMobile ? '24px' : '28px', 
                  color: '#ff4d4f', 
                  fontWeight: 'bold' 
                }}>
                  ￥{product.price}
                  <Text style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 'normal' }}>/月</Text>
                </Text>
                <div>
                  {/* <Text type="secondary">0.3小时起 · 非黄金会员价</Text> */}
                </div>
              </div>

              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<ShoppingCartOutlined />}
                  style={{ width: '100%', height: '48px', fontSize: '16px' }}
                >
                  立即租赁
                </Button>
                <Button 
                  icon={<HeartOutlined />}
                  style={{ width: '100%', height: '40px' }}
                >
                  收藏商品
                </Button>
              </Space>

              <Divider />

              <div>
                <Text strong>服务保障</Text>
                <div style={{ marginTop: '8px' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text type="secondary">✓ 7x24小时技术支持</Text>
                    <Text type="secondary">✓ 99.9%可用性保障</Text>
                    <Text type="secondary">✓ 按月计费，灵活使用</Text>
                    <Text type="secondary">✓ 数据安全保障</Text>
                  </Space>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetail;