// @ts-ignore
/* eslint-disable */
import axiosInstance from '@/utils/axios';

/** doThumb POST /api/post_thumb/ */
export async function doThumbUsingPost(
  body: API.PostThumbAddRequest,
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponseInt_>('/api/post_thumb/', body, {
    ...(options || {}),
  });
}
