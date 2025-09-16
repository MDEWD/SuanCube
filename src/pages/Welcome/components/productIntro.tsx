import { Space, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;



// 右侧产品介绍组件 - 精确控制高度
const ProductIntro: React.FC = () => {
    return (
      <div style={{ 
        width: '100%',
        height: '100%',
        padding: '30px', // 减少内边距避免高度增加
        background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%)',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        {/* 背景装饰 */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '200px',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
          borderRadius: '50%',
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', margin: 0 }}>
          <Title level={4} style={{ 
            marginBottom: '12px', 
            color: '#333',
            fontSize: '18px',
            fontWeight: 500,
            marginTop: 0 // 移除默认 marginTop
          }}>
            高性能 GPU 计算容器
          </Title>
          
          <div style={{ 
            marginBottom: '20px', // 减少底部间距
          }}>
            <Text style={{ 
              fontSize: '32px', 
              color: '#333',
              fontWeight: 'bold',
              lineHeight: 1.3
            }}>
              弹性计费，<br />秒级部署
            </Text>
          </div>
  
          <div style={{ marginBottom: '10px' }}>
            <Text style={{ fontSize: '16px', color: '#666' }}>即刻开始</Text>
            <Space style={{ marginLeft: '16px' }}>
              <Text style={{ 
                fontSize: '18px', 
                color: '#0066FF',
                fontWeight: 500
              }}>
                AI 训练
              </Text>
              <Text style={{ fontSize: '16px', color: '#999' }}>&lt; &gt;</Text>
              <Text style={{ 
                fontSize: '18px', 
                color: '#E91E63',
                fontWeight: 500
              }}>
                AI 推理
              </Text>
            </Space>
          </div>
  
          <div style={{ 
            padding: '12px 16px', 
            backgroundColor: 'rgba(255,255,255,0.5)', 
            borderRadius: '4px',
            marginBottom: '30px', // 减少底部间距
            display: 'inline-block'
          }}>
            <Text style={{ fontSize: '14px', color: '#333' }}>
              8月份新卡预告：新增 800 张 RTX 4090D 48G
            </Text>
          </div>
        </div>
      </div>
    );
  };

export default ProductIntro;