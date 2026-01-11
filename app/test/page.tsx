import React from 'react';
import { Button, Card, Space } from 'antd';

export default function TestPage() {
  return (
    <div style={{ padding: 24 }}>
      <Card title="Ant Design 测试页面" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <h3>按钮组件</h3>
            <Space wrap>
              <Button type="primary">主要按钮</Button>
              <Button>默认按钮</Button>
              <Button type="dashed">虚线按钮</Button>
              <Button type="link">链接按钮</Button>
            </Space>
          </div>
          <div>
            <h3>卡片组件</h3>
            <Card type="inner" title="内部卡片" extra={<a href="#">更多</a>}>
              这是一个内部卡片示例，用于测试Ant Design组件在Next.js中的渲染。
            </Card>
          </div>
        </Space>
      </Card>
    </div>
  );
}
