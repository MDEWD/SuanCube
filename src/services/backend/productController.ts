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

/** 获取产品详情 GET /api/product/{id} */
export async function getProductByIdUsingGet(
  params: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  const { id, ...rest } = params;
  return request<API.BaseResponseProductVO_>(`/product/${id}`, {
    method: 'GET',
    params: {
      ...rest,
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
  return request<API.BaseResponsePageResultProductVO_>('/product/hot', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 发布商品 POST /api/product/publish */
export async function publishProductUsingPost(
  body: API.ProductPublishRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/product/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取产品列表 GET /api/product/list */
export async function getProductListUsingGet(
  params?: {
    type?: string;
    gpuType?: string;
    region?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    size?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageResultProductVO_>('/product/list', {
    method: 'GET',
    params: {
      page: 1,
      size: 20,
      ...params,
    },
    ...(options || {}),
  });
}

