// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取收藏列表 POST /api/favourite/list/page */
export async function listFavouriteByPageUsingPost(
  body: {
    current?: number;
    pageSize?: number;
    userId?: string;
    [key: string]: any;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostVO_>('/api/favourite/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加收藏 POST /api/favourite/add */
export async function addFavouriteUsingPost(
  body: {
    productId?: string;
    [key: string]: any;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/favourite/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消收藏 POST /api/favourite/remove */
export async function removeFavouriteUsingPost(
  body: {
    productId?: string;
    [key: string]: any;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/favourite/remove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

