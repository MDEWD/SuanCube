import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Tag, Space, Grid, Spin, message } from 'antd';
import {
  BankOutlined,
  RocketOutlined,
  RobotOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { listCasesUsingGet } from '@/services/backend/caseController';

const { useBreakpoint } = Grid;

const { Title, Text, Paragraph } = Typography;

// 案例数据类型
interface CaseItem {
  id: string | number;
  icon: React.ReactNode;
  category: string;
  title: string;
  brief: string;
  detail: string;
  tags: string[];
  color: string;
}

// 图标映射
const iconMap: { [key: string]: React.ReactNode } = {
  '高校': <BankOutlined style={{ fontSize: 32, color: '#1890ff' }} />,
  'AI训练': <RocketOutlined style={{ fontSize: 32, color: '#52c41a' }} />,
  'AI推理': <RobotOutlined style={{ fontSize: 32, color: '#722ed1' }} />,
};

// 颜色映射
const colorMap: { [key: string]: string } = {
  '高校服务案例': '#1890ff',
  '企业案例（AI训练）': '#52c41a',
  '企业案例（AI推理）': '#722ed1',
};

const CaseStudy: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [caseStudies, setCaseStudies] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      setLoading(true);
      const res = await listCasesUsingGet({ current: 1, pageSize: 10 });
      if (res?.data?.records) {
        const cases = res.data.records.map((item: any, index: number) => {
          const category = item.category || '企业案例';
          const color = colorMap[category] || ['#1890ff', '#52c41a', '#722ed1'][index % 3];
          return {
            id: item.id || index + 1,
            icon: iconMap[category] || <CheckCircleOutlined style={{ fontSize: 32, color }} />,
            category: category,
            title: item.title || '客户案例',
            brief: item.brief || item.summary || item.description || '',
            detail: item.detail || item.content || item.description || '',
            tags: item.tags ? (Array.isArray(item.tags) ? item.tags : item.tags.split(',')) : [],
            color: color
          };
        });
        setCaseStudies(cases.length > 0 ? cases : getDefaultCases());
      } else {
        setCaseStudies(getDefaultCases());
      }
    } catch (error) {
      console.error('加载案例失败:', error);
      setCaseStudies(getDefaultCases());
    } finally {
      setLoading(false);
    }
  };

  // 默认案例数据（当API失败时使用）
  const getDefaultCases = (): CaseItem[] => [
    {
      id: 1,
      icon: <BankOutlined style={{ fontSize: 32, color: '#1890ff' }} />,
      category: '高校服务案例',
      title: 'NUS教授团队',
      brief: '为NUS某教授团队长期提供算力支持，支撑其团队提供稳定的算力支持，助力其研究成果。',
      detail: '为NUS某教授团队长期提供算力支持，支撑其团队提供稳定的算力支持，助力其研究成果。在合作中，我们通过提供弹性、高可用的计算集群，彻底解决了该团队原有本地算力"排队时间长、难以应对计算峰值"的瓶颈，保障了其多项国家重点科研计划的顺利推进，并助力其培养多名计算领域的博士研究生。',
      tags: ['高校', '科研', '长期合作'],
      color: '#1890ff'
    },
    {
      id: 2,
      icon: <RocketOutlined style={{ fontSize: 32, color: '#52c41a' }} />,
      category: '企业案例（AI训练）',
      title: 'AI音频开发团队',
      brief: '为某AI音频前沿开发团队长期提供算力支持，通过跨数据中心容灾备份与7x24小时运维支持，确保大规模分布式训练任务连续性。',
      detail: '为某AI音频前沿开发团队长期提供算力支持，我们通过提供跨数据中心的容灾备份与7x24小时运维支持，确保了其大规模分布式训练任务的连续性与数据安全，有效降低了其IT基础设施的总体拥有成本（TCO），使其团队能更专注于核心算法创新，最终在AI音频合成赛道上脱颖而出。',
      tags: ['AI训练', '企业', '容灾备份'],
      color: '#52c41a'
    },
    {
      id: 3,
      icon: <RobotOutlined style={{ fontSize: 32, color: '#722ed1' }} />,
      category: '企业案例（AI推理）',
      title: '数字人开发团队',
      brief: '为数字人前沿开发团队长期提供算力支持，通过弹性、高性能GPU算力解决方案，保障核心产品从0到1的研发。',
      detail: '为数字人前沿开发团队长期提供算力支持，我们通过提供弹性、高性能的GPU算力解决方案，保障了其核心数字人产品在两年内顺利完成从0到1的研发，并成功支持了多次重大产品发布与版本更新，助力其在高清数字人直播、交互等商业应用场景中确立了市场领先地位。',
      tags: ['AI推理', '企业', '产品研发'],
      color: '#722ed1'
    }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px 40px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{
      padding: '80px 40px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 背景装饰 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(24, 144, 255, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(114, 46, 209, 0.03) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* 标题部分 */}
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
              客户案例分享
            </Title>
          </div>
        </div>

        {/* 案例卡片 */}
        <Row gutter={[24, 24]} justify="center">
          {caseStudies.length === 0 ? (
            <Col span={24}>
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                暂无案例数据
              </div>
            </Col>
          ) : (
            caseStudies.map((caseItem) => (
            <Col xs={24} sm={24} md={8} key={caseItem.id}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: 'none',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)'
                }}
                bodyStyle={{
                  padding: '32px',
                  position: 'relative',
                  zIndex: 1
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'translateY(-8px)';
                  card.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'translateY(0)';
                  card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
              >
                {/* 简洁版内容 */}
                <div 
                  className="brief-content"
                  style={{
                    transition: 'opacity 0.4s ease'
                  }}
                >
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '24px'
                  }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      background: `linear-gradient(135deg, ${caseItem.color}15 0%, ${caseItem.color}05 100%)`,
                      marginBottom: '16px'
                    }}>
                      {caseItem.icon}
                    </div>
                    <Tag
                      color={caseItem.color}
                      style={{
                        fontSize: '12px',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        marginBottom: '12px'
                      }}
                    >
                      {caseItem.category}
                    </Tag>
                    <Title level={4} style={{
                      marginTop: '12px',
                      marginBottom: '16px',
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#1f2329'
                    }}>
                      {caseItem.title}
                    </Title>
                  </div>
                  <Paragraph
                    style={{
                      color: '#666',
                      fontSize: '14px',
                      lineHeight: 1.8,
                      marginBottom: '20px',
                      minHeight: '80px'
                    }}
                    ellipsis={{ rows: 4, expandable: false }}
                  >
                    {caseItem.brief}
                  </Paragraph>
                  <Space wrap style={{ justifyContent: 'center', width: '100%' }}>
                    {caseItem.tags.map((tag, index) => (
                      <Tag
                        key={index}
                        style={{
                          background: `${caseItem.color}10`,
                          color: caseItem.color,
                          border: `1px solid ${caseItem.color}30`,
                          borderRadius: '12px',
                          padding: '2px 10px',
                          fontSize: '12px'
                        }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </Space>
                </div>

                {/* 详细版内容（悬浮时显示） */}
                <div
                  className="detail-content"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '32px',
                    background: `linear-gradient(135deg, ${caseItem.color}08 0%, #ffffff 100%)`,
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.4s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    zIndex: 2,
                    borderRadius: '16px'
                  }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${caseItem.color}20 0%, ${caseItem.color}10 100%)`,
                      marginBottom: '16px'
                    }}>
                      {caseItem.icon}
                    </div>
                    <Tag
                      color={caseItem.color}
                      style={{
                        fontSize: '12px',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        marginBottom: '12px'
                      }}
                    >
                      {caseItem.category}
                    </Tag>
                    <Title level={4} style={{
                      marginTop: '12px',
                      marginBottom: '16px',
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#1f2329'
                    }}>
                      {caseItem.title}
                    </Title>
                  </div>
                  <Paragraph
                    style={{
                      color: '#333',
                      fontSize: '14px',
                      lineHeight: 1.9,
                      textAlign: 'left',
                      marginBottom: '20px'
                    }}
                  >
                    {caseItem.detail}
                  </Paragraph>
                  <div style={{
                    textAlign: 'center',
                    marginTop: 'auto',
                    paddingTop: '16px'
                  }}>
                    <Space>
                      <CheckCircleOutlined style={{ color: caseItem.color }} />
                      <Text style={{ color: caseItem.color, fontSize: '12px', fontWeight: 500 }}>
                        成功案例
                      </Text>
                    </Space>
                  </div>
                </div>
              </Card>
            </Col>
            ))
          )}
        </Row>
      </div>

      {/* 样式 */}
      <style>{`
        .ant-card {
          position: relative;
        }
        .ant-card:hover .brief-content {
          opacity: 0;
        }
        .ant-card:hover .detail-content {
          opacity: 1 !important;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};

export default CaseStudy;

