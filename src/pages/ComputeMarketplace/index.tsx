import React, { useState } from 'react';
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
  Rate,
  Tabs,
  Badge,
  Statistic,
  Tooltip,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  InputNumber
} from 'antd';
import { 
  ShoppingCartOutlined, 
  HeartOutlined, 
  StarFilled,
  ThunderboltFilled,
  CrownFilled,
  PlusOutlined,
  UploadOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

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

// 发布商品表单数据类型
interface PublishFormData {
  gpuType: string;
  gpuModel: string;
  cpu: string;
  memory: string;
  storage: string;
  bandwidth: string;
  location: string;
  applicationScenes: string[];
  isNewDataCenter: boolean;
  dataCenterDescription: string;
  price: number;
  images: any[];
}

// 实例数据
export const gpuInstances: GPUInstance[] = [
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
    dataCenterDescription: '稳定可靠的机房环境，多年运营经验'
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
    dataCenterDescription: '全新机房，采用最新制冷技术，节能环保'
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
    dataCenterDescription: '2024年新建T3+级别数据中心，双路供电保障'
  }
];

const ComputeMarketplace: React.FC = () => {
  const [selectedGPUType, setSelectedGPUType] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
  const [selectedGPUCount, setSelectedGPUCount] = useState<string>('all');
  const [publishModalVisible, setPublishModalVisible] = useState(false);
  const [form] = Form.useForm();

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
    if (selectedGPUType.length > 0 && !selectedGPUType.some(type => 
      instance.name.includes(type) || instance.model.includes(type))) {
      return false;
    }
    
    if (selectedRegion.length > 0 && !selectedRegion.includes(instance.region)) {
      return false;
    }
    
    if (selectedGPUCount !== 'all' && instance.gpuCountType !== selectedGPUCount) {
      return false;
    }
    
    return true;
  });

  // 处理发布商品
  const handlePublish = async (values: PublishFormData) => {
    try {
      console.log('发布商品数据:', values);
      message.success('商品发布成功！');
      setPublishModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('发布失败，请重试');
    }
  };

  // 上传图片前的验证
  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('图片必须小于 5MB!');
    }
    return isJpgOrPng && isLt5M;
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

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      
      {/* 顶部专区标签和发布按钮 */}
      <Card style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs 
            defaultActiveKey="lease" 
            centered
            size="large"
            tabBarStyle={{
              fontSize: '18px',
              fontWeight: 'bold'
            }}
          >
            <TabPane 
              tab={
                 <div style={tabStyle}>
                  <ThunderboltFilled style={{ marginRight: '8px' }} />
                  租赁专区
                </div>
              } 
              key="lease"
            />
            <TabPane 
              tab={
                 <div style={tabStyle}>
                  <ShoppingCartOutlined style={{ marginRight: '8px' }} />
                  采购专区
                </div>
              } 
              key="purchase" 
            />
            <TabPane 
              tab={
                 <div style={tabStyle}>
                  <CrownFilled style={{ marginRight: '8px' }} />
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
            style={{ marginLeft: '16px' }}
          >
            发布商品
          </Button>
        </div>
      </Card>

      <Row gutter={16}>
        {/* 左侧筛选面板 */}
        <Col xs={24} md={6}>
          <Card title="筛选条件" style={{ marginBottom: '16px' }}>
            {/* 显卡类型筛选 */}
            <div style={{ marginBottom: '20px' }}>
              <Title level={5}>显卡类型</Title>
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
              <Title level={5}>地区</Title>
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
              <Title level={5}>显卡数量</Title>
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
          </Card>
        </Col>

        {/* 右侧卡片式实例列表 */}
        <Col xs={24} md={18}>
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
                  bodyStyle={{ padding: '16px' }}
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
                        <Title level={4} style={{ margin: 0, fontSize: '16px' }}>
                          {instance.name}
                        </Title>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
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
                  <div style={{ marginBottom: '12px' }}>
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
                  </div>

                  {/* 关键配置信息 */}
                  <div style={{ marginBottom: '16px' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={12}>
                        <Statistic
                          title="GPU"
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
                        <Text strong style={{ fontSize: '12px' }}>驱动: </Text>
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

      {/* 发布商品模态框 */}
      <Modal
        title="发布商品"
        open={publishModalVisible}
        onCancel={() => setPublishModalVisible(false)}
        footer={null}
        width={800}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handlePublish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="GPU类型"
                name="gpuType"
                rules={[{ required: true, message: '请选择GPU类型' }]}
              >
                <Select placeholder="选择GPU类型">
                  {gpuTypes.map(type => (
                    <Option key={type} value={type}>{type}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="GPU型号"
                name="gpuModel"
                rules={[{ required: true, message: '请输入GPU型号' }]}
              >
                <Input placeholder="例如：RTX3060-12G" />
              </Form.Item>
            </Col>
          </Row>

          <Title level={5}>配置详情</Title>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="CPU"
                name="cpu"
                rules={[{ required: true, message: '请输入CPU信息' }]}
              >
                <Input placeholder="例如：Intel Xeon E5-2673 v4" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="内存"
                name="memory"
                rules={[{ required: true, message: '请输入内存信息' }]}
              >
                <Input placeholder="例如：64GB DDR4" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="数据存储"
                name="storage"
                rules={[{ required: true, message: '请输入存储信息' }]}
              >
                <Input placeholder="例如：系统盘 20G + 数据盘 50GB NVME" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="带宽"
                name="bandwidth"
                rules={[{ required: true, message: '请输入带宽信息' }]}
              >
                <Input placeholder="例如：800 Mbps" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="机房坐标"
                name="location"
                rules={[{ required: true, message: '请输入机房坐标' }]}
              >
                <Input placeholder="例如：上海" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="机房环境图片"
            name="images"
          >
            <Upload
              listType="picture-card"
              beforeUpload={beforeUpload}
              multiple
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="推荐应用场景"
            name="applicationScenes"
            rules={[{ required: true, message: '请选择应用场景' }]}
          >
            <Checkbox.Group options={applicationScenesOptions} />
          </Form.Item>

          <Form.Item
            name="isNewDataCenter"
            valuePropName="checked"
          >
            <Checkbox>新机房</Checkbox>
          </Form.Item>

          <Form.Item
            label="机房自荐评语"
            name="dataCenterDescription"
            rules={[
              { required: true, message: '请输入机房评语' },
              { max: 50, message: '评语不能超过50个字' }
            ]}
          >
            <TextArea 
              placeholder="请输入机房自荐评语（最多50字）" 
              rows={3}
              showCount
              maxLength={50}
            />
          </Form.Item>

          <Form.Item
            label="目标价格（元/月）"
            name="price"
            rules={[{ required: true, message: '请输入目标价格' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              step={0.01}
              placeholder="请输入价格"
              formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setPublishModalVisible(false)} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              发布商品
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <style jsx>{`
        .gpu-instance-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </div>
  );
};

export default ComputeMarketplace;