import request from '@/apis';

//每日推荐
export const getRecommendSongs = () => {
  return request({
    url: '/recommend/songs',
    method: 'get',
  });
};

//私人FM
export const getFM = () => {
  return request({
    url: '/personal_fm',
    method: 'get',
  });
};

//FM垃圾桶
export const getTrash = (id: number) => {
  return request({
    url: '/fm_trash',
    method: 'get',
    params: {
      id,
    },
  });
};

//用户详情
export const getUserDetail = (uid: number) => {
  return request({
    url: '/user/detail',
    method: 'get',
    params: {
      uid,
    },
  });
};

//账号信息
export const getAccount = () => {
  return request({
    url: '/user/account',
    method: 'get',
  });
};

//用户歌单
export const getPlaylist = (uid: number) => {
  return request({
    url: '/user/playlist',
    method: 'get',
    params: {
      uid,
    },
  });
};

//用户播放记录
export const getRecord = (uid: number, type: number) => {
  return request({
    url: '/user/record',
    method: 'get',
    params: {
      uid,
      type,
    },
  });
};

//喜欢音乐
export const getLike = (id: number, like: string) => {
  return request({
    url: '/like',
    method: 'get',
    params: {
      id,
      like,
    },
  });
};

//喜欢音乐列表
export const getLikelist = (uid: number) => {
  return request({
    url: '/likelist',
    method: 'get',
    params: {
      uid,
    },
  });
};

//获取用户关注列表
export const getUserFollow = (id: number) => {
  return request({
    url: '/user/follows',
    method: 'get',
    params: {
      id,
    },
  });
};

//收藏/取消收藏用户
export const getFollow = (id: number, t: number) => {
  return request({
    url: '/follow',
    method: 'get',
    params: {
      id,
      t,
    },
  });
};
