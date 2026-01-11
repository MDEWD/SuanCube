# Trae 个人规则 - SuanCube 项目

## 项目概述
这是一个基于 Next.js 14 + TypeScript + Ant Design 5 的企业级应用。使用 App Router 架构，采用 Server Components 和 Client Components 混合模式开发。

## 核心技术栈
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript 5
- **UI 组件库**: Ant Design 5
- **状态管理**: React Hooks + SWR
- **HTTP 客户端**: Axios
- **构建工具**: Webpack (Next.js 内置)
- **代码规范**: ESLint + Prettier

## 开发环境配置

### 安装依赖
```bash
npm install
```

### 开发服务器
```bash
npm run dev
```
访问: http://localhost:3000

### 构建生产版本
```bash
npm run build
npm start
```

### 代码质量检查
```bash
# 综合检查 (ESLint + Prettier + TypeScript)
npm run lint

# 仅 ESLint 检查
npm run lint:js

# 自动修复 ESLint 错误
npm run lint:fix

# Prettier 格式化
npm run prettier

# TypeScript 类型检查
npm run tsc
```

## 项目结构

### 核心目录
```
├── app/                 # App Router 页面 (Next.js 13+)
│   ├── [page]/         # 路由页面
│   │   ├── page.tsx    # 页面组件
│   │   ├── layout.tsx  # 页面布局
│   │   └── components/ # 页面级组件
│   └── layout.tsx      # 全局布局
├── src/                # 源代码目录
│   ├── components/     # 共享组件
│   ├── hooks/          # 自定义 Hooks
│   ├── utils/          # 工具函数
│   ├── types/          # TypeScript 类型定义
│   ├── assets/         # 静态资源
│   └── pages/          # 传统 Pages Router 页面
├── config/             # 配置文件
└── public/             # 公共资源
```

## 开发规范

### 命名约定
- **组件**: PascalCase (如: `UserProfile.tsx`)
- **函数**: camelCase (如: `fetchUserData()`)
- **常量**: UPPER_CASE (如: `API_BASE_URL`)
- **类型/接口**: PascalCase (如: `UserType`, `LoginProps`)
- **文件**: kebab-case 或 PascalCase (推荐: 组件用 PascalCase，其他用 kebab-case)
- **自定义 Hooks**: 以 `use` 开头 (如: `useAuth()`)

### 代码风格
- 使用 2 个空格缩进
- 使用单引号 `'`
- 始终使用分号
- 尾随逗号: 所有地方都使用
- 行宽: 100 字符
- 优先使用箭头函数
- 使用解构赋值提高可读性

### 导入顺序
1. Next.js 核心模块
2. React 相关
3. Ant Design 组件
4. Ant Design Pro 组件
5. UI 图标库 (lucide-react)
6. HTTP 客户端 (axios)
7. 工具库 (lodash, classnames)
8. 时间处理 (moment)
9. 项目绝对路径 (`@/*`)
10. 相对路径 (`./*`)

### 组件开发

#### Server Components
```tsx
// app/page.tsx (默认 Server Component)
export default async function HomePage() {
  // 直接在服务端获取数据
  const data = await fetchData();
  return (
    <div>
      <h1>Home Page</h1>
      {/* 使用数据渲染 */}
    </div>
  );
}
```

#### Client Components
```tsx
// app/components/InteractiveComponent.tsx
'use client';

import { useState } from 'react';
import { Button } from 'antd';

export default function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return (
    <Button onClick={() => setCount(count + 1)}>
      Count: {count}
    </Button>
  );
}
```

#### 组件属性
- 始终定义明确的 TypeScript 接口
- 使用默认值简化可选属性
- 避免过多的 props 传递，考虑使用 Context

```tsx
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  onEdit?: () => void;
}

export default function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {onEdit && <Button onClick={onEdit}>编辑</Button>}
    </div>
  );
}
```

### 状态管理

#### 本地状态
使用 React Hooks (`useState`, `useReducer`) 管理组件内部状态

#### 远程数据
使用 SWR 进行数据获取和缓存

```tsx
'use client';

import useSWR from 'swr';
import { List } from 'antd';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function UserList() {
  const { data, error, isLoading } = useSWR('/api/users', fetcher);

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>加载失败</div>;

  return (
    <List
      dataSource={data}
      renderItem={item => (
        <List.Item key={item.id}>
          {item.name}
        </List.Item>
      )}
    />
  );
}
```

#### 全局状态
优先使用 React Context API + useContext
对于复杂状态，考虑使用 Zustand 或 Redux Toolkit

### API 调用

#### 基础配置
```typescript
// src/utils/request.ts
import axios from 'axios';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 添加认证 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => response.data,
  error => {
    // 统一错误处理
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default request;
```

#### API 调用示例
```typescript
// src/services/user.ts
import request from '@/utils/request';

export const getUserList = () => {
  return request.get('/users');
};

export const getUserDetail = (id: string) => {
  return request.get(`/users/${id}`);
};
```

### 路由与导航

#### App Router 导航
```tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'antd';

export default function NavExample() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/dashboard');
  };

  const handleReplace = () => {
    router.replace('/login');
  };

  return (
    <div>
      <Button onClick={handleNavigate}>跳转到仪表板</Button>
      <Button onClick={handleReplace}>替换到登录页</Button>
    </div>
  );
}
```

#### 动态路由
```
// app/users/[id]/page.tsx
export default function UserDetailPage({ params }: { params: { id: string } }) {
  return <h1>User ID: {params.id}</h1>;
}
```

### 样式管理

#### Ant Design 主题定制
```typescript
// config/defaultSettings.ts
export default {
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fixed',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'SuanCube',
  pwa: false,
  iconfontUrl: '',
  // ...
};
```

#### 组件样式
```tsx
'use client';

import { Button } from 'antd';
import { css } from '@ant-design/cssinjs';

export default function StyledButton() {
  const buttonStyle = css`
    background-color: #1890ff;
    &:hover {
      background-color: #40a9ff;
    }
  `;

  return <Button className={buttonStyle}>自定义样式按钮</Button>;
}
```

### 性能优化

1. **使用 Server Components** - 减少客户端 JavaScript 体积
2. **图像优化** - 使用 `next/image` 组件
3. **代码分割** - 使用动态导入 `import()`
4. **缓存策略** - 合理使用 SWR 和 Next.js 缓存
5. **减少重渲染** - 使用 `React.memo()`, `useMemo()`, `useCallback()`
6. **虚拟列表** - 使用 `rc-virtual-list` 处理大量数据

### 错误处理

#### 错误边界
```tsx
'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Result, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

interface Props {
  children: ReactNode;
}

class ErrorBoundary extends Component<Props> {
  state = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          title="系统出错了"
          subTitle="抱歉，服务器出现了错误，请稍后重试"
          extra={
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={this.handleReload}
            >
              重新加载
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

#### API 错误处理
```typescript
// src/hooks/useApiError.ts
import { message } from 'antd';

export const useApiError = () => {
  const handleError = (error: any) => {
    const errorMessage = error.response?.data?.message || error.message || '未知错误';
    message.error(errorMessage);
    return Promise.reject(error);
  };

  return { handleError };
};
```

### 测试策略

#### 单元测试
使用 `@testing-library/react` 测试组件

```typescript
// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from 'antd';

describe('Button Component', () => {
  test('should render button with text', () => {
    render(<Button>Test Button</Button>);
    const buttonElement = screen.getByText(/Test Button/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);
    
    const buttonElement = screen.getByText(/Test Button/i);
    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 部署与 CI/CD

### 环境变量配置
创建 `.env.local` 文件:
```
NEXT_PUBLIC_API_URL=http://api.example.com
NEXT_PUBLIC_APP_ENV=development
```

### GitHub Pages 部署
```bash
npm run deploy
```

### Vercel 部署
1. 连接 GitHub 仓库
2. 配置环境变量
3. 自动部署

## 代码审查规范

### 审查重点
1. **功能完整性** - 代码是否实现了预期功能
2. **代码质量** - 是否符合编码规范
3. **性能影响** - 是否存在性能问题
4. **安全性** - 是否存在安全漏洞
5. **可维护性** - 代码是否易于理解和维护
6. **测试覆盖** - 是否有足够的测试用例

### 审查流程
1. 创建特性分支: `git checkout -b feature/[feature-name]`
2. 提交代码: `git commit -m "feat: add new feature"`
3. 推送分支: `git push origin feature/[feature-name]`
4. 创建 Pull Request
5. 代码审查 (至少 1 人)
6. 解决审查意见
7. 合并到主分支

## 最佳实践

### 组件设计
- **单一职责** - 每个组件只做一件事
- **可复用性** - 设计通用组件，避免重复代码
- **可测试性** - 组件易于测试
- **文档化** - 为复杂组件添加 JSDoc 注释

### 状态管理
- **最小化状态** - 只保留必要的状态
- **状态提升** - 将共享状态提升到最近的公共祖先
- **不可变更新** - 避免直接修改状态

### 性能优化
- **懒加载** - 延迟加载非关键组件
- **预加载** - 预加载可能需要的资源
- **按需渲染** - 只渲染可见内容
- **减少请求** - 合并 API 请求，使用缓存

### 安全性
- **输入验证** - 验证所有用户输入
- **XSS 防护** - 避免直接插入 HTML
- **CSRF 防护** - 使用 CSRF 令牌
- **敏感数据** - 不存储敏感数据在客户端

## 常见问题与解决方案

### 1. TypeScript 类型错误
**问题**: 模块解析失败或类型不匹配
**解决方案**:
- 确保 `tsconfig.json` 配置正确
- 检查导入路径是否使用 `@/*` 别名
- 安装缺失的类型定义: `@types/[package-name]`

### 2. 样式不生效
**问题**: Ant Design 样式未正确加载
**解决方案**:
- 确保 `app/layout.tsx` 中导入了全局样式
- 检查 CSS-in-JS 配置
- 清除 Next.js 缓存: `rm -rf .next`

### 3. API 请求失败
**问题**: 网络请求超时或认证失败
**解决方案**:
- 检查 API 基础 URL 配置
- 验证认证令牌是否有效
- 查看浏览器控制台网络请求详情

### 4. 开发服务器异常
**问题**: 服务器启动失败或热更新不工作
**解决方案**:
- 清除依赖和缓存: `rm -rf node_modules .next && npm install`
- 检查端口是否被占用
- 升级 Node.js 版本到 16+ 或 18+

## 学习资源

### 官方文档
- Next.js: https://nextjs.org/docs
- React: https://react.dev/learn
- Ant Design: https://ant.design/docs/react/introduce
- TypeScript: https://www.typescriptlang.org/docs/

### 进阶学习
- Next.js App Router: https://nextjs.org/docs/app/building-your-application/routing
- React Hooks: https://react.dev/reference/react
- TypeScript 高级类型: https://www.typescriptlang.org/docs/handbook/2/advanced-types.html
- 性能优化: https://nextjs.org/docs/app/building-your-application/optimizing

---

以上规则旨在确保项目的一致性、可维护性和质量。请所有团队成员严格遵守。
