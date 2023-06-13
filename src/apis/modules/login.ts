import request from '@/apis';

//二维码key
export const getLoginKey = () => {
  return request({
    url: '/login/qr/key',
    method: 'get',
    params: {
      timestamp: new Date().getTime(),
    },
  });
};

//二维码图片
export const getLoginCreate = (key: string) => {
  return request({
    url: '/login/qr/create',
    method: 'get',
    params: {
      qrimg: true,
      key,
      timestamp: new Date().getTime(),
    },
  });
};

//扫码状态
export const getLoginCheck = (key: string) => {
  return request({
    url: '/login/qr/check',
    method: 'get',
    params: {
      key,
      timestamp: new Date().getTime(),
    },
  });
};

//登录状态
export const getLoginStatus = () => {
  return request({
    url: '/login/status',
    method: 'post',
    params: {
      timestamp: new Date().getTime(),
    },
  });
};

//退出登录
export const getLogout = () => {
  return request({
    url: '/logout',
    method: 'post',
    params: {
      timestamp: new Date().getTime(),
    },
  });
};
