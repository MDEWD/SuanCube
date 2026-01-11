// @ts-ignore
/* eslint-disable */
import axiosInstance from '@/utils/axios';

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
  return axiosInstance.post<API.BaseResponsePagePostVO_>('/api/favourite/list/page', body, {
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
  return axiosInstance.post<API.BaseResponseLong_>('/api/favourite/add', body, {
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
  return axiosInstance.post<API.BaseResponseBoolean_>('/api/favourite/remove', body, {
    ...(options || {}),
  });
}

