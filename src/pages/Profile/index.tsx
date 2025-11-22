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
  Badge,
  Spin
} from 'antd';
import {
  UserOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  DollarOutlined,
  TeamOutlined,
  ShopOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { listOrderByPageUsingPost } from '@/services/backend/orderController';
import { listFavouriteByPageUsingPost } from '@/services/backend/favouriteController';
import { listRequirementByPageUsingPost } from '@/services/backend/requirementController';
import { listProductByPageUsingPost } from '@/services/backend/productController';
import { listUserByPageUsingPost } from '@/services/backend/userController';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// 订单数据类型（购买记录/出售记录）
interface Order {
  id: string;
  productName: string;
  orderDate: string;
  expireDate: string;
  contractAmount: number;
  paymentMethod: string;
  contractCode: string;
  projectStatus: 'pending' | 'active' | 'completed' | 'cancelled';
  userId?: string;
  userName?: string;
  createTime?: string;
}

// 收藏数据类型
interface Favourite {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  price: number;
  createTime: string;
}

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
  
  // 判断用户角色
  const userRole = currentUser?.userRole || 'user';
  const isAdmin = userRole === 'admin';
  const isPartner = userRole === 'partner';
  const isUser = userRole === 'user' || !userRole;

  // 状态管理
  const [activeTab, setActiveTab] = useState<string>(
    isAdmin ? 'orders' : isPartner ? 'products' : 'orders'
  );
  const [loading, setLoading] = useState(false);
  
  // 数据状态
  const [orders, setOrders] = useState<Order[]>([]);
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [allPartners, setAllPartners] = useState<any[]>([]);
  
  // 详情弹窗
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    if (!currentUser) {
      message.warning({
        content: '请先登录',
        duration: 3
      });
      history.push('/user/login?redirect=/profile');
      return;
    }
    loadData();
  }, [currentUser, activeTab]);

  // 加载数据
  const loadData = async () => {
    setLoading(true);
    try {
      if (isAdmin) {
        // 管理员：加载所有订单
        if (activeTab === 'orders') {
          await loadOrders();
        } else if (activeTab === 'users') {
          await loadAllUsers();
        } else if (activeTab === 'partners') {
          await loadAllPartners();
        }
      } else if (isPartner) {
        // 算力同盟：加载商品和出售记录
        if (activeTab === 'products') {
          await loadProducts();
        } else if (activeTab === 'orders') {
          await loadOrders('sale');
        }
      } else {
        // 普通用户：加载购买记录、收藏、需求
        if (activeTab === 'orders') {
          await loadOrders('purchase');
        } else if (activeTab === 'favourites') {
          await loadFavourites();
        } else if (activeTab === 'requirements') {
          await loadRequirements();
        }
      }
    } catch (error) {
      console.error('加载数据失败:', error);
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 加载订单（购买记录/出售记录）
  const loadOrders = async (type: 'purchase' | 'sale' = 'purchase') => {
    try {
      const res = await listOrderByPageUsingPost({
        current: 1,
        pageSize: 100,
        userId: isAdmin ? undefined : currentUser?.id,
        type: isAdmin ? undefined : type
      });
      if (res?.data?.records) {
        const orderList = res.data.records.map((item: any) => ({
          id: item.id,
          productName: item.productName || item.product?.name || '未知产品',
          orderDate: item.orderDate || item.createTime || '',
          expireDate: item.expireDate || item.expireTime || '',
          contractAmount: item.contractAmount || item.amount || 0,
          paymentMethod: item.paymentMethod || '在线支付',
          contractCode: item.contractCode || item.contractNo || '-',
          projectStatus: item.projectStatus || item.status || 'pending',
          userId: item.userId,
          userName: item.userName || item.user?.userName
        }));
        setOrders(orderList.length > 0 ? orderList : getDefaultOrders());
      } else {
        setOrders(getDefaultOrders());
      }
    } catch (error) {
      console.error('加载订单失败:', error);
      setOrders(getDefaultOrders());
    }
  };

  // 加载收藏
  const loadFavourites = async () => {
    try {
      const res = await listFavouriteByPageUsingPost({
        current: 1,
        pageSize: 100,
        userId: currentUser?.id
      });
      if (res?.data?.records) {
        const favList = res.data.records.map((item: any) => ({
          id: item.id,
          productId: item.productId,
          productName: item.productName || item.product?.name || '未知产品',
          productImage: item.productImage || item.product?.image,
          price: item.price || item.product?.price || 0,
          createTime: item.createTime || ''
        }));
        setFavourites(favList.length > 0 ? favList : getDefaultFavourites());
      } else {
        setFavourites(getDefaultFavourites());
      }
    } catch (error) {
      console.error('加载收藏失败:', error);
      setFavourites(getDefaultFavourites());
    }
  };

  // 加载需求
  const loadRequirements = async () => {
    try {
      const res = await listRequirementByPageUsingPost({
        current: 1,
        pageSize: 100,
        userId: currentUser?.id
      });
      if (res?.data?.records) {
        const reqList = res.data.records.map((item: any) => ({
          id: item.id,
          title: item.title || item.name,
          description: item.description || item.content || '',
          gpuType: item.gpuType || '',
          gpuCount: item.gpuCount || 0,
          budget: item.budget || 0,
          deadline: item.deadline || item.deadlineDate || '',
          status: item.status || 'pending',
          createTime: item.createTime || '',
          userId: item.userId,
          userName: item.userName || ''
        }));
        setRequirements(reqList.length > 0 ? reqList : getDefaultRequirements());
      } else {
        setRequirements(getDefaultRequirements());
      }
    } catch (error) {
      console.error('加载需求失败:', error);
      setRequirements(getDefaultRequirements());
    }
  };

  // 加载商品
  const loadProducts = async () => {
    try {
      const res = await listProductByPageUsingPost({
        current: 1,
        pageSize: 100,
        userId: currentUser?.id
      });
      if (res?.data?.records) {
        const prodList = res.data.records.map((item: any) => ({
          id: item.id,
          name: item.name || item.title,
          model: item.model || '',
          gpuType: item.gpuType || item.name,
          gpuCount: item.gpuCount || 0,
          price: item.price || 0,
          region: item.region || item.location || '',
          status: item.status || 'active',
          createTime: item.createTime || '',
          views: item.views || item.viewCount || 0,
          orders: item.orders || item.orderCount || 0
        }));
        setProducts(prodList.length > 0 ? prodList : getDefaultProducts());
      } else {
        setProducts(getDefaultProducts());
      }
    } catch (error) {
      console.error('加载商品失败:', error);
      setProducts(getDefaultProducts());
    }
  };

  // 加载所有用户（管理员）
  const loadAllUsers = async () => {
    try {
      const res = await listUserByPageUsingPost({
        current: 1,
        pageSize: 100,
        userRole: 'user'
      });
      if (res?.data?.records) {
        setAllUsers(res.data.records);
      }
    } catch (error) {
      console.error('加载用户失败:', error);
    }
  };

  // 加载所有合作伙伴（管理员）
  const loadAllPartners = async () => {
    try {
      const res = await listUserByPageUsingPost({
        current: 1,
        pageSize: 100,
        userRole: 'partner'
      });
      if (res?.data?.records) {
        setAllPartners(res.data.records);
      }
    } catch (error) {
      console.error('加载合作伙伴失败:', error);
    }
  };

  // 默认数据
  const getDefaultOrders = (): Order[] => [
    {
      id: '1',
      productName: 'NVIDIA A100 80GB GPU算力服务',
      orderDate: '2024-01-15',
      expireDate: '2024-04-15',
      contractAmount: 50000,
      paymentMethod: '在线支付',
      contractCode: 'HT20240115001',
      projectStatus: 'active',
      userName: isAdmin ? '张三' : undefined
    },
    {
      id: '2',
      productName: 'NVIDIA RTX 4090 图形渲染服务',
      orderDate: '2024-01-10',
      expireDate: '2024-03-10',
      contractAmount: 20000,
      paymentMethod: '银行转账',
      contractCode: 'HT20240110002',
      projectStatus: 'completed',
      userName: isAdmin ? '李四' : undefined
    }
  ];

  const getDefaultFavourites = (): Favourite[] => [
    {
      id: '1',
      productId: '1',
      productName: 'NVIDIA A100 80GB GPU算力服务',
      price: 50000,
      createTime: '2024-01-15 10:30:00'
    },
    {
      id: '2',
      productId: '2',
      productName: 'NVIDIA RTX 4090 图形渲染服务',
      price: 20000,
      createTime: '2024-01-10 14:20:00'
    }
  ];

  const getDefaultRequirements = (): Requirement[] => [
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
    }
  ];

  const getDefaultProducts = (): Product[] => [
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
    }
  ];

  // 状态标签
  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string; icon: React.ReactNode }> = {
      pending: { color: 'orange', text: '待处理', icon: <ClockCircleOutlined /> },
      processing: { color: 'blue', text: '处理中', icon: <ClockCircleOutlined /> },
      completed: { color: 'green', text: '已完成', icon: <CheckCircleOutlined /> },
      cancelled: { color: 'red', text: '已取消', icon: <DeleteOutlined /> },
      active: { color: 'green', text: '进行中', icon: <CheckCircleOutlined /> },
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

  // 订单表格列
  const orderColumns: ColumnsType<Order> = [
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 200,
      ellipsis: true
    },
    {
      title: '下单日期',
      dataIndex: 'orderDate',
      key: 'orderDate',
      width: 120
    },
    {
      title: '到期日期',
      dataIndex: 'expireDate',
      key: 'expireDate',
      width: 120
    },
    {
      title: '签约金额',
      dataIndex: 'contractAmount',
      key: 'contractAmount',
      width: 120,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '付款方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 120
    },
    {
      title: '合同编码',
      dataIndex: 'contractCode',
      key: 'contractCode',
      width: 150
    },
    {
      title: '项目状态',
      dataIndex: 'projectStatus',
      key: 'projectStatus',
      width: 120,
      render: (status: string) => getStatusTag(status)
    },
    ...(isAdmin ? [{
      title: '用户',
      dataIndex: 'userName',
      key: 'userName',
      width: 120
    }] : []),
    {
      title: '操作',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          style={{ 
            color: '#1890ff',
            fontWeight: 500,
            padding: '0 8px'
          }}
          onClick={() => {
            setSelectedItem(record);
            setDetailModalVisible(true);
          }}
        >
          查看详情
        </Button>
      )
    }
  ];

  // 收藏表格列
  const favouriteColumns: ColumnsType<Favourite> = [
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 200,
      ellipsis: true
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price: number) => `¥${price.toLocaleString()}`
    },
    {
      title: '收藏时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            style={{ 
              color: '#1890ff',
              fontWeight: 500,
              padding: '0 8px'
            }}
            onClick={() => history.push(`/market/product/${record.productId}`)}
          >
            查看详情
          </Button>
          <Button
            type="link"
            size="small"
            danger
            style={{ 
              fontWeight: 500,
              padding: '0 8px'
            }}
            onClick={() => message.info('取消收藏功能待实现')}
          >
            取消收藏
          </Button>
        </Space>
      )
    }
  ];

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
    {
      title: '操作',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          style={{ 
            color: '#1890ff',
            fontWeight: 500,
            padding: '0 8px'
          }}
          onClick={() => {
            setSelectedItem(record);
            setDetailModalVisible(true);
          }}
        >
          查看详情
        </Button>
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
      width: 150
    },
    {
      title: 'GPU类型',
      dataIndex: 'gpuType',
      key: 'gpuType',
      width: 150
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price: number) => `¥${price}/小时`
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
      width: 100
    },
    {
      title: '订单数',
      dataIndex: 'orders',
      key: 'orders',
      width: 100
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            style={{ 
              color: '#1890ff',
              fontWeight: 500,
              padding: '0 8px'
            }}
            onClick={() => {
              setSelectedItem(record);
              setDetailModalVisible(true);
            }}
          >
            查看详情
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            style={{ 
              color: '#52c41a',
              fontWeight: 500,
              padding: '0 8px'
            }}
            onClick={() => message.info('编辑功能待实现')}
          >
            编辑
          </Button>
        </Space>
      )
    }
  ];

  // 用户表格列（管理员）
  const userColumns: ColumnsType<any> = [
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      width: 150
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      key: 'userAccount',
      width: 150
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      key: 'userRole',
      width: 100,
      render: (role: string) => {
        const roleMap: Record<string, { color: string; text: string }> = {
          user: { color: 'blue', text: '普通用户' },
          partner: { color: 'green', text: '算力同盟' },
          admin: { color: 'red', text: '管理员' }
        };
        const config = roleMap[role] || { color: 'default', text: role };
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            style={{ 
              color: '#1890ff',
              fontWeight: 500,
              padding: '0 8px'
            }}
            onClick={() => message.info('查看详情功能待实现')}
          >
            查看
          </Button>
          <Button
            type="link"
            size="small"
            danger
            style={{ 
              fontWeight: 500,
              padding: '0 8px'
            }}
            onClick={() => message.info('删除功能待实现')}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  if (!currentUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '24px', 
      background: 'linear-gradient(180deg, #f0f2f5 0%, #fafafa 100%)', 
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* 背景装饰 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
        pointerEvents: 'none'
      }} />
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* 用户信息卡片 - 美化版 */}
        <Card
          style={{
            marginBottom: '32px',
            borderRadius: '20px',
            background: isAdmin 
              ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              : isPartner
              ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            overflow: 'hidden',
            position: 'relative'
          }}
          bodyStyle={{ padding: '40px' }}
        >
          {/* 背景装饰图案 */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30%',
            left: '-5%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            borderRadius: '50%'
          }} />
          
          <Row align="middle" gutter={32} style={{ position: 'relative', zIndex: 1 }}>
            <Col>
              <div style={{
                position: 'relative',
                padding: '8px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }}>
                <Avatar
                  size={100}
                  src={currentUser.userAvatar}
                  icon={<UserOutlined />}
                  style={{
                    border: '4px solid rgba(255,255,255,0.5)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                  }}
                />
                {/* 在线状态指示器 */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  width: '20px',
                  height: '20px',
                  background: '#52c41a',
                  border: '3px solid rgba(255,255,255,0.8)',
                  borderRadius: '50%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }} />
              </div>
            </Col>
            <Col flex={1}>
              <Title level={2} style={{ 
                color: '#fff', 
                marginBottom: '12px',
                fontSize: '32px',
                fontWeight: 700,
                textShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}>
                {currentUser.userName || '用户'}
              </Title>
              <Space size="large" wrap>
                <Tag 
                  style={{ 
                    background: 'rgba(255,255,255,0.25)',
                    color: '#fff', 
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '20px',
                    padding: '4px 16px',
                    fontSize: '14px',
                    fontWeight: 500,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {isAdmin ? '👑 管理员' : isPartner ? '🤝 算力同盟' : '👤 普通用户'}
                </Tag>
                {currentUser.id && (
                  <Text style={{ 
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: '14px',
                    background: 'rgba(255,255,255,0.15)',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    ID: {currentUser.id}
                  </Text>
                )}
              </Space>
              {currentUser.userProfile && (
                <div style={{ marginTop: '16px' }}>
                  <Text style={{ 
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '14px',
                    lineHeight: 1.6
                  }}>
                    {currentUser.userProfile}
                  </Text>
                </div>
              )}
            </Col>
          </Row>
        </Card>


        {/* 内容区域 - 美化版 */}
        <Card 
          style={{ 
            borderRadius: '20px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            border: 'none',
            overflow: 'hidden',
            background: '#ffffff'
          }}
          bodyStyle={{ padding: '32px' }}
        >
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab} 
            size="large"
          >
            {/* 普通用户：购买记录、收藏、需求管理 */}
            {isUser && (
              <>
                <TabPane
                  tab={<span><ShoppingOutlined />购买记录</span>}
                  key="orders"
                >
                  <Table
                    columns={orderColumns}
                    dataSource={orders}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 1200 }}
                    pagination={{ 
                      pageSize: 10, 
                      showSizeChanger: true, 
                      showTotal: (total) => `共 ${total} 条记录`,
                      showQuickJumper: true
                    }}
                    locale={{ emptyText: <Empty description="暂无购买记录" /> }}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}
                    rowClassName={() => 'profile-table-row'}
                  />
                </TabPane>
                <TabPane
                  tab={<span><HeartOutlined />我的收藏</span>}
                  key="favourites"
                >
                  <Table
                    columns={favouriteColumns}
                    dataSource={favourites}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 800 }}
                    pagination={{ 
                      pageSize: 10, 
                      showSizeChanger: true, 
                      showTotal: (total) => `共 ${total} 条记录`,
                      showQuickJumper: true
                    }}
                    locale={{ emptyText: <Empty description="暂无收藏" /> }}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}
                    rowClassName={() => 'profile-table-row'}
                  />
                </TabPane>
                <TabPane
                  tab={<span><FileTextOutlined />需求管理</span>}
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
                      showTotal: (total) => `共 ${total} 条记录`,
                      showQuickJumper: true
                    }}
                    locale={{ emptyText: <Empty description="暂无需求" /> }}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}
                    rowClassName={() => 'profile-table-row'}
                  />
                </TabPane>
              </>
            )}

            {/* 算力同盟：我的商品、出售记录 */}
            {isPartner && (
              <>
                <TabPane
                  tab={<span><ShopOutlined />我的商品</span>}
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
                      showTotal: (total) => `共 ${total} 条记录`,
                      showQuickJumper: true
                    }}
                    locale={{ emptyText: <Empty description="暂无商品" /> }}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}
                    rowClassName={() => 'profile-table-row'}
                  />
                </TabPane>
                <TabPane
                  tab={<span><DollarOutlined />出售记录</span>}
                  key="orders"
                >
                  <Table
                    columns={orderColumns}
                    dataSource={orders}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 1200 }}
                    pagination={{ 
                      pageSize: 10, 
                      showSizeChanger: true, 
                      showTotal: (total) => `共 ${total} 条记录`,
                      showQuickJumper: true
                    }}
                    locale={{ emptyText: <Empty description="暂无出售记录" /> }}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}
                    rowClassName={() => 'profile-table-row'}
                  />
                </TabPane>
              </>
            )}

            {/* 管理员：所有订单、用户管理、算力同盟管理 */}
            {isAdmin && (
              <>
                <TabPane
                  tab={<span><ShoppingOutlined />所有订单</span>}
                  key="orders"
                >
                  <Table
                    columns={orderColumns}
                    dataSource={orders}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 1400 }}
                    pagination={{ 
                      pageSize: 10, 
                      showSizeChanger: true, 
                      showTotal: (total) => `共 ${total} 条记录`,
                      showQuickJumper: true
                    }}
                    locale={{ emptyText: <Empty description="暂无订单" /> }}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}
                    rowClassName={() => 'profile-table-row'}
                  />
                </TabPane>
                <TabPane
                  tab={<span><UserOutlined />用户管理</span>}
                  key="users"
                >
                  <Table
                    columns={userColumns}
                    dataSource={allUsers}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 800 }}
                    pagination={{ 
                      pageSize: 10, 
                      showSizeChanger: true, 
                      showTotal: (total) => `共 ${total} 条记录`,
                      showQuickJumper: true
                    }}
                    locale={{ emptyText: <Empty description="暂无用户" /> }}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}
                    rowClassName={() => 'profile-table-row'}
                  />
                </TabPane>
                <TabPane
                  tab={<span><TeamOutlined />算力同盟管理</span>}
                  key="partners"
                >
                  <Table
                    columns={userColumns}
                    dataSource={allPartners}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 800 }}
                    pagination={{ 
                      pageSize: 10, 
                      showSizeChanger: true, 
                      showTotal: (total) => `共 ${total} 条记录`,
                      showQuickJumper: true
                    }}
                    locale={{ emptyText: <Empty description="暂无算力同盟" /> }}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}
                    rowClassName={() => 'profile-table-row'}
                  />
                </TabPane>
              </>
            )}
          </Tabs>
        </Card>

        {/* 详情弹窗 - 美化版 */}
        <Modal
          title={
            <div style={{ 
              fontSize: '20px', 
              fontWeight: 600,
              color: '#1f2329'
            }}>
              {selectedItem?.productName ? '订单详情' : selectedItem?.title ? '需求详情' : '商品详情'}
            </div>
          }
          open={detailModalVisible}
          onCancel={() => {
            setDetailModalVisible(false);
            setSelectedItem(null);
          }}
          footer={null}
          width={700}
          style={{
            borderRadius: '16px'
          }}
          styles={{
            content: {
              borderRadius: '16px',
              padding: '24px'
            },
            header: {
              borderBottom: '1px solid #f0f0f0',
              paddingBottom: '16px',
              marginBottom: '24px'
            }
          }}
        >
          {selectedItem && (
            <Descriptions 
              column={1} 
              bordered
              labelStyle={{
                background: '#fafafa',
                fontWeight: 500,
                width: '140px'
              }}
              contentStyle={{
                background: '#fff'
              }}
            >
              {selectedItem.productName ? (
                // 订单详情
                <>
                  <Descriptions.Item label="产品名称">{selectedItem.productName}</Descriptions.Item>
                  <Descriptions.Item label="下单日期">{selectedItem.orderDate}</Descriptions.Item>
                  <Descriptions.Item label="到期日期">{selectedItem.expireDate}</Descriptions.Item>
                  <Descriptions.Item label="签约金额">¥{selectedItem.contractAmount.toLocaleString()}</Descriptions.Item>
                  <Descriptions.Item label="付款方式">{selectedItem.paymentMethod}</Descriptions.Item>
                  <Descriptions.Item label="合同编码">{selectedItem.contractCode}</Descriptions.Item>
                  <Descriptions.Item label="项目状态">{getStatusTag(selectedItem.projectStatus)}</Descriptions.Item>
                  {selectedItem.userName && <Descriptions.Item label="用户">{selectedItem.userName}</Descriptions.Item>}
                </>
              ) : selectedItem.title ? (
                // 需求详情
                <>
                  <Descriptions.Item label="需求标题">{selectedItem.title}</Descriptions.Item>
                  <Descriptions.Item label="需求描述">{selectedItem.description}</Descriptions.Item>
                  <Descriptions.Item label="GPU类型">{selectedItem.gpuType}</Descriptions.Item>
                  <Descriptions.Item label="GPU数量">{selectedItem.gpuCount}卡</Descriptions.Item>
                  <Descriptions.Item label="预算">¥{selectedItem.budget.toLocaleString()}</Descriptions.Item>
                  <Descriptions.Item label="截止日期">{selectedItem.deadline}</Descriptions.Item>
                  <Descriptions.Item label="状态">{getStatusTag(selectedItem.status)}</Descriptions.Item>
                </>
              ) : (
                // 商品详情
                <>
                  <Descriptions.Item label="商品名称">{selectedItem.name}</Descriptions.Item>
                  <Descriptions.Item label="型号">{selectedItem.model}</Descriptions.Item>
                  <Descriptions.Item label="GPU类型">{selectedItem.gpuType}</Descriptions.Item>
                  <Descriptions.Item label="GPU数量">{selectedItem.gpuCount}卡</Descriptions.Item>
                  <Descriptions.Item label="价格">¥{selectedItem.price}/小时</Descriptions.Item>
                  <Descriptions.Item label="地区">{selectedItem.region}</Descriptions.Item>
                  <Descriptions.Item label="状态">{getStatusTag(selectedItem.status)}</Descriptions.Item>
                  <Descriptions.Item label="浏览量">{selectedItem.views}</Descriptions.Item>
                  <Descriptions.Item label="订单数">{selectedItem.orders}</Descriptions.Item>
                </>
              )}
            </Descriptions>
          )}
        </Modal>
      </div>
      
      {/* 全局样式 */}
      <style>{`
        .profile-table-row {
          transition: all 0.2s ease;
        }
        .profile-table-row:hover {
          background: #f8f9ff !important;
          transform: scale(1.005);
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1) !important;
        }
        .ant-table-thead > tr > th {
          background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%) !important;
          font-weight: 600 !important;
          color: #1f2329 !important;
          border-bottom: 2px solid #e8e8e8 !important;
          padding: 16px !important;
        }
        .ant-table-tbody > tr > td {
          padding: 16px !important;
          border-bottom: 1px solid #f0f0f0 !important;
        }
        .ant-tabs-tab {
          transition: all 0.3s ease !important;
          padding: 12px 24px !important;
          font-size: 16px !important;
          margin: 0 8px !important;
        }
        .ant-tabs-tab:hover {
          color: #667eea !important;
        }
        .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #667eea !important;
          font-weight: 600 !important;
        }
        .ant-tabs-ink-bar {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%) !important;
          height: 3px !important;
          border-radius: 2px !important;
        }
        .ant-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .ant-table {
          border-radius: 12px !important;
          overflow: hidden !important;
        }
        .ant-table-container {
          border-radius: 12px !important;
        }
        .ant-pagination {
          margin-top: 24px !important;
        }
        .ant-empty {
          padding: 60px 0 !important;
        }
      `}</style>
    </div>
  );
};

export default Profile;

