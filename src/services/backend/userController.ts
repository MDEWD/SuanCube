// @ts-ignore
/* eslint-disable */
import axiosInstance from '@/utils/axios';

/** addUser POST /api/user/add */
export async function addUserUsingPost(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return axiosInstance.post<API.BaseResponseLong_>('/api/user/add', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** deleteUser POST /api/user/delete */
export async function deleteUserUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponseBoolean_>('/api/user/delete', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** getUserById GET /api/user/get */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return axiosInstance.get<API.BaseResponseUser_>('/api/user/get', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getLoginUser GET /api/user/get/login */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return axiosInstance.get<API.BaseResponseLoginUserVO_>('/api/user/get/login', {
    ...(options || {}),
  });
}

/** getUserVOById GET /api/user/get/vo */
export async function getUserVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return axiosInstance.get<API.BaseResponseUserVO_>('/api/user/get/vo', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserByPage POST /api/user/list/page */
export async function listUserByPageUsingPost(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponsePageUser_>('/api/user/list/page', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** listUserVOByPage POST /api/user/list/page/vo */
export async function listUserVoByPageUsingPost(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponsePageUserVO_>('/api/user/list/page/vo', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponseLoginUserVO_>('/api/user/login', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** userLoginByWxOpen GET /api/user/login/wx_open */
export async function userLoginByWxOpenUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userLoginByWxOpenUsingGETParams,
  options?: { [key: string]: any },
) {
  return axiosInstance.get<API.BaseResponseLoginUserVO_>('/api/user/login/wx_open', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return axiosInstance.post<API.BaseResponseBoolean_>('/api/user/logout', {}, {
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponseLong_>('/api/user/register', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** updateUser POST /api/user/update */
export async function updateUserUsingPost(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponseBoolean_>('/api/user/update', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** updateMyUser POST /api/user/update/my */
export async function updateMyUserUsingPost(
  body: API.UserUpdateMyRequest,
  options?: { [key: string]: any },
) {
  return axiosInstance.post<API.BaseResponseBoolean_>('/api/user/update/my', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 获取登录二维码 GET /api/user/qr-code */
export async function getQrCodeUsingGet(options?: { [key: string]: any }) {
  return axiosInstance.get<{
    code?: number;
    message?: string;
    data?: {
      ticket?: string;
      qrCodeUrl?: string;
      expireSeconds?: number;
    };
  }>('/api/user/qr-code', {
    ...(options || {}),
  });
}

/** 检查Ticket是否已扫描 GET /api/wechat/check-ticket */
export async function checkTicketUsingGet(
  params: {
    ticket?: string;
  },
  options?: { [key: string]: any },
) {
  return axiosInstance.get<{
    code?: number;
    message?: string;
    data?: {
      scanned?: string;
      openId?: string;
    };
  }>('/api/user/check-ticket', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 使用验证码登录 POST /api/user/login */
export async function userLoginByCodeUsingPost(
  body: {
    code?: string;
    openId?: string;
    nickname?: string;
    avatar?: string;
  },
  options?: { [key: string]: any },
) {
  return axiosInstance.post<{
    code?: number;
    message?: string;
    data?: {
      token?: string;
      user?: API.LoginUserVO;
    };
  }>('/api/user/login', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
