import { Typography, Row, Col } from 'antd';
import React from 'react';
const { Title, Text } = Typography;

// 合作伙伴数据
const partnersData = [
    { id: 1, name: '金山云', logo: 'https://gpucloud-share-prod.obs.myhuaweicloud.com/images/home/partner28.png', alt: '金山云 logo' },
    { id: 2, name: '字节云', logo: 'https://gpucloud-share-prod.obs.myhuaweicloud.com/images/home/partner29.png', alt: '字节云 logo' },
    { id: 3, name: '七牛云', logo: 'https://gpucloud-share-prod.obs.myhuaweicloud.com/images/home/partner4.png' },
    { id: 4, name: '紫讯', logo: 'https://gpucloud-share-prod.obs.myhuaweicloud.com/images/home/partner10.png', alt: '紫讯 logo' },
    { id: 5, name: '国家电网', logo: 'https://gpucloud-share-prod.obs.myhuaweicloud.com/images/home/partner11.png', alt: '国家电网 logo' },
    { id: 6, name: '阿里云', logo: 'https://gpucloud-share-prod.obs.myhuaweicloud.com/images/home/partner1.png', alt: '阿里云 logo' },
    { id: 7, name: '优刻得', logo: 'https://gpucloud-share-prod.obs.myhuaweicloud.com/images/home/partner2.png', alt: '优刻得 logo' },
    { id: 8, name: '华为云', logo: 'https://gpucloud-share-prod.obs.myhuaweicloud.com/images/home/partner3.png', alt: '华为云 logo' },
    { id: 9, name: '清华大学', logo: 'https://gpucloud-share-prod.obs.myhuaweicloud.com/images/home/partner5.png', alt: '清华大学 logo' },
    { id: 10, name: '哥伦比亚大学', logo: 'https://gpucloud-share-prod.obs.myhuaweicloud.com/images/home/partner6.png', alt: '哥伦比亚大学 logo' },
    { id: 11, name: '纽约大学', logo: 'https://gpucloud-share-prod.obs.myhuaweicloud.com/images/home/partner7.png', alt: '纽约大学 logo' },
    { id: 12, name: '爱丁堡大学', logo: 'https://gpucloud-share-prod.obs.myhuaweicloud.com/images/home/partner8.png', alt: '爱丁堡大学 logo' },
  ];

// 合作伙伴展示组件
const Partner: React.FC = () => {
    return (
      <div style={{
        padding: '40px',
        backgroundColor: '#181928',
        marginTop: '40px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* 标题部分 */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <Title level={2} style={{
              color: '#666',
              marginBottom: '8px'
            }}>
              合作伙伴
            </Title>
            <Text style={{
              color: '#b8b8b8',
              fontSize: '16px'
            }}>
              Cooperation and win-win
            </Text>
          </div>
          
          {/* 合作伙伴网格 */}
          <Row gutter={[24, 24]}>
            {partnersData.map(partner => (
              <Col xs={6} sm={4} md={3} key={partner.id}>
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100px',
                  transition: 'transform 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.alt}
                    style={{
                      maxHeight: '60px',
                      maxWidth: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  };
export default Partner;