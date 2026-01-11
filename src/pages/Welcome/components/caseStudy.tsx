'use client';
import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Tag, Space, Grid, Spin, message } from 'antd';
import {
  BankOutlined,
  RocketOutlined,
  BookOutlined,
  CodeOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { listCasesUsingGet } from '@/services/backend/caseController';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CaseStudy: React.FC = () => {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // 案例数据（默认）
  const defaultCases = [
    {
      id: 1,
      title: '某大学科研项目',
      description: '使用我们的GPU云服务进行深度学习模型训练，加速了研究进展。',
      category: '科研',
      tags: ['深度学习', 'GPU', '科研'],
      icon: <BookOutlined />,
    },
    {
      id: 2,
      title: '人工智能公司',
      description: '部署了大规模的AI推理服务，降低了运营成本。',
      category: '企业',
      tags: ['AI', '推理', '企业'],
      icon: <CodeOutlined />,
    },
    {
      id: 3,
      title: '金融科技企业',
      description: '利用GPU加速金融数据分析，提高了风险预测准确性。',
      category: '金融',
      tags: ['金融', '数据分析', 'GPU'],
      icon: <DollarOutlined />,
    },
    {
      id: 4,
      title: '游戏开发公司',
      description: '使用GPU云服务进行游戏渲染和测试，缩短了开发周期。',
      category: '游戏',
      tags: ['游戏', '渲染', 'GPU'],
      icon: <RocketOutlined />,
    },
  ];

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const response = await listCasesUsingGet();
        if (response.data && response.data.data && response.data.data.records) {
          setCases(response.data.data.records);
        } else {
          // 使用默认数据
          setCases(defaultCases);
        }
      } catch (error) {
        message.error('获取案例失败，使用默认数据');
        // 使用默认数据
        setCases(defaultCases);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  return (
    <div style={{ padding: '20px 0' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Space>
          <RocketOutlined />
          客户案例
        </Space>
      </Title>
      <Spin spinning={loading} tip="加载案例数据中...">
        <Row gutter={[16, 16]}>
          {cases.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.id}>
              <div
                style={{
                  background: '#f9f9f9',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div
                  style={{
                    fontSize: '32px',
                    marginBottom: '16px',
                    color: '#1890ff',
                  }}
                >
                  {item.icon || <BankOutlined />}
                </div>
                <Title level={4} style={{ marginBottom: '12px' }}>
                  {item.title}
                </Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
                  {item.description}
                </Text>
                <div>
                  {item.tags && item.tags.map((tag: string, index: number) => (
                    <Tag key={index} color="blue" style={{ marginRight: '8px', marginBottom: '8px' }}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
};

export default CaseStudy;