// @ts-ignore
/* eslint-disable */
import axiosInstance from '@/utils/axios';

/** 获取订单列表 POST /api/order/list/page */
export async function listOrderByPageUsingPost(
  body: {
    current?: number;
    pageSize?: number;
    userId?: string;
    type?: 'purchase' | 'sale';
    [key: string]: any;
  },
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponsePagePostVO_>('/api/order/list/page', body, {
    ...(options || {}),
  });
}

/** 获取订单详情 GET /api/order/get */
export async function getOrderByIdUsingGet(
  params: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return axiosInstance.get<API.BaseResponsePostVO_>('/api/order/get', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

