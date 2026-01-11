// @ts-ignore
/* eslint-disable */
import axiosInstance from '@/utils/axios';

/** doPostFavour POST /api/post_favour/ */
export async function doPostFavourUsingPost(
  body: API.PostFavourAddRequest,
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponseInt_>('/api/post_favour/', body, {
    ...(options || {}),
  });
}

/** listFavourPostByPage POST /api/post_favour/list/page */
export async function listFavourPostByPageUsingPost(
  body: API.PostFavourQueryRequest,
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponsePagePostVO_>('/api/post_favour/list/page', body, {
    ...(options || {}),
  });
}

/** listMyFavourPostByPage POST /api/post_favour/my/list/page */
export async function listMyFavourPostByPageUsingPost(
  body: API.PostQueryRequest,
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponsePagePostVO_>('/api/post_favour/my/list/page', body, {
    ...(options || {}),
  });
}
