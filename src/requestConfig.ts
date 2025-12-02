import { BACKEND_HOST_LOCAL, BACKEND_HOST_PROD } from '@/constants';
import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
}

const isDev = process.env.NODE_ENV === 'development';

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  // 开发环境使用相对路径，通过代理转发；生产环境使用完整URL
  baseURL: isDev ? '/api' : BACKEND_HOST_PROD,
  withCredentials: true,

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 从 localStorage 获取 token
      const token = localStorage.getItem('token');
      
      // 如果存在 token，添加到请求头
      if (token && config.headers) {
        // 根据后端要求，可能需要使用 'Authorization' 或 'token' 等字段
        // 这里使用常见的 'Authorization: Bearer <token>' 格式
        // 如果后端需要其他格式，可以修改这里
        config.headers['Authorization'] = `Bearer ${token}`;
        // 或者如果后端直接接受 token 字段：
        // config.headers['token'] = token;
      }
      
      return config;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 请求地址
      const requestPath: string = response.config.url ?? '';

      // 如果请求配置了 skipErrorHandler，直接返回响应
      if ((response.config as any).skipErrorHandler) {
        return response;
      }

      // 响应
      const { data } = response as unknown as ResponseStructure;
      if (!data) {
        throw new Error('服务异常');
      }

      // 错误码处理
      const code: number = data.code;
      // 未登录，且不为获取用户登录信息接口
      if (
        code === 40100 &&
        !requestPath.includes('user/get/login') &&
        !location.pathname.includes('/user/login')
      ) {
        // 跳转至登录页
        window.location.href = `/user/login?redirect=${window.location.href}`;
        throw new Error('请先登录');
      }

      if (code !== 0) {
        throw new Error(data.message ?? '服务器错误');
      }
      return response;
    },
  ],
};
