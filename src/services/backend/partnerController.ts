// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取合作伙伴列表 GET /api/partner/list */
export async function listPartnersUsingGet(
  params?: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO_>('/api/partner/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

