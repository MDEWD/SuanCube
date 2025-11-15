import { Typography } from 'antd';
import React from 'react';
const { Title } = Typography;

// 导入合作伙伴logo图片
import bodesi from '@/assets/博思芯宇.png';
import telecom from '@/assets/电信.png';
import uestc from '@/assets/电子科技大学.png';
import hangjin from '@/assets/航锦科技.png';
import beihang from '@/assets/北京航空航天大学.png';
import unicom from '@/assets/联通云.png';
import jiaxun from '@/assets/佳讯飞鸿.png';
import shanghai from '@/assets/上海大学.png';
import qusuan from '@/assets/趣算云.png';
import sustech from '@/assets/南方科技大学.png';
import ucloud from '@/assets/优刻得.png';
import mobile from '@/assets/移动云.png';
import cas from '@/assets/中国科学院.png';
import hku from '@/assets/香港大学.png';
import polyu from '@/assets/香港理工大学.png';
import nus from '@/assets/新加坡国立大学.png';
import wut from '@/assets/武汉理工大学.png';

// 合作伙伴数据
const partnersData = [
    { id: 1, name: '博思芯宇', logo: bodesi, alt: '博思芯宇 logo' },
    { id: 2, name: '中国电信', logo: telecom, alt: '中国电信 logo' },
    { id: 3, name: '电子科技大学', logo: uestc, alt: '电子科技大学 logo' },
    { id: 4, name: '航锦科技', logo: hangjin, alt: '航锦科技 logo' },
    { id: 5, name: '北京航空航天大学', logo: beihang, alt: '北京航空航天大学 logo' },
    { id: 6, name: '联通云', logo: unicom, alt: '联通云 logo' },
    { id: 7, name: '佳讯飞鸿', logo: jiaxun, alt: '佳讯飞鸿 logo' },
    { id: 8, name: '上海大学', logo: shanghai, alt: '上海大学 logo' },
    { id: 9, name: '趣算云', logo: qusuan, alt: '趣算云 logo' },
    { id: 10, name: '南方科技大学', logo: sustech, alt: '南方科技大学 logo' },
    { id: 11, name: '优刻得', logo: ucloud, alt: '优刻得 logo' },
    { id: 12, name: '移动云', logo: mobile, alt: '移动云 logo' },
    { id: 13, name: '中国科学院', logo: cas, alt: '中国科学院 logo' },
    { id: 14, name: '香港大学', logo: hku, alt: '香港大学 logo' },
    { id: 15, name: '香港理工大学', logo: polyu, alt: '香港理工大学 logo' },
    { id: 16, name: '新加坡国立大学', logo: nus, alt: '新加坡国立大学 logo' },
    { id: 17, name: '武汉理工大学', logo: wut, alt: '武汉理工大学 logo' },
];

// 合作伙伴展示组件
const Partner: React.FC = () => {
    // 复制数据以实现无缝循环（复制两次，确保有足够的内容滚动）
    const duplicatedPartners = [...partnersData, ...partnersData];
    // 计算单个logo的宽度（200px + 16px gap）
    const itemWidth = 216;
    const totalWidth = partnersData.length * itemWidth;

    return (
      <div style={{
        padding: '80px 40px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 50%, #f5f7fa 100%)',
        marginTop: '40px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* 背景装饰 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(24, 144, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(114, 46, 209, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          {/* 标题部分 - 优化样式 */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '16px 40px',
              borderRadius: '50px',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* 标题背景光效 */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                animation: 'shine 3s ease-in-out infinite'
              }} />
              <Title level={2} style={{
                color: '#ffffff',
                marginBottom: '0',
                fontSize: '32px',
                fontWeight: 700,
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                letterSpacing: '2px',
                position: 'relative',
                zIndex: 1
              }}>
                合作伙伴，荣耀之星
              </Title>
            </div>
          </div>
          
          {/* 滑动容器 */}
          <div 
            style={{
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
            onMouseEnter={(e) => {
              const scrollDiv = e.currentTarget.querySelector('[data-scroll]') as HTMLElement;
              if (scrollDiv) {
                scrollDiv.style.animationPlayState = 'paused';
              }
            }}
            onMouseLeave={(e) => {
              const scrollDiv = e.currentTarget.querySelector('[data-scroll]') as HTMLElement;
              if (scrollDiv) {
                scrollDiv.style.animationPlayState = 'running';
              }
            }}
          >
            <div
              data-scroll
              style={{
                display: 'flex',
                gap: '16px',
                width: 'fit-content',
                animation: `scroll ${30}s linear infinite`
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  style={{
                    flexShrink: 0,
                    width: '200px',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100px',
                    padding: '20px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)';
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(102, 126, 234, 0.15), 0 4px 8px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
                  }}
                >
                  {/* 容器内部光效 */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    transition: 'left 0.5s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.left = '100%';
                  }}
                  />
                  <img
                    src={partner.logo}
                    alt={partner.alt || partner.name}
                    style={{
                      maxHeight: '60px',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      width: 'auto',
                      height: 'auto',
                      position: 'relative',
                      zIndex: 1
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CSS 动画样式 */}
          <style>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-${totalWidth}px);
              }
            }
            @keyframes shine {
              0%, 100% {
                transform: translate(-50%, -50%) rotate(0deg);
              }
              50% {
                transform: translate(-50%, -50%) rotate(180deg);
              }
            }
          `}</style>
        </div>
      </div>
    );
  };
export default Partner;