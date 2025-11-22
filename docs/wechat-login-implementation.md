# 微信公众号扫码登录前端实现说明

## 功能概述

已实现完整的微信公众号扫码登录流程，包括：
1. 自动获取并显示二维码
2. 轮询检查用户是否已扫码
3. 扫码成功后显示验证码输入框
4. 使用验证码完成登录

## 实现流程

### 1. 页面加载
- 自动调用 `GET /api/user/qr-code` 获取二维码
- 显示二维码图片
- 开始轮询检查是否已扫码

### 2. 轮询检查
- 每2秒调用一次 `GET /api/user/check-ticket?ticket=xxx`
- 检查 `scanned` 字段是否为 `true`
- 如果已扫描，获取 `openId` 并显示验证码输入框
- 5分钟后自动停止轮询（二维码过期）

### 3. 验证码登录
- 用户输入6位验证码
- 调用 `POST /api/user/login`，传递 `code` 和 `openId`
- 登录成功后保存 token 和用户信息
- 跳转到首页或指定页面

## API 接口

### 1. 获取二维码
```typescript
GET /api/user/qr-code
Response: {
  code: 0,
  data: {
    ticket: string,
    qrCodeUrl: string,
    expireSeconds: number
  }
}
```

### 2. 检查Ticket是否已扫描
```typescript
GET /api/user/check-ticket?ticket=xxx
Response: {
  code: 0,
  data: {
    scanned: "true" | "false",
    openId?: string
  }
}
```

### 3. 使用验证码登录
```typescript
POST /api/user/login
Body: {
  code: string,
  openId: string
}
Response: {
  code: 0,
  data: {
    token: string,
    user: LoginUserVO
  }
}
```

## 开发模式

为了便于开发测试，保留了测试账号功能：
- 在未扫码状态下，可以使用测试验证码快速登录
- 测试验证码：
  - 普通用户：`123456`
  - 算力同盟：`123457`
  - 管理员：`123458`

## 用户体验优化

1. **二维码显示**：
   - 加载时显示 Spin 动画
   - 扫码成功后显示"已扫描"遮罩层
   - 提供"刷新二维码"按钮

2. **状态提示**：
   - 扫码成功时显示成功提示
   - 二维码过期时显示警告
   - 验证码输入框自动聚焦

3. **错误处理**：
   - API 调用失败时显示错误提示
   - 验证码错误时显示具体错误信息

## 注意事项

1. **轮询管理**：
   - 使用 `useRef` 保存轮询 interval ID
   - 组件卸载时自动清除轮询
   - 二维码过期后自动停止轮询

2. **状态管理**：
   - `showCodeInput` 控制是否显示验证码输入框
   - `scanned` 标记是否已扫码
   - `openId` 保存扫码后的用户标识

3. **Token 存储**：
   - 登录成功后，将 token 保存到 `localStorage`
   - 后续请求需要在 Header 中携带 token

## 文件修改

1. **`src/services/backend/userController.ts`**：
   - 添加 `getQrCodeUsingGet` 方法
   - 添加 `checkTicketUsingGet` 方法
   - 添加 `userLoginByCodeUsingPost` 方法

2. **`src/pages/User/Login/index.tsx`**：
   - 实现完整的扫码登录流程
   - 保留开发模式测试账号功能
   - 优化用户体验和错误处理

