'use client';
import React, { useState } from 'react';
import {
  Steps,
  Form,
  Input,
  Button,
  Card,
  Radio,
  Upload,
  message,
  Typography,
  Divider,
  Row,
  Col,
  Space,
  Alert
} from 'antd';
import {
  UploadOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import './index.css';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { TextArea } = Input;

// 合作伙伴申请页面组件
const PartnerApply: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [partnerType, setPartnerType] = useState<'individual' | 'enterprise'>('enterprise');
  const [businessLicenseFile, setBusinessLicenseFile] = useState<UploadFile[]>([]);

  // 处理合作类型选择
  const handlePartnerTypeChange = (e: any) => {
    setPartnerType(e.target.value);
  };

  // 营业执照上传前检查
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('图片必须小于 5MB!');
    }
    return isJpgOrPng && isLt5M;
  };

  // 处理营业执照上传
  const handleUploadChange: UploadProps['onChange'] = (info) => {
    let fileList = [...info.fileList];
    
    // 只保留一个文件
    fileList = fileList.slice(-1);
    
    // 读取响应并显示错误
    fileList = fileList.map(file => {
      if (file.response) {
        // 服务器响应的文件URL
        file.url = file.response.url;
      }
      return file;
    });
    
    setBusinessLicenseFile(fileList);
  };

  // 上一步
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  // 下一步
  const next = () => {
    form.validateFields()
      .then(() => {
        setCurrentStep(currentStep + 1);
      })
      .catch((errorInfo) => {
        console.log('验证失败:', errorInfo);
      });
  };

  // 表单提交
  const onFinish = (values: any) => {
    console.log('提交数据:', values);
    // 这里应该添加API调用
    message.success('申请提交成功！我们将在5个工作日内与您联系');
    setCurrentStep(3); // 跳转到完成步骤
  };

  // 步骤内容配置
  const stepContents = [
    // 步骤1: 合作类型选择
    {
      title: '选择合作类型',
      content: (
        <div className="step-content">
          <Card className="form-card">
            <Title level={3}>合作伙伴计划</Title>
            <Paragraph>
              是指具备相应资质和能力，获得智享云授权。面向用户提供智享云产品的推广及服务，
              引导用户在智享云官网购买智享云产品和服务的合作伙伴
            </Paragraph>
            
            <Alert 
              message="提交合作申请后，智享云会于5个工作日内回访，与您洽谈合作，请您注意接听来电。" 
              type="info" 
              showIcon 
              className="info-alert"
            />
            
            <Divider />
            
            <Form form={form} layout="vertical" initialValues={{ partnerType: 'enterprise' }}>
              <Form.Item 
                name="partnerType" 
                label="请选择合作类型"
                rules={[{ required: true, message: '请选择合作类型' }]}
              >
                <Radio.Group onChange={handlePartnerTypeChange}>
                  <Space direction="vertical">
                    <Radio value="enterprise">企业</Radio>
                    <Radio value="individual">个人</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Card>
        </div>
      )
    },
    
    // 步骤2: 基本信息
    {
      title: '填写基本信息',
      content: (
        <div className="step-content">
          <Card className="form-card">
            <Title level={3}>基本信息</Title>
            
            <Form
              form={form}
              layout="vertical"
              initialValues={{}}
            >
              <Form.Item
                name="companyName"
                label="企业/学校名称"
                rules={[
                  { required: true, message: '请输入企业/学校名称' },
                  { max: 100, message: '名称不能超过100个字符' }
                ]}
                extra="工商营业执照上的企业全称，只支持中国大陆工商局或市场监督管理局登记的企业"
              >
                <Input placeholder="请输入企业/学校名称" />
              </Form.Item>
              
              <Form.Item
                name="creditCode"
                label="统一社会信用代码"
                rules={[
                  { required: true, message: '请输入统一社会信用代码' },
                  { pattern: /^[0-9A-Z]{18}$/, message: '请输入正确的18位统一社会信用代码' }
                ]}
                extra="请输入18位统一社会信用代码或营业执照注册号"
              >
                <Input placeholder="请输入统一社会信用代码" maxLength={18} />
              </Form.Item>
              
              <Form.Item
                name="businessLicense"
                label="营业执照"
                rules={[{ required: false, message: '请上传营业执照' }]}
                extra={
                  <div>
                    <Text type="secondary">
                      支持JPG、JPEG、PNG格式，图片大小不超过5MB<br />
                      营业执照中信息必须与工商信息一致<br />
                      上传图片必须为实物图片，并且需露出四个角<br />
                      上传图片如果不够清晰，会审核不通过
                    </Text>
                  </div>
                }
              >
                <Upload
                  name="businessLicense"
                  listType="picture"
                  fileList={businessLicenseFile}
                  beforeUpload={beforeUpload}
                  onChange={handleUploadChange}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>上传营业执照</Button>
                </Upload>
                
                <div className="license-example">
                  <Text type="secondary">示意图：</Text>
                  <div className="example-image">
                    <div className="example-placeholder">
                      <InfoCircleOutlined />
                      <div>营业执照示例</div>
                    </div>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </div>
      )
    },
    
    // 步骤3: 合作信息
    {
      title: '填写合作信息',
      content: (
        <div className="step-content">
          <Card className="form-card">
            <Title level={3}>合作信息</Title>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="position"
                label="您的职务"
                rules={[{ required: true, message: '请选择您的职务' }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="company_leader">公司负责人</Radio>
                    <Radio value="business_leader">业务负责人</Radio>
                    <Radio value="tech_leader">技术负责人</Radio>
                    <Radio value="other">其他</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item
                name="mainBusiness"
                label="您公司主营业务"
                rules={[{ required: true, message: '请输入公司主营业务' }]}
              >
                <TextArea 
                  rows={3} 
                  placeholder="请输入公司主营业务" 
                  maxLength={500}
                  showCount
                />
              </Form.Item>
              
              <Form.Item
                name="cooperationIdea"
                label="您公司与智享云合作想法"
                rules={[{ required: true, message: '请选择合作想法' }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="existing_business">已有主营业务</Radio>
                    <Radio value="new_business">非主营业务，作为新拓展业务</Radio>
                    <Radio value="uncertain">目前尚不确定，需了解后决定</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item
                name="channel"
                label="您是通过何种渠道了解并来申请智享云合作伙伴的？"
                rules={[{ required: true, message: '请选择了解渠道' }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="partner_recommend">其他智享云合作伙伴推荐</Radio>
                    <Radio value="search_engine">百度、谷歌等搜索引擎</Radio>
                    <Radio value="official_website">智享云官网</Radio>
                    <Radio value="other">其他</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item
                name="contactName"
                label="联系人姓名"
                rules={[
                  { required: true, message: '请输入联系人姓名' },
                  { max: 50, message: '姓名不能超过50个字符' }
                ]}
              >
                <Input placeholder="请输入联系人姓名" />
              </Form.Item>
              
              <Form.Item
                name="contactPhone"
                label="联系方式"
                rules={[
                  { required: true, message: '请输入联系方式' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
                ]}
              >
                <Input placeholder="请输入手机号码" maxLength={11} />
              </Form.Item>
            </Form>
          </Card>
        </div>
      )
    },
    
    // 步骤4: 完成
    {
      title: '完成',
      content: (
        <div className="step-content">
          <Card className="form-card success-card">
            <div className="success-icon">
              <CheckCircleOutlined />
            </div>
            <Title level={3}>申请提交成功！</Title>
            <Paragraph>
              我们已收到您的合作伙伴计划申请，智享云会于5个工作日内回访，
              与您洽谈合作，请您注意接听来电。
            </Paragraph>
            <Button 
              type="primary" 
              onClick={() => window.location.href = '/'}
            >
              返回首页
            </Button>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="partner-apply-page">
      <div className="page-header">
        <div className="container">
          <Title level={1}>合作伙伴计划申请</Title>
          <Text type="secondary">加入我们的合作伙伴计划，共同成长</Text>
        </div>
      </div>
      
      <div className="container">
        <Steps current={currentStep} className="apply-steps">
          <Step title="选择类型" />
          <Step title="基本信息" />
          <Step title="合作信息" />
          <Step title="完成" />
        </Steps>
        
        <div className="steps-content">
          {stepContents[currentStep].content}
        </div>
        
        <div className="steps-action">
          {currentStep > 0 && currentStep < 3 && (
            <Button 
              onClick={prev} 
              icon={<ArrowLeftOutlined />}
              className="prev-btn"
            >
              上一步
            </Button>
          )}
          
          {currentStep < 2 && (
            <Button 
              type="primary" 
              onClick={next}
              className="next-btn"
            >
              下一步
            </Button>
          )}
          
          {currentStep === 2 && (
            <Button 
              type="primary" 
              onClick={() => form.submit()}
              className="submit-btn"
            >
              提交申请
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerApply;