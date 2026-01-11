// @ts-ignore
/* eslint-disable */
import axiosInstance from '@/utils/axios';

/** 获取案例列表 GET /api/case/list */
export async function listCasesUsingGet(
  params?: {
    current?: number;
    pageSize?: number;
    category?: string;
  },
  options?: { [key: string]: any },
) {
  return axiosInstance.get<API.BaseResponsePagePostVO_>('/api/case/list', {
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
  return axiosInstance.get<API.BaseResponsePostVO_>('/api/case/get', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

