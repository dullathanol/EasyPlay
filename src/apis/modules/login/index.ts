import type { LogOut, LoginQrCheck } from './types';

import request from '@/apis';

enum API {
  LOGIN_QR_KEY = '/login/qr/key',
  LOGIN_QR_CREATE = '/login/qr/create',
  LOGIN_QR_CHECK = '/login/qr/check',
  LOGIN_STATUS = '/login/status',
  LOG_OUT = '/logout',
}

//二维码key
export const getLoginQrKey = () => {
  return request({
    url: API.LOGIN_QR_KEY,
    method: 'GET',
    params: {
      timestamp: new Date().getTime(),
    },
  });
};

//二维码图片
export const getLoginQrCreate = (key: string) => {
  return request({
    url: API.LOGIN_QR_CREATE,
    method: 'GET',
    params: {
      qrimg: true,
      key,
      timestamp: new Date().getTime(),
    },
  });
};

//扫码状态
export const getLoginQrCheck = (key: string): Promise<LoginQrCheck> => {
  return request({
    url: API.LOGIN_QR_CHECK,
    method: 'GET',
    params: {
      key,
      timestamp: new Date().getTime(),
    },
  });
};

//登录状态
export const getLoginStatus = () => {
  return request({
    url: API.LOGIN_STATUS,
    method: 'POST',
    params: {
      timestamp: new Date().getTime(),
    },
  });
};

//退出登录
export const getLogOut = (): Promise<LogOut> => {
  return request({
    url: API.LOG_OUT,
    method: 'POST',
    params: {
      timestamp: new Date().getTime(),
    },
  });
};
