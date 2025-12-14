import React, { useState, useEffect } from 'react';
import { Link, history } from 'umi';
import { 
  Card, 
  Row, 
  Col, 
  Tag, 
  Button, 
  Checkbox, 
  Radio, 
  Divider, 
  Typography, 
  Space, 
  Tabs,
  Badge,
  Statistic,
  Tooltip,
  Input,
  Select,
  message,
  Grid,
  Drawer,
  Spin
} from 'antd';
import PublishProductModal from './components/PublishProductModal';
import { publishProductUsingPost, getProductListUsingGet } from '@/services/backend/productController';

const { useBreakpoint } = Grid;
import { 
  ShoppingCartOutlined, 
  HeartOutlined, 
  ThunderboltFilled,
  CrownFilled,
  PlusOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

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
  type?: 'lease' | 'official-recommend'; // 租赁专区或官方推荐
}

// 发布商品表单数据类型
export interface PublishFormData {
  gpuType: string;
  gpuModel: string;
  cpu: string;
  memory: string;
  storage?: string;
  bandwidth: string;
  location: string;
  applicationScenes: string[];
  isNewDataCenter: boolean;
  dataCenterDescription: string;
  price: number;
  images: any[];
  payMode?: string;
  // 以下是表单中已有的但接口定义中缺少的字段
  gpuAvailable?: number;
  systemDisk?: string;
  dataDisk?: string;
  highSpeedNetworkCard?: string;
}

// 默认GPU实例数据（当API失败时使用）
const defaultGpuInstances: GPUInstance[] = [
  // 租赁专区商品
  {
    id: '1',
    name: 'NVIDIA GeForce RTX 3060',
    model: 'RTX3060-12G',
    availableUntil: '2025-12-20',
    rating: 4,
    gpuAvailable: 1,
    gpuTotal: 8,
    cpu: 'Intel Xeon E5-2673 v4',
    memory: '64GB DDR4',
    systemDisk: '20G',
    dataDisk: '50GB NVME',
    maxCudaVersion: '12.2',
    price: 3000,
    tags: ['高可用', 'NVLink', '免费带宽'],
    region: '华东',
    gpuCountType: '8卡',
    bandwidth: '800 Mbps',
    driverVersion: '550.144.03',
    applicationScenes: ['AI训练', '图形渲染'],
    dataCenterLocation: '上海',
    dataCenterImages: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop'
    ],
    isNewDataCenter: false,
    dataCenterDescription: '稳定可靠的机房环境，多年运营经验',
    type: 'lease'
  },
  {
    id: '2',
    name: 'NVIDIA GeForce RTX 3060',
    model: 'RTX3060-12G',
    availableUntil: '2025-12-21',
    rating: 4,
    gpuAvailable: 1,
    gpuTotal: 8,
    cpu: 'Intel Xeon E5-2680 v4',
    memory: '128GB DDR4',
    systemDisk: '20G',
    dataDisk: '50GB NVME',
    maxCudaVersion: '12.1',
    price: 3100,
    tags: ['免费带宽', '推荐'],
    isHot: true,
    region: '华中',
    gpuCountType: '8卡',
    bandwidth: '800 Mbps',
    driverVersion: '550.144.03',
    applicationScenes: ['AI推理'],
    dataCenterLocation: '武汉',
    dataCenterImages: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop'
    ],
    isNewDataCenter: true,
    dataCenterDescription: '全新机房，采用最新制冷技术，节能环保',
    type: 'lease'
  },
  {
    id: '3',
    name: 'NVIDIA A100-80GB',
    model: 'A100-80GB',
    availableUntil: '2026-01-05',
    rating: 5,
    gpuAvailable: 2,
    gpuTotal: 4,
    cpu: 'Intel Xeon Gold 6338',
    memory: '256GB DDR4',
    systemDisk: '50G',
    dataDisk: '200GB NVME',
    maxCudaVersion: '12.4',
    price: 3210,
    tags: ['高配', 'NVLink', '限时特价', '新机房'],
    isNew: true,
    region: '华北',
    gpuCountType: '4卡',
    bandwidth: '1000 Mbps',
    driverVersion: '550.144.03',
    applicationScenes: ['AI训练', 'AI推理'],
    dataCenterLocation: '北京',
    dataCenterImages: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop'
    ],
    isNewDataCenter: true,
    dataCenterDescription: '2024年新建T3+级别数据中心，双路供电保障',
    type: 'lease'
  },
  // 官方推荐商品
  {
    id: 'official-1',
    name: 'NVIDIA L20',
    model: 'L20-48G',
    availableUntil: '2026-12-31',
    rating: 5,
    gpuAvailable: 61,
    gpuTotal: 61,
    cpu: '英特尔至强8458P 44C 2.7GHz *2',
    memory: '64GB/DDR5 RDIMM *32',
    systemDisk: '480G SATA *2',
    dataDisk: '3.84T NVME U.2 *4',
    maxCudaVersion: '12.0',
    price: 11000,
    tags: ['官方推荐', '高性能', '高可用'],
    region: '华东',
    gpuCountType: '8卡',
    bandwidth: '100Mbps共享',
    driverVersion: '最新',
    applicationScenes: ['AI训练', 'AI推理', '图形渲染'],
    dataCenterLocation: '上海',
    dataCenterImages: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop'
    ],
    isNewDataCenter: false,
    dataCenterDescription: '稳定可靠的机房环境，多年运营经验',
    type: 'official-recommend'
  },
  {
    id: 'official-2',
    name: 'NVIDIA GeForce RTX 4090',
    model: '4090-24G',
    availableUntil: '2026-12-31',
    rating: 5,
    gpuAvailable: 10,
    gpuTotal: 10,
    cpu: 'AMD 7542*2',
    memory: 'DDR4 3200 32G*32',
    systemDisk: '480G SATA SSD*2 raid1',
    dataDisk: '3.84T NVME U.2*1',
    maxCudaVersion: '12.0',
    price: 7000,
    tags: ['官方推荐', '性价比', '热卖'],
    region: '西南',
    gpuCountType: '8卡',
    bandwidth: '100Mbps共享',
    driverVersion: '最新',
    applicationScenes: ['AI训练', 'AI推理'],
    dataCenterLocation: '四川',
    dataCenterImages: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop'
    ],
    isNewDataCenter: true,
    dataCenterDescription: '全新机房，采用最新制冷技术，节能环保',
    type: 'official-recommend'
  },
  {
    id: 'official-3',
    name: 'NVIDIA GeForce RTX 4090D',
    model: '4090D-24G',
    availableUntil: '2026-12-31',
    rating: 5,
    gpuAvailable: 100,
    gpuTotal: 100,
    cpu: '英特尔至强8352V 2.1GHz*2',
    memory: '32GB/DDR4 RDIMM*16',
    systemDisk: '480G SATA*1',
    dataDisk: '3.84T NVME U.2*1',
    maxCudaVersion: '12.0',
    price: 7000,
    tags: ['官方推荐', '新机房', '限时特价'],
    region: '华东',
    gpuCountType: '8卡',
    bandwidth: '100Mbps共享',
    driverVersion: '最新',
    applicationScenes: ['AI训练', 'AI推理'],
    dataCenterLocation: '上海',
    dataCenterImages: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop'
    ],
    isNewDataCenter: true,
    dataCenterDescription: '2024年新建T3+级别数据中心，双路供电保障',
    type: 'official-recommend'
  }
];

const ComputeMarketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('lease');
  const [selectedGPUType, setSelectedGPUType] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
  const [selectedGPUCount, setSelectedGPUCount] = useState<string>('all');
  const [publishModalVisible, setPublishModalVisible] = useState(false);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [gpuInstances, setGpuInstances] = useState<GPUInstance[]>(defaultGpuInstances);
  const [loading, setLoading] = useState(true);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  useEffect(() => {
    loadGpuInstances();
  }, [activeTab]);

  const loadGpuInstances = async () => {
    try {
      setLoading(true);
      const type = activeTab === 'official-recommend' ? 'official-recommend' : 'lease';
      
      // 使用新的产品列表API
      const res = await getProductListUsingGet({
        type: type,
        page: 1,
        size: 100
      });
      
      if (res?.data?.records && res.data.records.length > 0) {
        const instances = res.data.records.map((item: any) => ({
          id: item.id || item.name,
          name: item.name || item.gpuType,
          model: item.model || item.gpuModel,
          availableUntil: item.availableUntil || item.availableDate || '2025-12-31',
          rating: item.rating || 4,
          gpuAvailable: item.gpuCount || item.gpuAvailable || item.availableCount || 0,
          gpuTotal: item.gpuCount || item.gpuTotal || item.totalCount || 0,
          cpu: item.cpu || '',
          memory: item.memory || '',
          systemDisk: item.systemDisk || item.systemStorage || '',
          dataDisk: item.dataDisk || item.dataStorage || '',
          maxCudaVersion: item.maxCudaVersion || item.cudaVersion || '',
          price: item.price || 0,
          tags: item.tags ? (Array.isArray(item.tags) ? item.tags : item.tags.split(',')) : [],
          region: item.region || item.location || '',
          gpuCountType: item.gpuCountType || `${item.gpuCount || 0}卡`,
          bandwidth: item.bandwidth || '',
          driverVersion: item.driverVersion || '',
          applicationScenes: item.applicationScenes ? (Array.isArray(item.applicationScenes) ? item.applicationScenes : item.applicationScenes.split(',')) : [],
          dataCenterLocation: item.dataCenterLocation || item.location || '',
          dataCenterImages: item.dataCenterImages || item.images || [],
          isNewDataCenter: item.isNewDataCenter || false,
          dataCenterDescription: item.dataCenterDescription || '',
          type: item.type || type,
          isHot: item.isHot || false,
          isNew: item.isNew || false
        }));
        setGpuInstances(instances.length > 0 ? instances : defaultGpuInstances);
      } else {
        setGpuInstances(defaultGpuInstances);
      }
    } catch (error) {
      console.error('加载GPU实例失败:', error);
      setGpuInstances(defaultGpuInstances);
    } finally {
      setLoading(false);
    }
  };

  // 筛选选项
  const gpuTypes = [
    '华为',
    '英伟达',
  ];

  const regions = ['华中', '华东', '华北', '华南', '西南'];
  const gpuCounts = ['all', '8卡', '1卡', '其他'];

  // 应用场景选项
  const applicationScenesOptions = [
    { label: 'AI训练', value: 'AI训练' },
    { label: 'AI推理', value: 'AI推理' },
    { label: '图形渲染', value: '图形渲染' }
  ];

  // 筛选逻辑
  const filteredInstances = gpuInstances.filter(instance => {
    // 根据标签页过滤类型
    if (activeTab === 'official-recommend') {
      // 官方推荐标签页：只显示官方推荐商品
      if (instance.type !== 'official-recommend') {
        return false;
      }
    } else if (activeTab === 'lease') {
      // 租赁专区标签页：显示租赁专区商品和官方推荐商品
      if (instance.type !== 'lease' && instance.type !== 'official-recommend') {
        return false;
      }
    } else {
      // 采购专区等其他标签页：可以根据需要设置过滤逻辑
      // 暂时不显示任何商品，或者根据需要添加逻辑
      return false;
    }
    
    // GPU类型筛选
    if (selectedGPUType.length > 0 && !selectedGPUType.some(type => 
      instance.name.includes(type) || instance.model.includes(type))) {
      return false;
    }
    
    // 地区筛选
    if (selectedRegion.length > 0 && !selectedRegion.includes(instance.region)) {
      return false;
    }
    
    // GPU数量筛选
    if (selectedGPUCount !== 'all' && instance.gpuCountType !== selectedGPUCount) {
      return false;
    }
    
    return true;
  });

  // 处理发布商品
  const handlePublish = async (values: PublishFormData) => {
    try {
      // 映射表单数据到API请求参数
      const requestData: any = {
        name: values.gpuModel, // 使用GPU型号作为商品名称
        model: values.gpuModel,
        gpuType: values.gpuType,
        gpuCount: values.gpuAvailable || 1, // 默认1个GPU
        cpu: values.cpu,
        memory: values.memory,
        systemDisk: values.systemDisk,
        dataDisk: values.dataDisk,
        bandwidth: values.bandwidth,
        payMode: values.payMode,
        price: values.price,
        // 地区字段暂时使用location，后续可以根据实际需求调整
        region: values.location,
        location: values.location,
        applicationScenes: values.applicationScenes || [],
        // 图片处理：将Ant Design Upload组件的文件列表转换为图片URL数组
        images: (values.images || []).map((file: any) => file.url || file.response?.data?.url || ''),
        isNewDataCenter: values.isNewDataCenter,
        dataCenterDescription: values.dataCenterDescription,
        // 数据中心图片暂时使用相同的图片列表，后续可以根据实际需求调整
        dataCenterImages: (values.images || []).map((file: any) => file.url || file.response?.data?.url || ''),
        // 以下字段表单中没有，暂时使用默认值或空值
        maxCudaVersion: '',
        driverVersion: '',
        tags: [],
      };
      
      // 调用发布商品API
      const response = await publishProductUsingPost(requestData);
      console.log('发布商品响应：', response);
      
      if (response?.code === 0) {
        message.success('商品发布成功！');
        setPublishModalVisible(false);
      } else {
        message.error(`发布失败：${response?.message || '未知错误'}`);
      }
    } catch (error: any) {
      console.error('发布商品失败:', error);
      message.error(`发布失败：${error?.message || '网络请求错误'}`);
    }
  };

  // 自定义标签样式
  const tabStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  } as React.CSSProperties;

  // 筛选面板内容
  const filterPanel = (
    <>
      {/* 显卡类型筛选 */}
      <div style={{ marginBottom: '20px' }}>
        <Title level={5} style={{ fontSize: isMobile ? '14px' : '16px' }}>显卡类型</Title>
        <Checkbox.Group 
          style={{ display: 'flex', flexDirection: 'column' }}
          value={selectedGPUType}
          onChange={setSelectedGPUType}
        >
          {gpuTypes.map(type => (
            <Checkbox key={type} value={type} style={{ margin: '4px 0' }}>
              {type}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <Divider />

      {/* 地区筛选 */}
      <div style={{ marginBottom: '20px' }}>
        <Title level={5} style={{ fontSize: isMobile ? '14px' : '16px' }}>地区</Title>
        <Checkbox.Group 
          style={{ display: 'flex', flexDirection: 'column' }}
          value={selectedRegion}
          onChange={setSelectedRegion}
        >
          {regions.map(region => (
            <Checkbox key={region} value={region} style={{ margin: '4px 0' }}>
              {region}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <Divider />

      {/* 显卡数量筛选 */}
      <div style={{ marginBottom: '20px' }}>
        <Title level={5} style={{ fontSize: isMobile ? '14px' : '16px' }}>显卡数量</Title>
        <Radio.Group 
          value={selectedGPUCount}
          onChange={e => setSelectedGPUCount(e.target.value)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {gpuCounts.map(count => (
            <Radio key={count} value={count} style={{ margin: '4px 0' }}>
              {count === 'all' ? '全部' : count}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    </>
  );

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
      {/* 顶部专区标签和发布按钮 */}
      <Card style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', flexWrap: 'wrap' }}>
          <Tabs 
            activeKey={activeTab}
            onChange={setActiveTab}
            centered={!isMobile}
            size={isMobile ? 'small' : 'large'}
            tabBarStyle={{
              fontSize: isMobile ? '14px' : '18px',
              fontWeight: 'bold',
              margin: 0
            }}
            style={{ flex: 1, minWidth: isMobile ? '100%' : 'auto' }}
          >
            <TabPane 
              tab={
                 <div style={{ ...tabStyle, fontSize: isMobile ? '14px' : '18px', padding: isMobile ? '8px 12px' : '12px 24px' }}>
                  <ThunderboltFilled style={{ marginRight: '6px', fontSize: isMobile ? '14px' : '16px' }} />
                  租赁专区
                </div>
              } 
              key="lease"
            />
            <TabPane 
              tab={
                 <div style={{ ...tabStyle, fontSize: isMobile ? '14px' : '18px', padding: isMobile ? '8px 12px' : '12px 24px' }}>
                  <ShoppingCartOutlined style={{ marginRight: '6px', fontSize: isMobile ? '14px' : '16px' }} />
                  采购专区
                </div>
              } 
              key="purchase" 
            />
            <TabPane 
              tab={
                 <div style={{ ...tabStyle, fontSize: isMobile ? '14px' : '18px', padding: isMobile ? '8px 12px' : '12px 24px' }}>
                  <CrownFilled style={{ marginRight: '6px', fontSize: isMobile ? '14px' : '16px' }} />
                  官方推荐
                </div>
              } 
              key="official-recommend" 
            />
          </Tabs>
          
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setPublishModalVisible(true)}
            style={{ 
              position: isMobile ? 'static' : 'absolute',
              right: isMobile ? 'auto' : 0,
              marginTop: isMobile ? '12px' : 0,
              width: isMobile ? '100%' : 'auto',
              fontSize: isMobile ? '12px' : '14px'
            }}
          >
            发布商品
          </Button>
        </div>
      </Card>

      <Row gutter={16}>
        {/* 左侧筛选面板 - 桌面端 */}
        {!isMobile && (
          <Col xs={24} md={6}>
            <Card title="筛选条件" style={{ marginBottom: '16px' }}>
              {filterPanel}
            </Card>
          </Col>
        )}

        {/* 移动端筛选按钮 */}
        {isMobile && (
          <Col span={24} style={{ marginBottom: '16px' }}>
            <Button 
              block
              onClick={() => setFilterDrawerVisible(true)}
              style={{ height: '40px' }}
            >
              筛选条件
            </Button>
          </Col>
        )}

        {/* 右侧卡片式实例列表 */}
        <Col xs={24} md={isMobile ? 24 : 18}>
          <Row gutter={[16, 16]}>
            {filteredInstances.map(instance => (
              <Col xs={24} sm={12} xl={8} key={instance.id}>
                <Card
                  style={{ 
                    height: '100%',
                    position: 'relative',
                    transition: 'all 0.3s',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                  bodyStyle={{ padding: isMobile ? '12px' : '16px' }}
                  hoverable
                  className="gpu-instance-card"
                  onClick={() => history.push(`/market/product/${instance.id}`)}
                >
                  {/* 热卖/新标签 */}
                  {instance.isHot && (
                    <Badge.Ribbon text="热卖" color="red">
                      <div></div>
                    </Badge.Ribbon>
                  )}
                  {instance.isNew && (
                    <Badge.Ribbon text="新机房" color="green">
                      <div></div>
                    </Badge.Ribbon>
                  )}

                  {/* 卡片头部 - 名称和基本信息 */}
                  <div style={{ marginBottom: '12px' }}>
                    <Row justify="space-between" align="top">
                      <Col flex="auto">
                        <Title level={4} style={{ margin: 0, fontSize: isMobile ? '14px' : '16px' }}>
                          {instance.name}
                        </Title>
                        <Text type="secondary" style={{ fontSize: isMobile ? '11px' : '12px' }}>
                          {instance.model}
                        </Text>
                      </Col>
                    </Row>
                    
                    <div style={{ marginTop: '8px' }}>
                      <Space wrap size={[0, 4]}>
                        {instance.tags.map(tag => (
                          <Tag 
                            key={tag} 
                            color={
                              tag === '限时特价' ? 'red' : 
                              tag === '推荐' ? 'orange' : 
                              tag === '免费带宽' ? 'green' : 'blue'
                            }
                            style={{ fontSize: '10px', margin: 0, marginRight: '4px' }}
                          >
                            {tag}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  </div>

                  {/* 机器码和评分 */}
                  {/* <div style={{ marginBottom: '12px' }}>
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Space size="small">
                          <Rate 
                            disabled 
                            defaultValue={instance.rating} 
                            style={{ fontSize: '12px' }} 
                            character={<StarFilled />}
                          />
                          <Text strong style={{ fontSize: '12px' }}>
                            {instance.rating}
                          </Text>
                        </Space>
                      </Col>
                    </Row>
                  </div> */}

                  {/* 关键配置信息 */}
                  <div style={{ marginBottom: '16px' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={12}>
                        <Statistic
                          title="库存"
                          value={`${instance.gpuAvailable}/${instance.gpuTotal}`}
                          valueStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="内存"
                          value={instance.memory.split(' ')[0]}
                          valueStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="系统盘"
                          value={instance.maxCudaVersion}
                          valueStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="公网带宽"
                          value={instance.bandwidth}
                          valueStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                        />
                      </Col>
                    </Row>
                  </div>

                  {/* 详细配置折叠信息 */}
                  <div style={{ marginBottom: '16px', padding: '8px', background: '#f9f9f9', borderRadius: '4px' }}>
                    <Row gutter={[4, 4]}>
                      <Col span={24}>
                        <Text strong style={{ fontSize: '12px' }}>CPU: </Text>
                        <Text style={{ fontSize: '12px' }}>{instance.cpu}</Text>
                      </Col>
                      <Col span={24}>
                        <Text strong style={{ fontSize: '12px' }}>高速网卡: </Text>
                        <Text style={{ fontSize: '12px' }}>
                          可配
                        </Text>
                      </Col>
                      <Col span={24}>
                        <Text strong style={{ fontSize: '12px' }}>机房位置: </Text>
                        <Text style={{ fontSize: '12px' }}>{instance.driverVersion}</Text>
                      </Col>
                      <Col span={24}>
                        <Text strong style={{ fontSize: '12px' }}>集群存储: </Text>
                        <Text style={{ fontSize: '12px' }}>{instance.driverVersion}</Text>
                      </Col>
                    </Row>
                  </div>

                  {/* 价格和操作区域 */}
                  <Divider style={{ margin: '12px 0' }} />
                  
                  {/* 价格显示 */}
                  <div style={{ marginBottom: '12px', textAlign: 'center' }}>
                    <Text style={{ 
                      fontSize: '24px', 
                      color: '#ff4d4f', 
                      fontWeight: 'bold',
                      lineHeight: '1.2'
                    }}>
                      ￥{instance.price}
                      <Text style={{ fontSize: '14px', fontWeight: 'normal' }}>/月</Text>
                    </Text>
                  </div>

                  {/* 操作按钮区域 - 水平布局 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                    {/* 立即租按钮 - 主要操作 */}
                    <Button 
                      type="primary" 
                      icon={<ShoppingCartOutlined />}
                      style={{ 
                        flex: 2,
                        height: '36px',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      立即租
                    </Button>
                    
                    {/* 收藏按钮 */}
                    <Tooltip title="收藏">
                      <Button 
                        type="default"
                        icon={<HeartOutlined />}
                        style={{ 
                          flex: 1,
                          height: '36px',
                          borderRadius: '6px',
                          minWidth: '40px'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Tooltip>
                    
                    {/* 查看详情按钮 */}
                    <Tooltip title="查看详情">
                      <Link to={`/market/product/${instance.id}`}>
                        <Button 
                          type="default"
                          icon={<EyeOutlined />}
                          style={{ 
                            flex: 1,
                            height: '36px',
                            borderRadius: '6px',
                            minWidth: '40px'
                          }}
                        />
                      </Link>
                    </Tooltip>
                  </div>

                  {/* 或者使用这种布局：主要按钮在上，次要按钮在下 */}
                  {/* 
                  <Space direction="vertical" style={{ width: '100%' }} size="small">
                    <Button 
                      type="primary" 
                      icon={<ShoppingCartOutlined />}
                      style={{ 
                        width: '100%',
                        height: '36px',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}
                    >
                      立即租赁
                    </Button>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <Button 
                        type="text" 
                        icon={<HeartOutlined />}
                        style={{ 
                          flex: 1,
                          height: '32px',
                          borderRadius: '6px',
                          fontSize: '12px'
                        }}
                      >
                        收藏
                      </Button>
                      <Link to={`/market/product/${instance.id}`} style={{ flex: 1 }}>
                        <Button 
                          type="text"
                          icon={<EyeOutlined />}
                          style={{ 
                            width: '100%',
                            height: '32px',
                            borderRadius: '6px',
                            fontSize: '12px'
                          }}
                        >
                          查看详情
                        </Button>
                      </Link>
                    </div>
                  </Space>
                  */}
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* 发布商品模态框 - 使用抽取的组件 */}
      <PublishProductModal
        visible={publishModalVisible}
        onCancel={() => setPublishModalVisible(false)}
        onFinish={handlePublish}
      />

      {/* 移动端筛选抽屉 */}
      <Drawer
        title="筛选条件"
        placement="left"
        onClose={() => setFilterDrawerVisible(false)}
        open={filterDrawerVisible}
        width={280}
      >
        {filterPanel}
      </Drawer>

      <style>{`
        .gpu-instance-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
      `}</style>
        </>
      )}
    </div>
  );
};

export default ComputeMarketplace;