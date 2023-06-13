import request from '@/apis';

//收藏的 MV 列表
export function getMvSublist() {
  return request({
    url: '/mv/sublist',
    method: 'get',
  });
}

//收藏/取消收藏 MV
export function getMvSub(mvid: number, t: number) {
  return request({
    url: '/mv/sub',
    method: 'get',
    params: {
      mvid,
      t,
    },
  });
}

//全部mv
export function getMvAll(limit: number, area = '', type = '', order = '') {
  return request({
    url: '/mv/all',
    method: 'get',
    params: {
      limit,
      area,
      type,
      order,
    },
  });
}

//最新mv
export const getFirst = () => {
  return request({
    url: '/mv/first',
    method: 'get',
    params: {
      limit: 50,
    },
  });
};

//网易出品mv
export const getExclusive = () => {
  return request({
    url: '/mv/exclusive/rcmd',
    method: 'get',
    params: {
      limit: 50,
    },
  });
};

//mv数据
export const getDetail = (mvid: number) => {
  return request({
    url: '/mv/detail',
    method: 'get',
    params: {
      mvid,
    },
  });
};

//mv地址
export const getMvUrl = (id: number, r: number) => {
  return request({
    url: '/mv/url',
    method: 'get',
    params: {
      id,
      r,
    },
  });
};

//相似mv
export const getSimi = (mvid: number) => {
  return request({
    url: '/simi/mv',
    method: 'get',
    params: {
      mvid,
    },
  });
};
