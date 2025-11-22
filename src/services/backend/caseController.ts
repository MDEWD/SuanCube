// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取案例列表 GET /api/case/list */
export async function listCasesUsingGet(
  params?: {
    current?: number;
    pageSize?: number;
    category?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO_>('/api/case/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取案例详情 GET /api/case/get */
export async function getCaseByIdUsingGet(
  params: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePostVO_>('/api/case/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

