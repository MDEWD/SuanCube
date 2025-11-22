// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取GPU实例列表 POST /api/gpu-instance/list/page */
export async function listGpuInstanceByPageUsingPost(
  body: {
    current?: number;
    pageSize?: number;
    type?: string;
    region?: string;
    gpuType?: string;
    [key: string]: any;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO_>('/api/gpu-instance/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取GPU实例详情 GET /api/gpu-instance/get */
export async function getGpuInstanceByIdUsingGet(
  params: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePostVO_>('/api/gpu-instance/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

