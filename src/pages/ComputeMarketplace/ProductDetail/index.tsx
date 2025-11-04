import React from 'react';
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
  Breadcrumb
} from 'antd';
import { 
  ShoppingCartOutlined, 
  HeartOutlined, 
  StarFilled,
  EnvironmentOutlined,
  HomeOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
import { gpuInstances } from '../index';

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
  
  const product = gpuInstances.find(instance => instance.id === id);

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
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* 面包屑导航 */}
      <Breadcrumb style={{ marginBottom: '16px' }}>
        <Breadcrumb.Item>
          <Link to="/market">
            <HomeOutlined /> 计算市场
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>商品详情</Breadcrumb.Item>
        <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Card>
        {/* 返回按钮 */}
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => history.push('/market')}
          style={{ marginBottom: '16px' }}
        >
          返回市场
        </Button>

        {/* 商品基本信息 */}
        <div style={{ marginBottom: '24px' }}>
          <Row gutter={24} align="middle">
            <Col span={16}>
              <Title level={2}>{product.name}</Title>
              <Text type="secondary" style={{ fontSize: '16px' }}>
                {product.model}
              </Text>
              <div style={{ marginTop: '8px' }}>
                <Space wrap>
                  {product.tags.map(tag => (
                    <Tag 
                      key={tag} 
                      color={
                        tag === '限时特价' ? 'red' : 
                        tag === '推荐' ? 'orange' : 
                        tag === '免费带宽' ? 'green' : 'blue'
                      }
                    >
                      {tag}
                    </Tag>
                  ))}
                </Space>
              </div>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <div style={{ marginBottom: '8px' }}>
                <Rate 
                  disabled 
                  defaultValue={product.rating} 
                  character={<StarFilled />}
                />
                <Text strong style={{ marginLeft: '8px' }}>
                  {product.rating}
                </Text>
              </div>
              <Text style={{ 
                fontSize: '32px', 
                color: '#ff4d4f', 
                fontWeight: 'bold',
                lineHeight: '1.2'
              }}>
                ￥{product.price}
                <Text style={{ fontSize: '16px', fontWeight: 'normal' }}>/月</Text>
              </Text>
            </Col>
          </Row>
        </div>

        <Divider />

        {/* 配置详情 */}
        <Row gutter={24}>
          <Col span={16}>
            <Title level={4}>配置详情</Title>
            <Descriptions bordered column={2} style={{ marginBottom: '24px' }}>
              <Descriptions.Item label="GPU类型">{product.name}</Descriptions.Item>
              <Descriptions.Item label="GPU型号">{product.model}</Descriptions.Item>
              <Descriptions.Item label="可用性">
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
            <Title level={4}>机房信息</Title>
            <Descriptions bordered style={{ marginBottom: '24px' }}>
              <Descriptions.Item label="机房坐标" span={3}>
                <Space>
                  <EnvironmentOutlined />
                  {product.dataCenterLocation}
                  {product.isNewDataCenter && (
                    <Tag color="green">新机房</Tag>
                  )}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="机房评语" span={3}>
                {product.dataCenterDescription}
              </Descriptions.Item>
            </Descriptions>

            {/* 机房环境图片 */}
            {product.dataCenterImages && product.dataCenterImages.length > 0 && (
              <>
                <Title level={4}>机房环境</Title>
                <Image.PreviewGroup>
                  <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                    {product.dataCenterImages.map((img, index) => (
                      <Col span={8} key={index}>
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
          </Col>

          {/* 侧边操作面板 */}
          <Col span={8}>
            <Card 
              title="租赁信息" 
              style={{ position: 'sticky', top: '24px' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Text style={{ 
                  fontSize: '28px', 
                  color: '#ff4d4f', 
                  fontWeight: 'bold' 
                }}>
                  ￥{product.price}
                  <Text style={{ fontSize: '16px', fontWeight: 'normal' }}>/月</Text>
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