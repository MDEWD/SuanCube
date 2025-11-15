import React, { useState, useEffect } from 'react';
import { useModel, history } from '@umijs/max';
import {
  Card,
  Tabs,
  Table,
  Tag,
  Space,
  Typography,
  Avatar,
  Row,
  Col,
  Statistic,
  Empty,
  Button,
  message,
  Modal,
  Descriptions,
  Badge
} from 'antd';
import {
  UserOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// 需求数据类型
interface Requirement {
  id: string;
  title: string;
  description: string;
  gpuType: string;
  gpuCount: number;
  budget: number;
  deadline: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createTime: string;
  userId?: string;
  userName?: string;
}

// 商品数据类型
interface Product {
  id: string;
  name: string;
  model: string;
  gpuType: string;
  gpuCount: number;
  price: number;
  region: string;
  status: 'active' | 'inactive' | 'sold';
  createTime: string;
  views: number;
  orders: number;
}

const Profile: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const [activeTab, setActiveTab] = useState<string>('requirements');
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Requirement | Product | null>(null);

  // 判断用户角色
  const userRole = currentUser?.userRole || 'user';
  const isAdmin = userRole === 'admin';
  const isPartner = userRole === 'partner';
  const isUser = userRole === 'user' || !userRole;

  useEffect(() => {
    if (!currentUser) {
      message.warning({
        content: '请先登录（开发验证码：123456）',
        duration: 3
      });
      history.push('/user/login?redirect=/profile&showCode=true');
      return;
    }
    loadData();
  }, [currentUser, activeTab]);

  // 加载数据
  const loadData = async () => {
    setLoading(true);
    try {
      // 模拟API调用 - 实际应该调用真实API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (isAdmin) {
        // 管理员：获取所有用户的需求
        setRequirements(getAllRequirements());
      } else if (isPartner) {
        // 合作伙伴：获取自己的商品
        setProducts(getMyProducts());
      } else {
        // 普通用户：获取自己的需求
        setRequirements(getMyRequirements());
      }
    } catch (error) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 模拟数据 - 普通用户的需求
  const getMyRequirements = (): Requirement[] => {
    return [
      {
        id: '1',
        title: 'AI模型训练算力需求',
        description: '需要8卡A100进行大模型训练，预计使用3个月',
        gpuType: 'NVIDIA A100',
        gpuCount: 8,
        budget: 50000,
        deadline: '2024-12-31',
        status: 'pending',
        createTime: '2024-01-15 10:30:00'
      },
      {
        id: '2',
        title: '图形渲染算力需求',
        description: '需要4卡RTX 4090进行3D渲染项目',
        gpuType: 'NVIDIA RTX 4090',
        gpuCount: 4,
        budget: 20000,
        deadline: '2024-11-30',
        status: 'processing',
        createTime: '2024-01-10 14:20:00'
      },
      {
        id: '3',
        title: '推理服务算力需求',
        description: '需要2卡H100进行模型推理服务',
        gpuType: 'NVIDIA H100',
        gpuCount: 2,
        budget: 30000,
        deadline: '2024-12-15',
        status: 'completed',
        createTime: '2024-01-05 09:15:00'
      }
    ];
  };

  // 模拟数据 - 合作伙伴的商品
  const getMyProducts = (): Product[] => {
    return [
      {
        id: '1',
        name: '高性能GPU算力服务',
        model: 'NVIDIA A100 80GB',
        gpuType: 'NVIDIA A100',
        gpuCount: 8,
        price: 15.8,
        region: '华东',
        status: 'active',
        createTime: '2024-01-10 10:00:00',
        views: 256,
        orders: 12
      },
      {
        id: '2',
        name: '图形渲染专用GPU',
        model: 'NVIDIA RTX 4090',
        gpuType: 'NVIDIA RTX 4090',
        gpuCount: 4,
        price: 8.5,
        region: '华南',
        status: 'active',
        createTime: '2024-01-08 14:30:00',
        views: 189,
        orders: 8
      },
      {
        id: '3',
        name: 'AI推理加速服务',
        model: 'NVIDIA H100',
        gpuType: 'NVIDIA H100',
        gpuCount: 2,
        price: 25.0,
        region: '华北',
        status: 'inactive',
        createTime: '2024-01-05 09:00:00',
        views: 342,
        orders: 15
      }
    ];
  };

  // 模拟数据 - 所有用户的需求（管理员）
  const getAllRequirements = (): Requirement[] => {
    return [
      {
        id: '1',
        title: 'AI模型训练算力需求',
        description: '需要8卡A100进行大模型训练，预计使用3个月',
        gpuType: 'NVIDIA A100',
        gpuCount: 8,
        budget: 50000,
        deadline: '2024-12-31',
        status: 'pending',
        createTime: '2024-01-15 10:30:00',
        userId: 'user1',
        userName: '张三'
      },
      {
        id: '2',
        title: '图形渲染算力需求',
        description: '需要4卡RTX 4090进行3D渲染项目',
        gpuType: 'NVIDIA RTX 4090',
        gpuCount: 4,
        budget: 20000,
        deadline: '2024-11-30',
        status: 'processing',
        createTime: '2024-01-10 14:20:00',
        userId: 'user2',
        userName: '李四'
      },
      {
        id: '3',
        title: '推理服务算力需求',
        description: '需要2卡H100进行模型推理服务',
        gpuType: 'NVIDIA H100',
        gpuCount: 2,
        budget: 30000,
        deadline: '2024-12-15',
        status: 'completed',
        createTime: '2024-01-05 09:15:00',
        userId: 'user3',
        userName: '王五'
      },
      {
        id: '4',
        title: '深度学习研究算力',
        description: '需要1卡A100进行深度学习研究',
        gpuType: 'NVIDIA A100',
        gpuCount: 1,
        budget: 8000,
        deadline: '2024-10-30',
        status: 'pending',
        createTime: '2024-01-20 11:00:00',
        userId: 'user4',
        userName: '赵六'
      }
    ];
  };

  // 状态标签
  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string; icon: React.ReactNode }> = {
      pending: { color: 'orange', text: '待处理', icon: <ClockCircleOutlined /> },
      processing: { color: 'blue', text: '处理中', icon: <ClockCircleOutlined /> },
      completed: { color: 'green', text: '已完成', icon: <CheckCircleOutlined /> },
      cancelled: { color: 'red', text: '已取消', icon: <DeleteOutlined /> },
      active: { color: 'green', text: '上架中', icon: <CheckCircleOutlined /> },
      inactive: { color: 'default', text: '已下架', icon: <DeleteOutlined /> },
      sold: { color: 'purple', text: '已售出', icon: <CheckCircleOutlined /> }
    };
    const config = statusMap[status] || { color: 'default', text: status, icon: null };
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  // 需求表格列
  const requirementColumns: ColumnsType<Requirement> = [
    {
      title: '需求标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ellipsis: true
    },
    {
      title: 'GPU类型',
      dataIndex: 'gpuType',
      key: 'gpuType',
      width: 150
    },
    {
      title: 'GPU数量',
      dataIndex: 'gpuCount',
      key: 'gpuCount',
      width: 100,
      render: (count: number) => `${count}卡`
    },
    {
      title: '预算',
      dataIndex: 'budget',
      key: 'budget',
      width: 120,
      render: (budget: number) => `¥${budget.toLocaleString()}`
    },
    {
      title: '截止日期',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => getStatusTag(status)
    },
    ...(isAdmin ? [{
      title: '发布用户',
      dataIndex: 'userName',
      key: 'userName',
      width: 120
    }] : []),
    {
      title: '发布时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedItem(record);
              setDetailModalVisible(true);
            }}
          >
            查看
          </Button>
          {!isAdmin && (
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => message.info('编辑功能开发中')}
            >
              编辑
            </Button>
          )}
        </Space>
      )
    }
  ];

  // 商品表格列
  const productColumns: ColumnsType<Product> = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
      width: 180
    },
    {
      title: 'GPU类型',
      dataIndex: 'gpuType',
      key: 'gpuType',
      width: 150
    },
    {
      title: 'GPU数量',
      dataIndex: 'gpuCount',
      key: 'gpuCount',
      width: 100,
      render: (count: number) => `${count}卡`
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price: number) => `¥${price}/小时`
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => getStatusTag(status)
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      key: 'views',
      width: 100,
      render: (views: number) => <Badge count={views} showZero />
    },
    {
      title: '订单数',
      dataIndex: 'orders',
      key: 'orders',
      width: 100,
      render: (orders: number) => <Badge count={orders} showZero />
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedItem(record);
              setDetailModalVisible(true);
            }}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => message.info('编辑功能开发中')}
          >
            编辑
          </Button>
        </Space>
      )
    }
  ];

  // 获取统计数据
  const getStatistics = () => {
    if (isAdmin) {
      return {
        total: requirements.length,
        pending: requirements.filter(r => r.status === 'pending').length,
        processing: requirements.filter(r => r.status === 'processing').length,
        completed: requirements.filter(r => r.status === 'completed').length
      };
    } else if (isPartner) {
      return {
        total: products.length,
        active: products.filter(p => p.status === 'active').length,
        inactive: products.filter(p => p.status === 'inactive').length,
        totalViews: products.reduce((sum, p) => sum + p.views, 0),
        totalOrders: products.reduce((sum, p) => sum + p.orders, 0)
      };
    } else {
      return {
        total: requirements.length,
        pending: requirements.filter(r => r.status === 'pending').length,
        processing: requirements.filter(r => r.status === 'processing').length,
        completed: requirements.filter(r => r.status === 'completed').length
      };
    }
  };

  const stats = getStatistics();

  if (!currentUser) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 50%, #f5f7fa 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* 用户信息卡片 */}
        <Card
          style={{
            marginBottom: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none'
          }}
          bodyStyle={{ padding: '32px' }}
        >
          <Row gutter={24} align="middle">
            <Col>
              <Avatar
                size={80}
                src={currentUser.userAvatar}
                icon={<UserOutlined />}
                style={{
                  border: '4px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              />
            </Col>
            <Col flex={1}>
              <Title level={3} style={{ color: '#fff', marginBottom: '8px' }}>
                {currentUser.userName || '用户'}
              </Title>
              <Space>
                <Tag color="rgba(255,255,255,0.3)" style={{ color: '#fff', border: 'none' }}>
                  {isAdmin ? '管理员' : isPartner ? '合作伙伴' : '普通用户'}
                </Tag>
                {currentUser.id && (
                  <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
                    ID: {currentUser.id}
                  </Text>
                )}
              </Space>
            </Col>
          </Row>
        </Card>

        {/* 统计卡片 */}
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                textAlign: 'center'
              }}
            >
              <Statistic
                title={isAdmin ? '总需求数' : isPartner ? '商品总数' : '我的需求'}
                value={stats.total}
                prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
              />
            </Card>
          </Col>
          {isAdmin || isUser ? (
            <>
              <Col xs={24} sm={12} md={6}>
                <Card
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    textAlign: 'center'
                  }}
                >
                  <Statistic
                    title="待处理"
                    value={stats.pending}
                    prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    textAlign: 'center'
                  }}
                >
                  <Statistic
                    title="处理中"
                    value={stats.processing}
                    prefix={<ClockCircleOutlined style={{ color: '#1890ff' }} />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    textAlign: 'center'
                  }}
                >
                  <Statistic
                    title="已完成"
                    value={stats.completed}
                    prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                  />
                </Card>
              </Col>
            </>
          ) : (
            <>
              <Col xs={24} sm={12} md={6}>
                <Card
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    textAlign: 'center'
                  }}
                >
                  <Statistic
                    title="上架中"
                    value={stats.active}
                    prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    textAlign: 'center'
                  }}
                >
                  <Statistic
                    title="总浏览量"
                    value={stats.totalViews}
                    prefix={<EyeOutlined style={{ color: '#1890ff' }} />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    textAlign: 'center'
                  }}
                >
                  <Statistic
                    title="总订单数"
                    value={stats.totalOrders}
                    prefix={<ShoppingOutlined style={{ color: '#722ed1' }} />}
                  />
                </Card>
              </Col>
            </>
          )}
        </Row>

        {/* 内容区域 */}
        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            size="large"
          >
            <TabPane
              tab={
                <span>
                  <FileTextOutlined />
                  {isAdmin ? '所有需求' : '我的需求'}
                </span>
              }
              key="requirements"
            >
              <Table
                columns={requirementColumns}
                dataSource={requirements}
                rowKey="id"
                loading={loading}
                scroll={{ x: 1200 }}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total) => `共 ${total} 条记录`
                }}
                locale={{
                  emptyText: <Empty description="暂无需求" />
                }}
              />
            </TabPane>
            {isPartner && (
              <TabPane
                tab={
                  <span>
                    <ShoppingOutlined />
                    我的商品
                  </span>
                }
                key="products"
              >
                <Table
                  columns={productColumns}
                  dataSource={products}
                  rowKey="id"
                  loading={loading}
                  scroll={{ x: 1400 }}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `共 ${total} 条记录`
                  }}
                  locale={{
                    emptyText: <Empty description="暂无商品" />
                  }}
                />
              </TabPane>
            )}
          </Tabs>
        </Card>

        {/* 详情弹窗 */}
        <Modal
          title={isPartner ? '商品详情' : '需求详情'}
          open={detailModalVisible}
          onCancel={() => {
            setDetailModalVisible(false);
            setSelectedItem(null);
          }}
          footer={null}
          width={600}
        >
          {selectedItem && (
            <Descriptions column={1} bordered>
              {isPartner ? (
                <>
                  <Descriptions.Item label="商品名称">{(selectedItem as Product).name}</Descriptions.Item>
                  <Descriptions.Item label="型号">{(selectedItem as Product).model}</Descriptions.Item>
                  <Descriptions.Item label="GPU类型">{(selectedItem as Product).gpuType}</Descriptions.Item>
                  <Descriptions.Item label="GPU数量">{(selectedItem as Product).gpuCount}卡</Descriptions.Item>
                  <Descriptions.Item label="价格">¥{(selectedItem as Product).price}/小时</Descriptions.Item>
                  <Descriptions.Item label="地区">{(selectedItem as Product).region}</Descriptions.Item>
                  <Descriptions.Item label="状态">{getStatusTag((selectedItem as Product).status)}</Descriptions.Item>
                  <Descriptions.Item label="浏览量">{(selectedItem as Product).views}</Descriptions.Item>
                  <Descriptions.Item label="订单数">{(selectedItem as Product).orders}</Descriptions.Item>
                  <Descriptions.Item label="发布时间">{(selectedItem as Product).createTime}</Descriptions.Item>
                </>
              ) : (
                <>
                  <Descriptions.Item label="需求标题">{(selectedItem as Requirement).title}</Descriptions.Item>
                  <Descriptions.Item label="需求描述">{(selectedItem as Requirement).description}</Descriptions.Item>
                  <Descriptions.Item label="GPU类型">{(selectedItem as Requirement).gpuType}</Descriptions.Item>
                  <Descriptions.Item label="GPU数量">{(selectedItem as Requirement).gpuCount}卡</Descriptions.Item>
                  <Descriptions.Item label="预算">¥{(selectedItem as Requirement).budget.toLocaleString()}</Descriptions.Item>
                  <Descriptions.Item label="截止日期">{(selectedItem as Requirement).deadline}</Descriptions.Item>
                  <Descriptions.Item label="状态">{getStatusTag((selectedItem as Requirement).status)}</Descriptions.Item>
                  {isAdmin && (selectedItem as Requirement).userName && (
                    <Descriptions.Item label="发布用户">{(selectedItem as Requirement).userName}</Descriptions.Item>
                  )}
                  <Descriptions.Item label="发布时间">{(selectedItem as Requirement).createTime}</Descriptions.Item>
                </>
              )}
            </Descriptions>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Profile;

