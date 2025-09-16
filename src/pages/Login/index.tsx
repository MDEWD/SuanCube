"use client";
import { useState } from "react";
import Image from "next/image";

type Tab = "login" | "register";
type Mode = "wechat" | "other" | "reset";

const Login: React.FC = () => {
  const [mode, setMode] = useState<Mode>("wechat");
  const [tab, setTab] = useState<Tab>("login");
  // 登录表单
  const [loginType, setLoginType] = useState<"password" | "sms">("password");
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [loginCode, setLoginCode] = useState("");
  // 注册表单
  const [regPhone, setRegPhone] = useState("");
  const [regCode, setRegCode] = useState("");
  const [regPwd, setRegPwd] = useState("");
  const [regPwd2, setRegPwd2] = useState("");
  const [agree, setAgree] = useState(false);
  // 忘记密码表单
  const [resetPhone, setResetPhone] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [resetPwd, setResetPwd] = useState("");
  const [resetPwd2, setResetPwd2] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* 左侧宣传 */}
        <div className="w-1/2 bg-gradient-to-br from-blue-500 via-purple-400 to-blue-200 flex flex-col items-center justify-center p-10">
          <h1 className="text-4xl font-bold text-white mb-8">FunHPC</h1>
          <ul className="text-white text-lg space-y-4 mb-8">
            <li>· 超高算力</li>
            <li>· 简单易用</li>
            <li>· 高性价比</li>
          </ul>
          {/* <Image src="/cloud-3d.png" alt="cloud" width={300} height={300} /> */}
          <Image
  src="/cloud-3d.png"
  alt="cloud"
  width={300}
  height={300}
  style={{ mixBlendMode: "multiply" }} // 或 "screen"、"overlay" 等
/>
        </div>
        {/* 右侧登录/注册/重置密码 */}
        <div className="w-1/2 flex flex-col items-center justify-center p-10 relative">
          {/* 右上角二维码角标 */}
          <div className="absolute top-0 right-0 cursor-pointer" onClick={() => setMode("wechat")}> 
            <span className="bg-gradient-to-br from-blue-200 via-purple-200 to-white text-blue-700 px-4 py-1 rounded-bl-xl font-bold shadow">二维码</span>
          </div>
          {mode === "wechat" ? (
            <>
              <Image
                src="/avatar-demo.jpg"
                alt="avatar"
                width={80}
                height={80}
                className="rounded-full mb-4"
              />
              <div className="text-center text-lg mb-6">instter</div>
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-2 rounded font-bold text-lg mb-4 shadow"
                onClick={() => alert("微信快捷登录（请对接微信OAuth）")}
              >
                微信快捷登录
              </button>
              <div
                className="text-blue-500 cursor-pointer mb-8"
                onClick={() => setMode("other")}
              >
                使用其他头像、昵称或账号
              </div>
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-purple-500 cursor-pointer"
                onClick={() => setMode("other")}
              >
                其他方式登录
              </div>
            </>
          ) : mode === "reset" ? (
            <div className="w-full max-w-md">
              <div className="flex justify-end mb-8 text-2xl font-bold">
                <span className="text-orange-500">忘记密码</span>
              </div>
              <form className="flex flex-col gap-6">
                <input
                  type="text"
                  placeholder="请输入手机号"
                  className="border rounded px-3 py-2"
                  value={resetPhone}
                  onChange={e => setResetPhone(e.target.value)}
                />
                <div className="flex">
                  <input
                    type="text"
                    placeholder="请输入验证码"
                    className="border rounded-l px-3 py-2 flex-1"
                    value={resetCode}
                    onChange={e => setResetCode(e.target.value)}
                  />
                  <button
                    type="button"
                    className="bg-blue-100 border-l px-4 rounded-r text-blue-500"
                    onClick={() => alert('验证码已发送')}
                  >
                    获取验证码
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="请输入新密码"
                  className="border rounded px-3 py-2"
                  value={resetPwd}
                  onChange={e => setResetPwd(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="请确认新密码"
                  className="border rounded px-3 py-2"
                  value={resetPwd2}
                  onChange={e => setResetPwd2(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-400 to-orange-300 text-white py-2 rounded font-bold text-xl"
                >
                  更改密码
                </button>
                <div className="flex justify-start mt-2">
                  <span className="text-orange-400 cursor-pointer" onClick={() => setMode("other")}>返回登录</span>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-full max-w-md">
              {/* Tab 切换 */}
              <div className="flex justify-center mb-8 text-2xl font-bold">
                <div
                  className={`mr-8 cursor-pointer ${tab === "login" ? "text-blue-600 border-b-4 border-blue-400" : "text-gray-400"}`}
                  onClick={() => setTab("login")}
                >
                  登录
                </div>
                <div
                  className={`cursor-pointer ${tab === "register" ? "text-purple-600 border-b-4 border-purple-400" : "text-gray-400"}`}
                  onClick={() => setTab("register")}
                >
                  注册
                </div>
              </div>
              {tab === "login" ? (
                <form className="flex flex-col gap-6">
                  <div className="flex">
                    <span className="bg-gray-100 border border-r-0 rounded-l px-4 flex items-center text-gray-500">+86</span>
                    <input
                      type="text"
                      placeholder="请输入手机号"
                      className="border rounded-r px-3 py-2 flex-1"
                      value={loginPhone}
                      onChange={e => setLoginPhone(e.target.value)}
                    />
                  </div>
                  {loginType === "password" ? (
                    <>
                      <input
                        type="password"
                        placeholder="请输入密码"
                        className="border rounded px-3 py-2"
                        value={loginPwd}
                        onChange={e => setLoginPwd(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded font-bold text-xl shadow"
                      >
                        登录
                      </button>
                      <div className="flex justify-between text-blue-500 text-sm">
                        <span className="cursor-pointer" onClick={() => setMode("reset")}>忘记密码</span>
                        <span className="cursor-pointer" onClick={() => setLoginType("sms")}>短信验证码登录</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="请输入验证码"
                          className="border rounded-l px-3 py-2 flex-1"
                          value={loginCode}
                          onChange={e => setLoginCode(e.target.value)}
                        />
                        <button
                          type="button"
                          className="bg-blue-100 border-l px-4 rounded-r text-blue-500"
                          onClick={() => alert('验证码已发送')}
                        >
                          获取验证码
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded font-bold text-xl shadow"
                      >
                        登录
                      </button>
                      <div className="flex justify-between text-blue-500 text-sm">
                        <span className="cursor-pointer" onClick={() => setMode("reset")}>忘记密码</span>
                        <span className="cursor-pointer" onClick={() => setLoginType("password")}>密码登录</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-center mt-2">
                    <span className="text-purple-500 cursor-pointer" onClick={() => setMode("wechat")}>返回微信登录</span>
                  </div>
                </form>
              ) : (
                <form className="flex flex-col gap-6">
                  <div className="flex">
                    <span className="bg-gray-100 border border-r-0 rounded-l px-4 flex items-center text-gray-500">+86</span>
                    <input
                      type="text"
                      placeholder="请输入手机号"
                      className="border rounded-r px-3 py-2 flex-1"
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                    />
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="请输入验证码"
                      className="border rounded-l px-3 py-2 flex-1"
                      value={regCode}
                      onChange={e => setRegCode(e.target.value)}
                    />
                    <button
                      type="button"
                      className="bg-blue-100 border-l px-4 rounded-r text-blue-500"
                      onClick={() => alert('验证码已发送')}
                    >
                      获取验证码
                    </button>
                  </div>
                  <input
                    type="password"
                    placeholder="请输入密码"
                    className="border rounded px-3 py-2"
                    value={regPwd}
                    onChange={e => setRegPwd(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="请确认密码"
                    className="border rounded px-3 py-2"
                    value={regPwd2}
                    onChange={e => setRegPwd2(e.target.value)}
                  />
                  <div className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={e => setAgree(e.target.checked)}
                      className="mr-2"
                    />
                    <span>
                      我已阅读并同意
                      <a href="#" className="text-blue-500 mx-1">《FunHPC服务条款》</a>
                      和
                      <a href="#" className="text-purple-500 mx-1">《隐私协议》</a>
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded font-bold text-xl shadow"
                  >
                    注册并登录
                  </button>
                  <div className="flex justify-center mt-2">
                    <span className="text-purple-500 cursor-pointer" onClick={() => setMode("wechat")}>返回微信登录</span>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;