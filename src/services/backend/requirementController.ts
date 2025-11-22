// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

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
  return request<API.BaseResponsePagePostVO_>('/api/requirement/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
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
  return request<API.BaseResponseLong_>('/api/requirement/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

