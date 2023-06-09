import request from '@/utils/request';

//收藏的 MV 列表
export function getMvSublist() {
  return request({
    url: '/mv/sublist',
    method: 'get',
    params: {
      timestamp: new Date().getTime(),
    },
  });
}

//收藏/取消收藏 MV
export function getMvSub(id, sub) {
  return request({
    url: `/mv/sub?mvid=${id}&t=${sub}`,
    method: 'get',
    params: {
      timestamp: new Date().getTime(),
    },
  });
}

//全部mv
export function getMvAll(limit, area = '', type = '', order = '') {
  return request({
    url: `/mv/all?limit=${limit}&area=${area}&type=${type}&order=${order}`,
    method: 'get',
  });
}

//最新mv
export const getFirst = () => {
  return request({
    url: '/mv/first?limit=50',
    method: 'get',
  });
};

//网易出品mv
export const getExclusive = () => {
  return request({
    url: '/mv/exclusive/rcmd?limit=50',
    method: 'get',
  });
};

//mv数据
export const getDetail = (id) => {
  return request({
    url: `/mv/detail?mvid=${id}`,
    method: 'get',
  });
};

//mv地址
export const getMvUrl = (id, r) => {
  return request({
    url: `/mv/url?id=${id}&r=${r}`,
    method: 'get',
  });
};

//相似mv
export const getSimi = (id) => {
  return request({
    url: `/simi/mv?mvid=${id}`,
    method: 'get',
  });
};
