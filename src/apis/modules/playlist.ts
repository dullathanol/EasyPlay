import request from '@/apis';

//推荐新音乐
export const getNewsong = () => {
  return request({
    url: '/personalized/newsong',
    method: 'get',
  });
};

//推荐歌单
export const getPersonalized = (limit: number) => {
  return request({
    url: '/personalized',
    method: 'get',
    params: {
      limit,
    },
  });
};

//精品歌单
export const getHighquality = (limit: number) => {
  return request({
    url: '/top/playlist/highquality',
    method: 'get',
    params: {
      limit,
    },
  });
};

//所有榜单内容摘要
export const getToplist = () => {
  return request({
    url: '/toplist',
    method: 'get',
  });
};

//歌单分类
export const getCatlist = () => {
  return request({
    url: '/playlist/catlist',
    method: 'get',
  });
};

//网友精选碟歌单
export const getPlayList = (limit: number, cat: number) => {
  return request({
    url: '/top/playlist',
    method: 'get',
    params: {
      limit,
      cat,
    },
  });
};

//歌单详情
export const getDetail = (id: number) => {
  return request({
    url: '/playlist/detail',
    method: 'get',
    params: {
      id,
    },
  });
};

//收藏/取消收藏歌单
export const getSubscribe = (id: number, t: number) => {
  return request({
    url: '/playlist/subscribe',
    method: 'get',
    params: {
      id,
      t,
    },
  });
};

//是否可用
export const getCheck = (id: number) => {
  return request({
    url: '/check/music',
    method: 'get',
    params: {
      id,
    },
  });
};

//音乐url
export const getSongUrl = (id: number) => {
  return request({
    url: '/song/url',
    method: 'get',
    params: {
      id,
    },
  });
};
