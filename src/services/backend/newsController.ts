// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取新闻列表 GET /api/news/list */
export async function listNewsUsingGet(
  params?: {
    current?: number;
    pageSize?: number;
    category?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO_>('/api/news/list', {
    method: 'GET',
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
  return request<API.BaseResponsePostVO_>('/api/news/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

