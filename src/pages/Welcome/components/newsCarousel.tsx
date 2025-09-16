
import { Carousel, Button, Typography } from 'antd';
import React from 'react';
import { 
  RightOutlined,
  LeftOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// 轮播图内容
const carouselData = [
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
  
  // 轮播图组件
  // 轮播图组件 - 精确控制高度
  const NewsCarousel: React.FC = () => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Carousel
          autoplay
        //   dots={{
        //     style: {
        //       bottom: 20
        //     }
        //   }}
          arrows
          prevArrow={<LeftOutlined style={{ 
            fontSize: '24px', 
            color: '#fff',
            backgroundColor: 'rgba(0,0,0,0.3)',
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            left: 10
          }} />}
          nextArrow={<RightOutlined style={{ 
            fontSize: '24px', 
            color: '#fff',
            backgroundColor: 'rgba(0,0,0,0.3)',
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            right: 10
          }} />}
        >
          {carouselData.map((item, index) => (
            <div key={index} style={{ height: '100%' }}>
              <div style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                height: '100%'
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
                  padding: '24px',
                  color: '#fff'
                }}>
                  <Title level={4} style={{ color: '#fff', marginBottom: '8px', fontSize: '18px', marginTop: 0 }}>
                    {item.title}
                  </Title>
                  <Paragraph style={{ color: '#fff', marginBottom: '12px', fontSize: '14px', lineHeight: 1.6, marginTop: 0 }}>
                    {item.summary}
                  </Paragraph>
                  <Button 
                    type="link" 
                    size="small"
                    style={{ 
                      color: '#fff',
                      padding: 0,
                      fontSize: '14px'
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