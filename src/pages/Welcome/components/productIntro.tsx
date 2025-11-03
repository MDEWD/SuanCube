import { Space, Typography, Button } from 'antd';
import React from 'react';
import { RocketOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProductIntro: React.FC = () => {
  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      padding: '40px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
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
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ 
          marginBottom: '16px'
        }}>
          <Text style={{ 
            fontSize: '14px',
            color: 'rgba(255,255,255,0.8)',
            fontWeight: 500,
            letterSpacing: '1px'
          }}>
            高性能 GPU 计算容器
          </Text>
        </div>
        
        <Title level={1} style={{ 
          marginBottom: '24px',
          color: '#fff',
          fontSize: '32px',
          fontWeight: 'bold',
          lineHeight: 1.2
        }}>
          弹性计费
          <br />
          秒级部署
        </Title>

        <div style={{ 
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Text style={{ 
            fontSize: '16px', 
            color: 'rgba(255,255,255,0.9)',
            marginRight: '16px'
          }}>
            即刻开始
          </Text>
          <Space size="middle">
            <Text style={{ 
              fontSize: '18px', 
              color: '#ffd666',
              fontWeight: 600,
              padding: '4px 12px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '6px'
            }}>
              AI 训练
            </Text>
            <Text style={{ 
              fontSize: '16px', 
              color: 'rgba(255,255,255,0.7)'
            }}>
              →
            </Text>
            <Text style={{ 
              fontSize: '18px', 
              color: '#b37feb',
              fontWeight: 600,
              padding: '4px 12px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '6px'
            }}>
              AI 推理
            </Text>
          </Space>
        </div>

        <div style={{ 
          padding: '16px 20px', 
          backgroundColor: 'rgba(255,255,255,0.15)', 
          borderRadius: '8px',
          marginBottom: '32px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <Space>
            <RocketOutlined style={{ color: '#ffd666' }} />
            <Text style={{ 
              fontSize: '14px', 
              color: '#fff',
              fontWeight: 500
            }}>
              8月份新卡预告：新增 800 张 RTX 4090D 48G
            </Text>
          </Space>
        </div>

        <Button 
          type="primary" 
          size="large"
          style={{
            height: '48px',
            padding: '0 32px',
            fontSize: '16px',
            fontWeight: 600,
            borderRadius: '8px',
            background: 'linear-gradient(45deg, #ffd666, #ffc53d)',
            border: 'none',
            color: '#874d00'
          }}
        >
          立即体验
        </Button>
      </div>
    </div>
  );
};

export default ProductIntro;