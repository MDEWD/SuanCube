// @ts-ignore
/* eslint-disable */
import axiosInstance from '@/utils/axios';

/** 获取需求列表 POST /api/requirement/list/page */
export async function listRequirementByPageUsingPost(
  body: {
    current?: number;
    pageSize?: number;
    userId?: string;
    [key: string]: any;
  },
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponsePagePostVO_>('/api/requirement/list/page', body, {
    ...(options || {}),
  });
}

/** 创建需求 POST /api/requirement/add */
export async function addRequirementUsingPost(
  body: {
    title?: string;
    description?: string;
    gpuType?: string;
    gpuCount?: number;
    budget?: number;
    deadline?: string;
    [key: string]: any;
  },
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponseLong_>('/api/requirement/add', body, {
    ...(options || {}),
  });
}

