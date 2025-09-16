import { useModel } from '@umijs/max';
import React from 'react';
import Partner from './components/partner';
import ProductDisplay from './components/productDisplay';
import ProductIntro from './components/productIntro';
import NewsCarousel from './components/newsCarousel';


const Welcome: React.FC = () => {
  // 统一设置精确高度
  const contentHeight = '100%';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      <div style={{
        display: 'flex',
        gap: '24px',
        padding: '30px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        {/* 左侧轮播图区域 - 固定高度 */}
        <div style={{ 
          flex: 1, 
          borderRadius: '8px',
          overflow: 'hidden',
          height: contentHeight,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)' // 保持相同阴影效果
        }}>
          <NewsCarousel />
        </div>
        
        {/* 右侧产品介绍区域 - 相同固定高度 */}
        <div style={{ 
          flex: 1, 
          borderRadius: '8px',
          overflow: 'hidden',
          height: contentHeight,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)' // 保持相同阴影效果
        }}>
          <ProductIntro />
        </div>
      </div>

      <div style={{ 
        flex: 1, 
        borderRadius: '8px',
        overflow: 'hidden',
        height: contentHeight,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <ProductDisplay />
      </div>

      <Partner />
    </div>
  );
};

export default Welcome;

