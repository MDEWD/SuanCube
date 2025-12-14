
import React from 'react';
import { Modal, Form, Row, Col, Select, Input, Upload, Checkbox, Button, message, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { PublishFormData } from '../index';

const { Option } = Select;
const { TextArea } = Input;

interface PublishProductModalProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: PublishFormData) => void;
}

// GPU类型选项
const gpuTypes = [
  '华为',
  '英伟达',
];


// 应用场景选项
const applicationScenesOptions = [
  { label: 'AI训练', value: 'AI训练' },
  { label: 'AI推理', value: 'AI推理' },
  { label: '图形渲染', value: '图形渲染' }
];


// 上传前的校验
const beforeUpload = (file: File) => {
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


const PublishProductModal: React.FC<PublishProductModalProps> = ({
  visible,
  onCancel,
  onFinish,
}) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="发布商品"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={800}
      centered
    >
      <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            images: [],
            applicationScenes: [],
          }}
        >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="GPU类型"
              name="gpuType"
              rules={[{ required: true, message: '请选择GPU类型' }]}
            >
              <Select placeholder="选择GPU类型">
                {gpuTypes.map(type => (
                  <Option key={type} value={type}>{type}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="GPU型号"
              name="gpuModel"
              rules={[{ required: true, message: '请输入GPU型号' }]}
            >
              <Input placeholder="例如：RTX3060-12G" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="CPU"
              name="cpu"
              rules={[{ required: true, message: '请输入CPU信息' }]}
            >
              <Input placeholder="例如：Intel Xeon E5-2673 v4" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="库存"
              name="gpuAvailable"
              rules={[{ required: true, message: '请输入库存信息' }]}
            >
              <Input placeholder="例如：12" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="内存"
              name="memory"
              rules={[{ required: true, message: '请输入内存信息' }]}
            >
              <Input placeholder="例如：64GB DDR4" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="集群存储"
              name="dataDisk"
              rules={[{ required: true, message: '请输入存储信息' }]}
            >
              <Input placeholder="例如：系统盘 20G + 数据盘 50GB NVME" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="公网带宽"
              name="bandwidth"
              rules={[{ required: true, message: '请输入带宽信息' }]}
            >
              <Input placeholder="例如：800 Mbps" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="机房位置"
              name="location"
              rules={[{ required: true, message: '请输入机房位置' }]}
            >
              <Input placeholder="例如：上海" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="系统盘"
              name="systemDisk"
              rules={[{ required: true, message: '请输入系统盘信息' }]}
            >
              <Input placeholder="例如：20G" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="高速网卡"
              name="highSpeedNetworkCard"
              rules={[{ required: true, message: '请输入高速网卡信息' }]}
            >
              <Input placeholder="例如：可配" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="机房环境图片"
          name="images"
        >
          <Upload
            listType="picture-card"
            beforeUpload={beforeUpload}
            multiple
          >
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>上传图片</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          label="推荐应用场景"
          name="applicationScenes"
          rules={[{ required: true, message: '请选择应用场景' }]}
        >
          <Checkbox.Group options={applicationScenesOptions} />
        </Form.Item>

        <Form.Item
          name="isNewDataCenter"
          valuePropName="checked"
        >
          <Checkbox>新机房</Checkbox>
        </Form.Item>

        <Form.Item
          label="机房自荐评语"
          name="dataCenterDescription"
          rules={[
            { required: true, message: '请输入机房评语' },
            { max: 50, message: '评语不能超过50个字' }
          ]}
        >
          <TextArea 
            placeholder="请输入机房评语（最多50字）" 
            rows={3}
            showCount
            maxLength={50}
          />
        </Form.Item>

        <Form.Item
          label="付费模式"
          name="payMode"
          rules={[{ required: true, message: '请选择付费模式' }]}
        >
          <Select placeholder="选择付费模式">
            <Option value="monthly">按月付费</Option>
            <Option value="quarterly">按季度付费</Option>
            <Option value="yearly">按年付费</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="目标价格"
          name="price"
          rules={[{ required: true, message: '请输入目标价格' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            step={0.01}
            placeholder="请输入价格"
            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            发布商品
          </Button>
        </Form.Item>
      </Form>
    </Modal>
);
};

export default PublishProductModal;