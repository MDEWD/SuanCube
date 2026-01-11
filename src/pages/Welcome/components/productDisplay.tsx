'use client';

import { Typography, Row, Col, Card, Grid, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { getHotProductsUsingGet } from '@/services/backend/productController';

const { useBreakpoint } = Grid;
import { 
  EyeOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// 商品数据类型
interface ProductItem {
  id: number | string;
  name: string;
  price: string;
  image: string;
  views?: number;
  vendor?: string;
}

// 默认商品数据
const defaultProductData: ProductItem[] = [
    {
      id: 1,
      name: '微星 RTX5090 32G 风扇卡',
      price: '2.15万',
      image: 'https://cdn.cplight.com/def/1b2b2202508051957072145.png',
      views: 455,
      vendor: '硅基流动'
    },
    {
      id: 2,
      name: 'AI深度学习服务器显卡 NV...',
      price: '2.08万',
      image: 'https://cdn.cplight.com/def/9c01920250823172444310.png',
      views: 450,
      vendor: '硅基流动'
    },
    {
      id: 3,
      name: '全新涡轮显卡RTX5090 32g',
      price: '2.15万',
      image: 'https://cdn.cplight.com/def/7835a202507311253124582.jpg',
      views: 45,
      vendor: '竞派科技'
    },
    {
      id: 4,
      name: '同德 5090 风扇',
      price: '2.05万',
      image: 'https://cdn.cplight.com/def/15fb0202507231416417113.jpg',
      views: 358,
      vendor: '深圳市广智联科技有限公司'
    }
  ];

// 商品展示组件
const ProductDisplay: React.FC = () => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const [productData, setProductData] = useState<ProductItem[]>(defaultProductData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      loadProducts();
    }, []);

    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await getHotProductsUsingGet({ limit: 4 });
        if (res?.data && res.data.length > 0) {
          const products = res.data.map((item: any) => ({
            id: item.id,
            name: item.name || item.title,
            price: item.price ? (typeof item.price === 'number' ? `${(item.price / 10000).toFixed(2)}万` : item.price) : '面议',
            image: item.image || item.imageUrl || item.coverImage || '',
            views: item.views || item.viewCount || 0,
            vendor: item.vendor || item.sellerName || ''
          }));
          setProductData(products);
        } else {
          setProductData(defaultProductData);
        }
      } catch (error) {
        console.error('加载产品失败:', error);
        setProductData(defaultProductData);
      } finally {
        setLoading(false);
      }
    };
    
    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div style={{ 
        padding: isMobile ? '10px 16px 20px' : '10px 40px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
        boxSizing: 'border-box',
        width: '100%'
      }}>
        {/* 商品区域标题 */}
        <div style={{ marginBottom: '16px' }}>
          <Title level={3} style={{ margin: 0, color: '#333', fontSize: isMobile ? '18px' : '20px' }}>
            热门GPU产品
          </Title>
        </div>
        
        {/* 商品网格布局 */}
        <Row gutter={[12, 12]}>
          {productData.length === 0 ? (
            <Col span={24}>
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                暂无产品数据
              </div>
            </Col>
          ) : (
            productData.map(product => (
            <Col xs={12} sm={8} md={6} key={product.id}>
              <Card 
                hoverable
                style={{ 
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease'
                }}
                bodyStyle={{ padding: 0 }}
              >
                {/* 商品图片 */}
                <div style={{ height: isMobile ? '120px' : '140px', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      (e.target as HTMLImageElement).style.transform = 'scale(1)';
                    }}
                  />
                </div>
                
                {/* 商品信息 */}
                <div style={{ padding: isMobile ? '10px' : '12px' }}>
                  <Title level={5} style={{ 
                    margin: 0, 
                    marginBottom: '6px', 
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: isMobile ? '12px' : '14px'
                  }}>
                    {product.name}
                  </Title>
                  
                  <div style={{ marginBottom: '0' }}>
                    <Text style={{ fontSize: isMobile ? '14px' : '16px', color: '#f50', fontWeight: 'bold' }}>
                      ¥{product.price}
                    </Text>
                  </div>
                  
                  {/* <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: '#888'
                  }}>
                    <span>{product.vendor}</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <EyeOutlined style={{ fontSize: '12px', marginRight: '4px' }} />
                      <span>{product.views}</span>
                    </div>
                  </div> */}
                </div>
              </Card>
            </Col>
            ))
          )}
        </Row>
      </div>
    );
  };

export default ProductDisplay;