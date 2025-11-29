import React from 'react';
import { Segmented, Space } from 'antd';
import { WechatOutlined, ThunderboltOutlined } from '@ant-design/icons';

export type LoginMode = 'wechat' | 'dev';

interface ModeSwitchProps {
  mode: LoginMode;
  onChange: (mode: LoginMode) => void;
}

const ModeSwitch: React.FC<ModeSwitchProps> = ({ mode, onChange }) => {
  return (
    <div style={{ marginBottom: '24px' }}>
      <Segmented
        value={mode}
        onChange={(value) => onChange(value as LoginMode)}
        options={[
          {
            label: (
              <Space size="small" style={{ padding: '4px 8px' }}>
                <WechatOutlined />
                <span style={{ fontWeight: mode === 'wechat' ? 'bold' : 'normal' }}>公众号模式</span>
              </Space>
            ),
            value: 'wechat',
          },
          {
            label: (
              <Space size="small" style={{ padding: '4px 8px' }}>
                <ThunderboltOutlined />
                <span style={{ fontWeight: mode === 'dev' ? 'bold' : 'normal' }}>开发者模式</span>
              </Space>
            ),
            value: 'dev',
          },
        ]}
        style={{
          width: '100%',
          background: '#f0f2f5',
          borderRadius: '12px',
          padding: '4px'
        }}
        size="large"
      />
    </div>
  );
};

export default ModeSwitch;

