// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取产品列表 POST /api/product/list/page */
export async function listProductByPageUsingPost(
  body: {
    current?: number;
    pageSize?: number;
    userId?: string;
    [key: string]: any;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO_>('/api/product/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取产品详情 GET /api/product/get */
export async function getProductByIdUsingGet(
  params: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePostVO_>('/api/product/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取热门产品 GET /api/product/hot */
export async function getHotProductsUsingGet(
  params?: {
    limit?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO_>('/api/product/hot', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

