// @ts-ignore
/* eslint-disable */
import axiosInstance from '@/utils/axios';

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
  return axiosInstance.post<API.BaseResponsePagePostVO_>('/product/list', body, {
    ...(options || {}),
  });
}

/** 获取商品详情 GET /api/product/{id} */
export async function getGpuInstanceByIdUsingGet(
  params: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  const { id, ...rest } = params;
  return axiosInstance.get<API.BaseResponsePostVO_>(`/api/product/${id}`, {
    params: {
      ...rest,
    },
    ...(options || {}),
  });
}

