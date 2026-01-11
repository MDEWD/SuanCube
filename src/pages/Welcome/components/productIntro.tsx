'use client';

import { Space, Typography, Button, Grid } from 'antd';
import React from 'react';
import { RocketOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ProductIntro: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  
  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      padding: isMobile ? '16px' : '24px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {/* 背景装饰 */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: '-80px',
        width: '300px',
        height: '300px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '50%',
      }} />
      
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ 
            marginBottom: '8px'
          }}>
            <Text style={{ 
              fontSize: '12px',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 500,
              letterSpacing: '1px'
            }}>
              高性能 GPU 计算容器
            </Text>
          </div>
          
          <Title level={1} style={{ 
            marginBottom: '16px',
            color: '#fff',
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: 'bold',
            lineHeight: 1.2
          }}>
            弹性计费
            <br />
            秒级部署
          </Title>

          <div style={{ 
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <Text style={{ 
              fontSize: '14px', 
              color: 'rgba(255,255,255,0.9)',
              marginRight: '8px'
            }}>
              即刻开始
            </Text>
            <Space size="small">
              <Text style={{ 
                fontSize: '14px', 
                color: '#ffd666',
                fontWeight: 600,
                padding: '4px 10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '6px'
              }}>
                AI 训练
              </Text>
              <Text style={{ 
                fontSize: '14px', 
                color: 'rgba(255,255,255,0.7)'
              }}>
                →
              </Text>
              <Text style={{ 
                fontSize: '14px', 
                color: '#b37feb',
                fontWeight: 600,
                padding: '4px 10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '6px'
              }}>
                AI 推理
              </Text>
            </Space>
          </div>

          <div style={{ 
            padding: '12px 16px', 
            backgroundColor: 'rgba(255,255,255,0.15)', 
            borderRadius: '8px',
            marginBottom: '16px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Space size="small">
              <RocketOutlined style={{ color: '#ffd666', fontSize: '14px' }} />
              <Text style={{ 
                fontSize: '12px', 
                color: '#fff',
                fontWeight: 500
              }}>
                8月份新卡预告：新增 800 张 RTX 4090D 48G
              </Text>
            </Space>
          </div>
        </div>

        <Button 
          type="primary" 
          size="large"
          style={{
            height: '40px',
            padding: '0 24px',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: '8px',
            background: 'linear-gradient(45deg, #ffd666, #ffc53d)',
            border: 'none',
            color: '#874d00',
            width: '100%'
          }}
        >
          立即体验
        </Button>
      </div>
    </div>
  );
};

export default ProductIntro;