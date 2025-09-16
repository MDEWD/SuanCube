import React, { useState } from "react";
import { history } from "@umijs/max";
import { Button, Form, Input, Tabs, message, Row, Col, Typography, Space } from "antd";
import { userLoginUsingPost, userRegisterUsingPost } from "@/services/backend/userController";

const { Title, Link: AntLink } = Typography;

type Tab = "login" | "register";

type LoginFormValues = {
  phone?: string;
  password?: string;
  code?: string;
};

type RegisterFormValues = {
  phone?: string;
  code?: string;
  password?: string;
  checkPassword?: string;
};

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #eef4ff 0%, #efe8ff 50%, #ffffff 100%)",
};

const wrapperStyle: React.CSSProperties = {
  width: 1100,
  maxWidth: "96%",
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
  overflow: "hidden",
};

const leftPanelStyle: React.CSSProperties = {
  height: 640,
  background: "linear-gradient(135deg,#6fa1ff,#b08bff)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const rightPanelStyle: React.CSSProperties = {
  height: 640,
  padding: "48px 56px",
  position: "relative",
  background: "#fff",
};

const ribbonStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  right: 0,
  background: "#f0f5ff",
  color: "#2f54eb",
  padding: "6px 16px",
  borderBottomLeftRadius: 12,
  fontWeight: 600,
  boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
};

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("login");
  const [loginType, setLoginType] = useState<"password" | "sms">("password");

  const redirectAfterLogin = () => {
    const urlParams = new URL(window.location.href).searchParams;
    const redirect = urlParams.get("redirect");
    history.push(redirect || "/");
  };

  const onFinishLogin = async (values: LoginFormValues) => {
    const { phone, password, code } = values;
    if (!phone) {
      message.warning("请输入手机号");
      return;
    }
    try {
      if (loginType === "password") {
        if (!password) {
          message.warning("请输入密码");
          return;
        }
        await userLoginUsingPost({ userAccount: phone, userPassword: password });
      } else {
        if (!code) {
          message.warning("请输入验证码");
          return;
        }
        // 短信登录：示例中复用密码字段
        await userLoginUsingPost({ userAccount: phone, userPassword: code });
      }
      message.success("登录成功");
      redirectAfterLogin();
    } catch (e: any) {
      message.error(`登录失败：${e?.message ?? "请稍后重试"}`);
    }
  };

  const onFinishRegister = async (values: RegisterFormValues) => {
    const { phone, password, checkPassword } = values;
    if (!phone) {
      message.warning("请输入手机号");
      return;
    }
    if (!password || !checkPassword) {
      message.warning("请输入密码并确认");
      return;
    }
    if (password !== checkPassword) {
      message.warning("两次输入的密码不一致");
      return;
    }
    try {
      await userRegisterUsingPost({
        userAccount: phone,
        userPassword: password,
        checkPassword,
      });
      message.success("注册成功，请登录");
      setActiveTab("login");
    } catch (e: any) {
      message.error(`注册失败：${e?.message ?? "请稍后重试"}`);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <Row gutter={0}>
          <Col xs={24} md={12} style={leftPanelStyle}>
            <Title level={1} style={{ color: "#fff", marginBottom: 24 }}>FunHPC</Title>
            <Space direction="vertical" size={16} style={{ color: "#fff", fontSize: 18 }}>
              <span>· 超高算力</span>
              <span>· 简单易用</span>
              <span>· 高性价比</span>
            </Space>
            <div style={{ marginTop: 32 }}>
              <img src="/cloud-3d.png" alt="cloud" width={320} height={320} style={{ filter: "saturate(1.2)" }} />
            </div>
          </Col>
          <Col xs={24} md={12} style={rightPanelStyle}>
            <div style={ribbonStyle}>二维码</div>
            <div style={{ maxWidth: 520, margin: "0 auto" }}>
              <Tabs
                activeKey={activeTab}
                onChange={(k) => setActiveTab(k as Tab)}
                items={[
                  { key: "login", label: <span style={{ fontSize: 22, fontWeight: 700, color: "#2f54eb" }}>登录</span> },
                  { key: "register", label: <span style={{ fontSize: 22, fontWeight: 700, color: "#8e73ff" }}>注册</span> },
                ]}
              />

              {activeTab === "login" ? (
                <Form layout="vertical" onFinish={onFinishLogin} requiredMark={false}>
                  <Form.Item name="phone" rules={[{ required: true, message: "请输入手机号" }]}>
                    <Input addonBefore="+86" placeholder="请输入手机号" size="large" />
                  </Form.Item>

                  {loginType === "password" ? (
                    <>
                      <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
                        <Input.Password placeholder="请输入密码" size="large" />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block style={{ background: "linear-gradient(90deg,#5b8cfe,#b08bff)", border: 0 }}>登录</Button>
                      </Form.Item>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#2f54eb" }}>
                        <AntLink onClick={() => message.info("请接入找回密码接口")}>忘记密码</AntLink>
                        <AntLink onClick={() => setLoginType("sms")}>短信验证码登录</AntLink>
                      </div>
                    </>
                  ) : (
                    <>
                      <Form.Item name="code" rules={[{ required: true, message: "请输入验证码" }]}>
                        <Input placeholder="请输入验证码" size="large" suffix={<AntLink onClick={() => message.success("验证码已发送")}>获取验证码</AntLink>} />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block style={{ background: "linear-gradient(90deg,#5b8cfe,#b08bff)", border: 0 }}>登录</Button>
                      </Form.Item>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#2f54eb" }}>
                        <AntLink onClick={() => message.info("请接入找回密码接口")}>忘记密码</AntLink>
                        <AntLink onClick={() => setLoginType("password")}>密码登录</AntLink>
                      </div>
                    </>
                  )}

                  <div style={{ textAlign: "center", marginTop: 12 }}>
                    <AntLink style={{ color: "#9254de" }} onClick={() => message.info("可扩展为微信登录页")}>返回微信登录</AntLink>
                  </div>
                </Form>
              ) : (
                <Form layout="vertical" onFinish={onFinishRegister} requiredMark={false}>
                  <Form.Item name="phone" rules={[{ required: true, message: "请输入手机号" }]}>
                    <Input addonBefore="+86" placeholder="请输入手机号" size="large" />
                  </Form.Item>

                  <Form.Item name="code" rules={[{ required: false }]}>
                    <Input placeholder="请输入验证码" size="large" suffix={<AntLink onClick={() => message.success("验证码已发送")}>获取验证码</AntLink>} />
                  </Form.Item>

                  <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
                    <Input.Password placeholder="请输入密码" size="large" />
                  </Form.Item>

                  <Form.Item name="checkPassword" rules={[{ required: true, message: "请确认密码" }]}>
                    <Input.Password placeholder="请确认密码" size="large" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block style={{ background: "linear-gradient(90deg,#5b8cfe,#b08bff)", border: 0 }}>注册并登录</Button>
                  </Form.Item>

                  <div style={{ textAlign: "center", marginTop: 12 }}>
                    <AntLink style={{ color: "#9254de" }} onClick={() => message.info("可扩展为微信登录页")}>返回微信登录</AntLink>
                  </div>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;