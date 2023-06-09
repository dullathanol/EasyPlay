import request from '@/utils/request';

//二维码key
export const getLoginKey = () => {
  return request({
    url: `/login/qr/key?timerstamp=${Date.now()}`,
    method: 'get',
  });
};

//二维码图片
export const getLoginCreate = (key) => {
  return request({
    url: `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`,
    method: 'get',
  });
};

//扫码状态
export const getLoginCheck = (key) => {
  return request({
    url: `/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
    method: 'get',
  });
};

//登录状态
export const getLoginStatus = () => {
  return request({
    url: `/login/status?timerstamp=${Date.now()}`,
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
