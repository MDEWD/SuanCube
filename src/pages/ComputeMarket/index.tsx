import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Typography, Tag, Button, Input, Divider, Avatar, Rate, Select } from 'antd';
import { 
  CloudOutlined, 
  SearchOutlined,
  ShoppingCartOutlined,
  EyeOutlined,
  TeamOutlined,
  CiOutlined,
  MoreOutlined,
  DashboardOutlined,
  MoneyCollectOutlined
} from '@ant-design/icons';
import PublishCompute from './PublishCompute';

const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;
const { Option } = Select;

// 供应商数据
const vendors = [
  { id: 'nvidia', name: '英伟达', color: '#76b900', icon: 'N' },
  { id: 'huawei', name: '华为', color: '#ff0000', icon: 'H' },
  { id: 'alibaba', name: '阿里云', color: '#ff6a00', icon: 'A' },
  { id: 'tencent', name: '腾讯云', color: '#0052d9', icon: 'T' },
  { id: 'baidu', name: '百度智能云', color: '#2932e1', icon: 'B' },
  { id: 'aws', name: 'AWS', color: '#ff9900', icon: 'A' },
];

// 算力资源数据
const computeResources = [
  {
    id: 1,
    name: 'NVIDIA DGX A100',
    vendor: 'nvidia',
    description: '企业级AI训练服务器，配备8颗NVIDIA A100 GPU',
    monthlyPrice: 15800,
    hourlyPrice: 22,
    gpu: 'NVIDIA A100 80GB',
    gpuCount: 8,
    cpu: 'AMD EPYC 7742',
    cpuCores: 64,
    memory: '1TB DDR4',
    storage: '15TB NVMe SSD',
    network: '4x 200Gb/s InfiniBand',
    rating: 4.9,
    orders: 1245,
    tags: ['AI训练', '高性能计算', '企业级']
  },
  {
    id: 2,
    name: '华为 Atlas 800',
    vendor: 'huawei',
    description: '推理服务器，专为深度学习推理优化',
    monthlyPrice: 9800,
    hourlyPrice: 14,
    gpu: 'Ascend 910',
    gpuCount: 4,
    cpu: 'Kunpeng 920',
    cpuCores: 48,
    memory: '512GB DDR4',
    storage: '8TB NVMe SSD',
    network: '2x 100Gb/s Ethernet',
    rating: 4.7,
    orders: 892,
    tags: ['推理服务', '深度学习', '国产芯片']
  },
  {
    id: 3,
    name: '阿里云 gn7i',
    vendor: 'alibaba',
    description: 'GPU计算型实例，适合图形渲染和科学计算',
    monthlyPrice: 7200,
    hourlyPrice: 10,
    gpu: 'NVIDIA RTX 4090',
    gpuCount: 2,
    cpu: 'Intel Xeon Platinum',
    cpuCores: 32,
    memory: '256GB DDR4',
    storage: '4TB ESSD',
    network: '25Gb/s Ethernet',
    rating: 4.6,
    orders: 1567,
    tags: ['图形渲染', '科学计算', '云实例']
  },
  {
    id: 4,
    name: '腾讯云 GPU计算型',
    vendor: 'tencent',
    description: '通用GPU计算实例，支持多种计算场景',
    monthlyPrice: 6500,
    hourlyPrice: 9,
    gpu: 'NVIDIA A10',
    gpuCount: 4,
    cpu: 'AMD EPYC',
    cpuCores: 32,
    memory: '128GB DDR4',
    storage: '2TB SSD',
    network: '20Gb/s Ethernet',
    rating: 4.5,
    orders: 2034,
    tags: ['通用计算', '云游戏', '虚拟化']
  },
  {
    id: 5,
    name: '百度云 BCC GPU',
    vendor: 'baidu',
    description: 'AI开发平台，集成深度学习框架',
    monthlyPrice: 8500,
    hourlyPrice: 12,
    gpu: 'NVIDIA V100',
    gpuCount: 4,
    cpu: 'Intel Xeon Gold',
    cpuCores: 40,
    memory: '384GB DDR4',
    storage: '6TB SSD',
    network: '40Gb/s InfiniBand',
    rating: 4.8,
    orders: 987,
    tags: ['AI开发', '深度学习', '框架集成']
  },
  {
    id: 6,
    name: 'AWS P4d实例',
    vendor: 'aws',
    description: '高性能机器学习实例，适合大规模训练',
    monthlyPrice: 18200,
    hourlyPrice: 25,
    gpu: 'NVIDIA A100 40GB',
    gpuCount: 8,
    cpu: 'Intel Xeon Platinum',
    cpuCores: 96,
    memory: '1.1TB DDR4',
    storage: '8TB NVMe',
    network: '400Gb/s EFA',
    rating: 4.9,
    orders: 765,
    tags: ['机器学习', '大规模训练', '高性能']
  },
  {
    id: 7,
    name: 'NVIDIA RTX 4090集群',
    vendor: 'nvidia',
    description: '消费级顶级显卡集群，性价比之选',
    monthlyPrice: 4200,
    hourlyPrice: 6,
    gpu: 'NVIDIA RTX 4090',
    gpuCount: 4,
    cpu: 'AMD Ryzen Threadripper',
    cpuCores: 32,
    memory: '128GB DDR4',
    storage: '2TB NVMe SSD',
    network: '10Gb/s Ethernet',
    rating: 4.4,
    orders: 3120,
    tags: ['性价比', '深度学习', '图形处理']
  },
  {
    id: 8,
    name: '华为昇腾训练集群',
    vendor: 'huawei',
    description: '基于昇腾处理器的AI训练解决方案',
    monthlyPrice: 11200,
    hourlyPrice: 16,
    gpu: 'Ascend 910B',
    gpuCount: 8,
    cpu: 'Kunpeng 920',
    cpuCores: 64,
    memory: '512GB DDR4',
    storage: '10TB SSD',
    network: '100Gb/s RoCE',
    rating: 4.6,
    orders: 543,
    tags: ['昇腾', 'AI训练', '国产化']
  }
];

const ComputeMarket: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('market');
  const [searchText, setSearchText] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  const filteredResources = computeResources.filter(resource => {
    const matchesSearch = 
      resource.name.toLowerCase().includes(searchText.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchText.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
    
    const matchesVendor = selectedVendor === 'all' || resource.vendor === selectedVendor;
    
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'low' && resource.monthlyPrice < 5000) ||
      (priceRange === 'medium' && resource.monthlyPrice >= 5000 && resource.monthlyPrice < 10000) ||
      (priceRange === 'high' && resource.monthlyPrice >= 10000);
    
    return matchesSearch && matchesVendor && matchesPrice;
  });

  const [isPublishModalVisible, setIsPublishModalVisible] = useState(false);

  const getVendorInfo = (vendorId: string) => {
    return vendors.find(v => v.id === vendorId) || vendors[0];
  };

  const formatPrice = (price: number) => {
    return `¥${price.toLocaleString()}`;
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* 左侧导航栏 */}
      <Sider
        theme="light"
        width={280}
        style={{
          boxShadow: '2px 0 6px rgba(0,21,41,0.1)',
          paddingTop: '20px',
          background: '#fff'
        }}
      >
        <div style={{ padding: '0 20px', marginBottom: '30px' }}>
          <Title level={3} style={{ color: '#1890ff', textAlign: 'center', margin: 0 }}>
            <CloudOutlined style={{ marginRight: 8 }} />
            算力集市
          </Title>
        </div>

        {/* 筛选面板 */}
        <Divider orientation="left" style={{ padding: '0 20px', margin: '20px 0' }}>筛选条件</Divider>
        
        <div style={{ padding: '0 20px 20px' }}>
          <Text strong>供应商:</Text>
          <Select
            value={selectedVendor}
            onChange={setSelectedVendor}
            style={{ width: '100%', marginTop: 8 }}
          >
            <Option value="all">全部供应商</Option>
            {vendors.map(vendor => (
              <Option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ padding: '0 20px 20px' }}>
          <Text strong>价格范围:</Text>
          <Select
            value={priceRange}
            onChange={setPriceRange}
            style={{ width: '100%', marginTop: 8 }}
          >
            <Option value="all">全部价格</Option>
            <Option value="low">低于 ¥5000/月</Option>
            <Option value="medium">¥5000 - ¥10000/月</Option>
            <Option value="high">高于 ¥10000/月</Option>
          </Select>
        </div>
      </Sider>

      {/* 右侧内容区域 */}
      <Layout>
        <Header style={{ 
          padding: '0 32px', 
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(0,21,41,0.12)'
        }}>
          {/* <Title level={2} style={{ margin: 0, color: '#262626' }}>
            <CloudOutlined style={{ color: '#1890ff', marginRight: 12 }} />
            算力集市
          </Title> */}
          <Input
            placeholder="搜索算力资源..."
            prefix={<SearchOutlined />}
            style={{ width: 400 }}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <PublishCompute />
        </Header>

        <Content style={{ 
          margin: '24px', 
          padding: 0
        }}>
          {/* 统计信息 */}
          <Card style={{ marginBottom: 24 }} bodyStyle={{ padding: '16px 24px' }}>
            <Row gutter={[16, 16]} align="middle">
              <Col>
                <Text strong>找到 {filteredResources.length} 个算力资源</Text>
              </Col>
              <Col flex="auto">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Tag color="blue">GPU算力</Tag>
                  <Tag color="green">AI训练</Tag>
                  <Tag color="orange">推理服务</Tag>
                  <Tag color="purple">图形渲染</Tag>
                  <Tag color="red">高性能计算</Tag>
                </div>
              </Col>
            </Row>
          </Card>

          {/* 算力资源网格 */}
          <Row gutter={[24, 24]}>
            {filteredResources.map(resource => {
              const vendorInfo = getVendorInfo(resource.vendor);
              return (
                <Col xs={24} sm={12} lg={8} xl={6} key={resource.id}>
                  <Card
                    hoverable
                    style={{ 
                      height: '100%',
                      borderRadius: 8,
                      overflow: 'hidden'
                    }}
                    cover={
                      <div style={{ 
                        background: `linear-gradient(135deg, ${vendorInfo.color}20, ${vendorInfo.color}40)`,
                        padding: 20,
                        textAlign: 'center'
                      }}>
                        <Avatar 
                          size={64} 
                          style={{ 
                            backgroundColor: vendorInfo.color,
                            fontSize: 24,
                            fontWeight: 'bold'
                          }}
                        >
                          {vendorInfo.icon}
                        </Avatar>
                        <Title level={4} style={{ margin: '16px 0 8px', color: vendorInfo.color }}>
                          {vendorInfo.name}
                        </Title>
                      </div>
                    }
                  >
                    <Meta
                      title={
                        <div>
                          <Text strong style={{ fontSize: '16px' }}>{resource.name}</Text>
                          <Paragraph 
                            type="secondary" 
                            ellipsis={{ rows: 2 }} 
                            style={{ margin: '8px 0' }}
                          >
                            {resource.description}
                          </Paragraph>
                        </div>
                      }
                      description={
                        <div>
                          {/* 价格信息 */}
                          <div style={{ 
                            background: '#f9f9f9', 
                            padding: 12, 
                            borderRadius: 6,
                            marginBottom: 16
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <Text strong style={{ fontSize: '18px', color: '#ff4d4f' }}>
                                  {formatPrice(resource.monthlyPrice)}/月
                                </Text>
                                <br />
                                <Text type="secondary">{resource.hourlyPrice}元/小时</Text>
                              </div>
                              <MoneyCollectOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />
                            </div>
                          </div>

                          {/* 配置信息 */}
                          <div style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                              <CiOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                              <Text strong>GPU: </Text>
                              <Text>{resource.gpu} × {resource.gpuCount}</Text>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                              <DashboardOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                              <Text strong>CPU: </Text>
                              <Text>{resource.cpu} ({resource.cpuCores}核)</Text>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                              <MoreOutlined style={{ color: '#faad14', marginRight: 8 }} />
                              <Text strong>内存: </Text>
                              <Text>{resource.memory}</Text>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                              <TeamOutlined style={{ color: '#722ed1', marginRight: 8 }} />
                              <Text strong>存储: </Text>
                              <Text>{resource.storage}</Text>
                            </div>
                          </div>

                          {/* 评分和订单数 */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div>
                              <Rate 
                                disabled 
                                defaultValue={resource.rating} 
                                style={{ color: '#faad14' }} 
                              />
                              <Text type="secondary" style={{ marginLeft: 8 }}>
                                ({resource.rating})
                              </Text>
                            </div>
                            <Text type="secondary">{resource.orders} 租用</Text>
                          </div>

                          {/* 标签 */}
                          <div style={{ marginBottom: 16 }}>
                            {resource.tags.map(tag => (
                              <Tag 
                                key={tag} 
                                color="blue" 
                                style={{ marginBottom: 4, borderRadius: 12 }}
                              >
                                {tag}
                              </Tag>
                            ))}
                          </div>

                          {/* 操作按钮 */}
                          <div style={{ display: 'flex', gap: 8 }}>
                            <Button 
                              type="primary" 
                              icon={<ShoppingCartOutlined />}
                              style={{ flex: 1 }}
                            >
                              立即租用
                            </Button>
                            <Button 
                              icon={<EyeOutlined />}
                            >
                              详情
                            </Button>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>

          {filteredResources.length === 0 && (
            <Card style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <Title level={4} type="secondary">未找到匹配的算力资源</Title>
              <Text type="secondary">请尝试调整搜索条件或筛选条件</Text>
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ComputeMarket;