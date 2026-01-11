import axios from 'axios';
import { BACKEND_HOST_LOCAL, BACKEND_HOST_PROD } from '@/constants';

// 与后端约定的响应数据格式
interface ResponseStructure {
  code: number;
  data: any;
  message?: string;
  success?: boolean;
}

const isDev = process.env.NODE_ENV === 'development';

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: isDev ? '/api' : BACKEND_HOST_PROD,
  timeout: 10000,
  withCredentials: true,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    // 如果存在 token，添加到请求头
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    const data = response.data as ResponseStructure;
    
    // 错误码处理
    if (data.code !== 0) {
      // 未登录处理
      if (data.code === 40100) {
        if (typeof window !== 'undefined') {
          window.location.href = `/login?redirect=${window.location.href}`;
        }
        return Promise.reject(new Error('请先登录'));
      }
      return Promise.reject(new Error(data.message || '服务器错误'));
    }
    
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
