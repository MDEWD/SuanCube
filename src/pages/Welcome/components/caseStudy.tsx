import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Tag, Space, Grid, Spin, message } from 'antd';
import {
  BankOutlined,
  RocketOutlined,
  RobotOutlined,
  CheckCircleOutlined,
  FileTextOutlined
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
  const [hoveredCardId, setHoveredCardId] = useState<string | number | null>(null);

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
          <FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <Title level={2} style={{ 
            margin: 0,
            fontSize: '24px',
            fontWeight: 600,
            color: '#262626'
          }}>
            案例分享
          </Title>
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
      {/* 案例分享部分 */}
      <div>
        <div style={{ 
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <Title level={2} style={{ 
            margin: 0,
            fontSize: '24px',
            fontWeight: 600,
            color: '#262626'
          }}>
            案例分享
          </Title>
        </div>

        <Row gutter={[24, 24]}>
          {caseStudies.length === 0 ? (
            <Col span={24}>
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                暂无案例数据
              </div>
            </Col>
          ) : (
            <>
              {caseStudies.map((caseItem) => {
                const isHovered = hoveredCardId === caseItem.id;
                return (
                  <Col xs={24} sm={24} md={8} key={caseItem.id}>
                  <div
                    style={{
                      minHeight: '400px',
                      height: 'auto',
                      borderRadius: '12px',
                      background: '#ffffff',
                      boxShadow: isHovered ? '0 4px 16px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
                      border: '1px solid #f0f0f0',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'visible',
                      transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                      zIndex: isHovered ? 10 : 1,
                      padding: '24px',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={() => {
                      setHoveredCardId(caseItem.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredCardId(null);
                    }}
                  >
                    {/* 简洁版内容 */}
                    <div 
                      className="brief-content"
                      style={{
                        transition: 'opacity 0.4s ease',
                        opacity: isHovered ? 0 : 1,
                        pointerEvents: isHovered ? 'none' : 'auto'
                      }}
                    >
                      <div style={{
                        textAlign: 'center',
                        marginBottom: '20px'
                      }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '56px',
                          height: '56px',
                          borderRadius: '12px',
                          background: `${caseItem.color}10`,
                          marginBottom: '12px'
                        }}>
                          {caseItem.icon}
                        </div>
                        <Tag
                          color={caseItem.color}
                          style={{
                            fontSize: '12px',
                            padding: '2px 8px',
                            marginBottom: '8px'
                          }}
                        >
                          {caseItem.category}
                        </Tag>
                        <Title level={4} style={{
                          marginTop: '8px',
                          marginBottom: '12px',
                          fontSize: '18px',
                          fontWeight: 600
                        }}>
                          {caseItem.title}
                        </Title>
                      </div>
                      <Paragraph
                        style={{
                          color: '#666',
                          fontSize: '14px',
                          lineHeight: 1.6,
                          marginBottom: '16px',
                          minHeight: '72px'
                        }}
                        ellipsis={{ rows: 3, expandable: false }}
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
                              border: `1px solid ${caseItem.color}20`,
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
                        padding: '24px',
                        paddingBottom: '60px',
                        background: `linear-gradient(135deg, ${caseItem.color}05 0%, #ffffff 100%)`,
                        opacity: isHovered ? 1 : 0,
                        pointerEvents: isHovered ? 'auto' : 'none',
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        zIndex: 2,
                        borderRadius: '12px',
                        overflow: 'hidden'
                      }}
                    >
                      <div>
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: `${caseItem.color}15`,
                            marginBottom: '12px'
                          }}>
                            {caseItem.icon}
                          </div>
                          <Tag
                            color={caseItem.color}
                            style={{
                              fontSize: '12px',
                              padding: '2px 8px',
                              marginBottom: '8px'
                            }}
                          >
                            {caseItem.category}
                          </Tag>
                          <Title level={4} style={{
                            marginTop: '8px',
                            marginBottom: '12px',
                            fontSize: '18px',
                            fontWeight: 600
                          }}>
                            {caseItem.title}
                          </Title>
                        </div>
                        <Paragraph
                          style={{
                            color: '#333',
                            fontSize: '14px',
                            lineHeight: 1.7,
                            textAlign: 'left',
                            marginBottom: '0'
                          }}
                        >
                          {caseItem.detail}
                        </Paragraph>
                      </div>
                      <div style={{
                        textAlign: 'center',
                        paddingTop: '12px',
                        flexShrink: 0
                      }}>
                        <Space>
                          <CheckCircleOutlined style={{ color: caseItem.color }} />
                          <Text style={{ color: caseItem.color, fontSize: '12px', fontWeight: 500 }}>
                            成功案例
                          </Text>
                        </Space>
                      </div>
                    </div>
                  </div>
                  </Col>
                );
              })}
            </>
          )}
        </Row>
      </div>
    </div>
  );
};

export default CaseStudy;

