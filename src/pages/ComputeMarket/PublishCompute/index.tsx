'use client';
import React, { useState } from 'react';
import { 
  Row, Col,Button, Input, Divider, Select, 
  Modal, Form, InputNumber, Upload, message, Space, Switch
} from 'antd';
import { 
  PlusOutlined,
  InboxOutlined
} from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

// 发布算力表单类型
interface ComputePublishForm {
  name: string;
  vendor: string;
  description: string;
  monthlyPrice: number;
  hourlyPrice: number;
  gpu: string;
  gpuCount: number;
  cpu: string;
  cpuCores: number;
  memory: string;
  storage: string;
  network: string;
  tags: string[];
  isAvailable: boolean;
  customVendor?: string;
}

const PublishCompute: React.FC = () => {
  const [isPublishModalVisible, setIsPublishModalVisible] = useState(false);
  const [publishForm] = Form.useForm();

  // 供应商数据
const vendors = [
  { id: 'nvidia', name: '英伟达', color: '#76b900', icon: 'N' },
  { id: 'huawei', name: '华为', color: '#ff0000', icon: 'H' },
  { id: 'alibaba', name: '阿里云', color: '#ff6a00', icon: 'A' },
  { id: 'tencent', name: '腾讯云', color: '#0052d9', icon: 'T' },
  { id: 'baidu', name: '百度智能云', color: '#2932e1', icon: 'B' },
  { id: 'aws', name: 'AWS', color: '#ff9900', icon: 'A' },
];

  // 处理发布算力
  const handlePublish = async (values: ComputePublishForm) => {
    try {
      // 生成新的算力资源ID      
      const newComputeResource = {
        // id: newId,
        name: values.name,
        vendor: values.vendor,
        description: values.description,
        monthlyPrice: values.monthlyPrice,
        hourlyPrice: values.hourlyPrice,
        gpu: values.gpu,
        gpuCount: values.gpuCount,
        cpu: values.cpu,
        cpuCores: values.cpuCores,
        memory: values.memory,
        storage: values.storage,
        network: values.network,
        rating: 4.5, // 默认评分
        orders: 0,   // 初始订单数为0
        tags: values.tags,
        isAvailable: values.isAvailable
      };

      // 添加到算力资源列表      
      message.success('算力产品发布成功！');
      setIsPublishModalVisible(false);
      publishForm.resetFields();
    } catch (error) {
      message.error('发布失败，请重试');
    }
  };

  // 上传配置
  const uploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  return (
    <>
    <Button 
    type="primary" 
    icon={<PlusOutlined />}
    onClick={() => setIsPublishModalVisible(true)}
  >
    发布算力
  </Button>

      {/* 发布算力模态框 */}
      <Modal
        title="发布算力产品"
        open={isPublishModalVisible}
        onCancel={() => {
          setIsPublishModalVisible(false);
          publishForm.resetFields();
        }}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        <Form
          form={publishForm}
          layout="vertical"
          onFinish={handlePublish}
          initialValues={{
            vendor: 'custom',
            gpuCount: 1,
            cpuCores: 8,
            monthlyPrice: 1000,
            hourlyPrice: 1.5,
            isAvailable: true,
            tags: ['GPU算力']
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="产品名称"
                rules={[{ required: true, message: '请输入产品名称' }]}
              >
                <Input placeholder="例如：NVIDIA RTX 4090 集群" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vendor"
                label="供应商"
                rules={[{ required: true, message: '请选择供应商' }]}
              >
                <Select placeholder="选择供应商">
                  {vendors.map(vendor => (
                    <Option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="产品描述"
            rules={[{ required: true, message: '请输入产品描述' }]}
          >
            <TextArea
              rows={3}
              placeholder="详细描述算力产品的特性和适用场景..."
            />
          </Form.Item>

          <Divider orientation="left">价格配置</Divider>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="monthlyPrice"
                label="月租价格 (¥)"
                rules={[{ required: true, message: '请输入月租价格' }]}
              >
                <InputNumber
                  min={0}
                  step={100}
                  style={{ width: '100%' }}
                  placeholder="例如：5000"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hourlyPrice"
                label="小时价格 (¥)"
                rules={[{ required: true, message: '请输入小时价格' }]}
              >
                <InputNumber
                  min={0}
                  step={0.1}
                  style={{ width: '100%' }}
                  placeholder="例如：7.5"
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">硬件配置</Divider>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="gpu"
                label="GPU型号"
                rules={[{ required: true, message: '请输入GPU型号' }]}
              >
                <Input placeholder="例如：NVIDIA RTX 4090" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gpuCount"
                label="GPU数量"
                rules={[{ required: true, message: '请输入GPU数量' }]}
              >
                <InputNumber
                  min={1}
                  max={32}
                  style={{ width: '100%' }}
                  placeholder="例如：4"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="cpu"
                label="CPU型号"
                rules={[{ required: true, message: '请输入CPU型号' }]}
              >
                <Input placeholder="例如：AMD EPYC 7742" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cpuCores"
                label="CPU核心数"
                rules={[{ required: true, message: '请输入CPU核心数' }]}
              >
                <InputNumber
                  min={1}
                  max={256}
                  style={{ width: '100%' }}
                  placeholder="例如：64"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="memory"
                label="内存配置"
                rules={[{ required: true, message: '请输入内存配置' }]}
              >
                <Input placeholder="例如：128GB DDR4" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="storage"
                label="存储配置"
                rules={[{ required: true, message: '请输入存储配置' }]}
              >
                <Input placeholder="例如：2TB NVMe SSD" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="network"
            label="网络配置"
            rules={[{ required: true, message: '请输入网络配置' }]}
          >
            <Input placeholder="例如：10Gb/s Ethernet" />
          </Form.Item>

          <Form.Item
            name="tags"
            label="产品标签"
            rules={[{ required: true, message: '请至少选择一个标签' }]}
          >
            <Select mode="tags" placeholder="输入标签后按回车">
              <Option value="GPU算力">GPU算力</Option>
              <Option value="AI训练">AI训练</Option>
              <Option value="推理服务">推理服务</Option>
              <Option value="图形渲染">图形渲染</Option>
              <Option value="高性能计算">高性能计算</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="isAvailable"
            label="立即上架"
            valuePropName="checked"
          >
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item
            name="images"
            label="产品图片"
          >
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
              <p className="ant-upload-hint">支持单个文件上传，可用于展示产品图片</p>
            </Dragger>
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setIsPublishModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                发布产品
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PublishCompute;