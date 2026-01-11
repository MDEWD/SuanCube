'use client';

import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import '@/global.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, padding: 0 }}>
        <ConfigProvider locale={zhCN}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* 导航栏 */}
            <Header />
            
            {/* 内容区域 */}
            <main style={{ flex: 1 }}>
              {children}
            </main>
            
            {/* 页脚 */}
            <Footer />
          </div>
        </ConfigProvider>
      </body>
    </html>
  );
}
