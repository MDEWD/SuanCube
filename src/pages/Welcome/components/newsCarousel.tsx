
import { Carousel, Button, Typography, Spin, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { 
  RightOutlined,
  LeftOutlined
} from '@ant-design/icons';
import { listNewsUsingGet } from '@/services/backend/newsController';

const { Title, Paragraph } = Typography;

// 新闻数据类型
interface NewsItem {
  id?: string;
  image?: string;
  title?: string;
  summary?: string;
  tag?: string;
}

  // 轮播图组件
  // 轮播图组件 - 精确控制高度
  const NewsCarousel: React.FC = () => {
    const [carouselData, setCarouselData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      loadNews();
    }, []);

    const loadNews = async () => {
      try {
        setLoading(true);
        const res = await listNewsUsingGet({ current: 1, pageSize: 5 });
        if (res?.data?.records) {
          const newsList = res.data.records.map((item: any) => ({
            id: item.id,
            image: item.image || item.coverImage || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
            title: item.title,
            summary: item.summary || item.content?.substring(0, 100) + '...',
            tag: item.category || item.tag || '新闻资讯'
          }));
          setCarouselData(newsList.length > 0 ? newsList : getDefaultNews());
        } else {
          setCarouselData(getDefaultNews());
        }
      } catch (error) {
        console.error('加载新闻失败:', error);
        setCarouselData(getDefaultNews());
      } finally {
        setLoading(false);
      }
    };

    // 默认新闻数据（当API失败时使用）
    const getDefaultNews = (): NewsItem[] => [
      {
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
        title: '财通证券丽水分公司总经理叶伟杰莅临叶林云调研指导',
        summary: '2024年6月3日，财通证券股份有限公司丽水分公司总经理叶伟杰一行莅临叶林云调研指导。此次调研活动中，叶伟杰总经理详细了解了叶林云在产业情况、项目经营情况，对企业的发展方向、融资指导等方面未来规划提供...',
        tag: '新闻资讯'
      },
      {
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
        title: '叶林云与多家企业达成战略合作',
        summary: '近日，叶林云与多家知名企业签署战略合作协议，将在云计算、人工智能等领域展开深度合作，共同推动产业数字化转型...',
        tag: '企业动态'
      },
      {
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop',
        title: '叶林云荣获"年度最佳云服务提供商"奖项',
        summary: '在2024年度云计算行业评选中，叶林云凭借优质的服务和创新的技术方案，荣获"年度最佳云服务提供商"奖项...',
        tag: '荣誉奖项'
      }
    ];

    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
          <Spin size="large" />
        </div>
      );
    }
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Carousel
          autoplay
          style={{ height: '100%' }}
          arrows
          prevArrow={<LeftOutlined style={{ 
            fontSize: '20px', 
            color: '#fff',
            backgroundColor: 'rgba(0,0,0,0.3)',
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            left: 8,
            zIndex: 10
          }} />}
          nextArrow={<RightOutlined style={{ 
            fontSize: '20px', 
            color: '#fff',
            backgroundColor: 'rgba(0,0,0,0.3)',
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            right: 8,
            zIndex: 10
          }} />}
        >
          {carouselData.map((item, index) => (
            <div key={index} style={{ height: '280px' }}>
              <div style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                height: '100%',
                width: '100%'
              }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  padding: '16px 20px',
                  color: '#fff',
                  maxHeight: '100%',
                  overflow: 'hidden'
                }}>
                  <Title 
                    level={4} 
                    style={{ 
                      color: '#fff', 
                      marginBottom: '6px', 
                      fontSize: '16px', 
                      marginTop: 0,
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.title}
                  </Title>
                  <Paragraph 
                    style={{ 
                      color: '#fff', 
                      marginBottom: '8px', 
                      fontSize: '12px', 
                      lineHeight: 1.5, 
                      marginTop: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.summary}
                  </Paragraph>
                  <Button 
                    type="link" 
                    size="small"
                    style={{ 
                      color: '#fff',
                      padding: 0,
                      fontSize: '12px',
                      height: 'auto',
                      lineHeight: 1
                    }}
                  >
                    {item.tag}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  };

  export default NewsCarousel;