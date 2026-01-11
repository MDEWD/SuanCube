'use client';

import { Typography, Spin, Space, Grid } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { listPartnersUsingGet } from '@/services/backend/partnerController';

const { Title } = Typography;
const { useBreakpoint } = Grid;

// 导入合作伙伴logo图片（作为默认数据）
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

// 合作伙伴数据类型
interface PartnerItem {
  id: number | string;
  name: string;
  logo: string;
  alt?: string;
}

// Logo映射表（用于根据名称匹配本地图片）
const logoMap: { [key: string]: string } = {
  '博思芯宇': bodesi,
  '中国电信': telecom,
  '电子科技大学': uestc,
  '航锦科技': hangjin,
  '北京航空航天大学': beihang,
  '联通云': unicom,
  '佳讯飞鸿': jiaxun,
  '上海大学': shanghai,
  '趣算云': qusuan,
  '南方科技大学': sustech,
  '优刻得': ucloud,
  '移动云': mobile,
  '中国科学院': cas,
  '香港大学': hku,
  '香港理工大学': polyu,
  '新加坡国立大学': nus,
  '武汉理工大学': wut,
};

// 默认合作伙伴数据
const defaultPartnersData: PartnerItem[] = [
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
    const screens = useBreakpoint();
    const [partnersData, setPartnersData] = useState<PartnerItem[]>(defaultPartnersData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      loadPartners();
    }, []);

    const loadPartners = async () => {
      try {
        setLoading(true);
        const res = await listPartnersUsingGet({ current: 1, pageSize: 50 });
        if (res?.data?.records && res.data.records.length > 0) {
          const partners = res.data.records.map((item: any) => ({
            id: item.id || item.name,
            name: item.name,
            logo: item.logo || item.logoUrl || logoMap[item.name] || '',
            alt: `${item.name} logo`
          }));
          setPartnersData(partners);
        } else {
          setPartnersData(defaultPartnersData);
        }
      } catch (error) {
        console.error('加载合作伙伴失败:', error);
        setPartnersData(defaultPartnersData);
      } finally {
        setLoading(false);
      }
    };

    // 复制数据以实现无缝循环（复制两次，确保有足够的内容滚动）
    const duplicatedPartners = [...partnersData, ...partnersData];
    // 计算单个logo的宽度（200px + 16px gap）
    const itemWidth = 216;
    const totalWidth = partnersData.length * itemWidth;

    if (loading) {
      return (
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: screens.md ? '40px 40px' : '40px 16px',
          marginBottom: '20px'
        }}>
          <div style={{ 
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <TeamOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <span style={{ fontSize: '24px', fontWeight: 600, color: '#262626' }}>合作伙伴</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 0' }}>
            <Spin size="large" />
          </div>
        </div>
      );
    }

    return (
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: screens.md ? '40px 40px' : '40px 16px',
        marginBottom: '20px'
      }}>
        {/* 合作伙伴部分 */}
        <div>
          <div style={{ 
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <TeamOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <span style={{ fontSize: '24px', fontWeight: 600, color: '#262626' }}>合作伙伴</span>
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
                    background: '#ffffff',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100px',
                    padding: '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    border: '1px solid #f0f0f0',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fafafa';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                    e.currentTarget.style.borderColor = '#d9d9d9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                    e.currentTarget.style.borderColor = '#f0f0f0';
                  }}
                >
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
          `}</style>
        </div>
      </div>
    );
  };
export default Partner;