// @ts-ignore
/* eslint-disable */
import axiosInstance from '@/utils/axios';

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
  return axiosInstance.post<API.BaseResponsePagePostVO_>('/api/product/list/page', body, {
    headers: {
      'Content-Type': 'application/json',
    },
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
  return axiosInstance.get<API.BaseResponseProductVO_>(`/api/product/${id}`, {
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
  return axiosInstance.get<API.BaseResponsePageResultProductVO_>('/api/product/hot', {
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
  return axiosInstance.post<API.BaseResponseString_>('/api/product/publish', body, {
    headers: {
      'Content-Type': 'application/json',
    },
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
  return axiosInstance.get<API.BaseResponsePageResultProductVO_>('/api/product/list', {
    params: {
      page: 1,
      size: 20,
      ...params,
    },
    ...(options || {}),
  });
}

