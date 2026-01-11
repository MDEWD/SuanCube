// @ts-ignore
/* eslint-disable */
import axiosInstance from '@/utils/axios';

/** check GET /api/ */
export async function checkUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkUsingGETParams,
  options?: { [key: string]: any },
) {
  return axiosInstance.get<string>('/api/', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** receiveMessage POST /api/ */
export async function receiveMessageUsingPost(options?: { [key: string]: any }) {
  return axiosInstance.post<any>('/api/', {}, {
    ...(options || {}),
  });
}

/** setMenu GET /api/setMenu */
export async function setMenuUsingGet(options?: { [key: string]: any }) {
  return axiosInstance.get<string>('/api/setMenu', {
    ...(options || {}),
  });
}
