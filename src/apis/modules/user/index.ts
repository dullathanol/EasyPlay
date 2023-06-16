import type { UserList, UserRecord, UserAccount, UserFollowList, UserLikeList } from './types';

import request from '@/apis';

enum API {
  USER_ACCOUNT = '/user/account',
  USER_DETAIL = '/user/detail',
  USER_LIST = '/user/playlist',
  USER_RECORD = '/user/record',
  USER_LIKE_LIST = '/likelist',
  USER_FOLLOW_LIST = '/user/follows',
  ARTIST_SUB_LIST = '/artist/sublist',
  ALBUM_SUB_LIST = '/album/sublist',
  MV_SUB_LIST = '/mv/sublist',
  LIKE_SUB = '/like',
  SUBSCRIBE_SUB = '/playlist/subscribe',
  FOLLOW_SUB = '/follow',
  ARTIST_SUB = '/artist/sub',
  ALBUM_SUB = '/album/sub',
  MV_SUB = '/mv/sub',
}

//账号信息
export const getUserAccount = (): Promise<UserAccount> => {
  return request({
    url: API.USER_ACCOUNT,
    method: 'GET',
  });
};

//用户详情
export const getUserDetail = (uid: number) => {
  return request({
    url: API.USER_DETAIL,
    method: 'GET',
    params: {
      uid,
    },
  });
};

//用户歌单
export const getUserList = (uid: number): Promise<UserList> => {
  return request({
    url: API.USER_LIST,
    method: 'GET',
    params: {
      uid,
    },
  });
};

//用户播放记录
export const getUserRecord = (uid: number, type: number): Promise<UserRecord> => {
  return request({
    url: API.USER_RECORD,
    method: 'GET',
    params: {
      uid,
      type,
    },
  });
};

//喜欢的音乐列表
export const getUserLikeList = (uid: number): Promise<UserLikeList> => {
  return request({
    url: API.USER_LIKE_LIST,
    method: 'GET',
    params: {
      uid,
    },
  });
};

//用户的关注列表
export const getUserFollowList = (id: number): Promise<UserFollowList> => {
  return request({
    url: API.USER_FOLLOW_LIST,
    method: 'GET',
    params: {
      id,
    },
  });
};

//收藏的歌手列表
export const getArtistSubList = () => {
  return request({
    url: API.ARTIST_SUB_LIST,
    method: 'GET',
  });
};

//收藏的专辑列表
export const getAlbumSubList = () => {
  return request({
    url: API.ALBUM_SUB_LIST,
    method: 'GET',
  });
};

//收藏的 MV 列表
export function getMvSubList() {
  return request({
    url: API.MV_SUB_LIST,
    method: 'GET',
  });
}

//喜欢/取消喜欢音乐
export const getLikeSub = (id: number, like: string) => {
  return request({
    url: API.LIKE_SUB,
    method: 'GET',
    params: {
      id,
      like,
    },
  });
};

//收藏/取消收藏歌单
export const getSubscribeSub = (id: number, t: number) => {
  return request({
    url: API.SUBSCRIBE_SUB,
    method: 'GET',
    params: {
      id,
      t,
    },
  });
};

//收藏/取消收藏用户
export const getFollowSub = (id: number, t: number) => {
  return request({
    url: API.FOLLOW_SUB,
    method: 'GET',
    params: {
      id,
      t,
    },
  });
};

//收藏/取消收藏歌手
export const getArtistSub = (id: number, t: number) => {
  return request({
    url: API.ARTIST_SUB,
    method: 'GET',
    params: {
      id,
      t,
    },
  });
};

//收藏/取消收藏专辑
export const getAlbumSub = (id: number, t: number) => {
  return request({
    url: API.ALBUM_SUB,
    method: 'GET',
    params: {
      id,
      t,
    },
  });
};

//收藏/取消收藏 MV
export function getMvSub(mvid: number, t: number) {
  return request({
    url: API.MV_SUB,
    method: 'GET',
    params: {
      mvid,
      t,
    },
  });
}
