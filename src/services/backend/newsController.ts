// @ts-ignore
/* eslint-disable */
import axiosInstance from '@/utils/axios';

/** 获取新闻列表 GET /api/news/list */
export async function listNewsUsingGet(
  params?: {
    current?: number;
    pageSize?: number;
    category?: string;
  },
  options?: { [key: string]: any },
) {
  return axiosInstance.get<API.BaseResponsePagePostVO_>('/api/news/list', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取新闻详情 GET /api/news/get */
export async function getNewsByIdUsingGet(
  params: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return axiosInstance.get<API.BaseResponsePostVO_>('/api/news/get', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

