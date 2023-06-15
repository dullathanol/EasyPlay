import type { Personalized, Toplist, NewSong, ListDetail, Search } from './types';

import request from '@/apis';

enum API {
  Recommend_Song = '/recommend/songs',
  FM = '/personal_fm',
  FM_TRASH = '/fm_trash',
  SEARCH = '/cloudsearch',
  NEW_SONG = '/personalized/newsong',
  PERSONALIZED = '/personalized',
  HIGHQUALITY = '/top/playlist/highquality',
  TOP_LIST = '/toplist',
  CAT_LIST = '/playlist/catlist',
  PLAY_LIST = '/top/playlist',
  LIST_DETAIL = '/playlist/detail',
  SONG_CHECK = '/check/music',
  SONG_URL = '/song/url',
  MV_ALL = '/mv/all',
  MV_FIRST = '/mv/first',
  MV_EXCLUSIVE = '/mv/exclusive/rcmd',
  MV_DETAIL = '/mv/detail',
  MV_URL = '/mv/url',
  MV_SIMI = '/simi/mv',
  ALBUM_DETAIL = '/album',
}

//每日推荐
export const getRecommendSong = () => {
  return request({
    url: API.Recommend_Song,
    method: 'GET',
  });
};

//私人FM
export const getFM = () => {
  return request({
    url: API.FM,
    method: 'GET',
  });
};

//FM垃圾桶
export const getFMTrash = (id: number) => {
  return request({
    url: API.FM_TRASH,
    method: 'GET',
    params: {
      id,
    },
  });
};

//搜索
export const getSearch = (keywords: string, type: number): Promise<Search> => {
  return request({
    url: API.SEARCH,
    method: 'GET',
    params: {
      keywords,
      type,
    },
  });
};

//推荐新音乐
export const getNewSong = (): Promise<NewSong> => {
  return request({
    url: API.NEW_SONG,
    method: 'GET',
  });
};

//推荐歌单
export const getPersonalized = (limit: number): Promise<Personalized> => {
  return request({
    url: API.PERSONALIZED,
    method: 'GET',
    params: {
      limit,
    },
  });
};

//精品歌单
export const getHighquality = (limit: number) => {
  return request({
    url: API.HIGHQUALITY,
    method: 'GET',
    params: {
      limit,
    },
  });
};

//所有榜单内容摘要
export const getToplist = (): Promise<Toplist> => {
  return request({
    url: API.TOP_LIST,
    method: 'GET',
  });
};

//歌单分类
export const getCatlist = () => {
  return request({
    url: API.CAT_LIST,
    method: 'GET',
  });
};

//网友精选碟歌单
export const getPlayList = (limit: number, cat: number) => {
  return request({
    url: API.PLAY_LIST,
    method: 'GET',
    params: {
      limit,
      cat,
    },
  });
};

//歌单详情
export const getListDetail = (id: number): Promise<ListDetail> => {
  return request({
    url: API.LIST_DETAIL,
    method: 'GET',
    params: {
      id,
    },
  });
};

//歌曲是否可用
export const getSongCheck = (id: number) => {
  return request({
    url: API.SONG_CHECK,
    method: 'GET',
    params: {
      id,
    },
  });
};

//音乐url
export const getSongUrl = (id: number) => {
  return request({
    url: API.SONG_URL,
    method: 'GET',
    params: {
      id,
    },
  });
};

//全部mv
export function getMvAll(limit: number, area = '', type = '', order = '') {
  return request({
    url: API.MV_ALL,
    method: 'GET',
    params: {
      limit,
      area,
      type,
      order,
    },
  });
}

//最新mv
export const getMVFirst = () => {
  return request({
    url: API.MV_FIRST,
    method: 'GET',
    params: {
      limit: 50,
    },
  });
};

//网易出品mv
export const getMVExclusive = () => {
  return request({
    url: API.MV_EXCLUSIVE,
    method: 'GET',
    params: {
      limit: 50,
    },
  });
};

//mv详情
export const getMVDetail = (mvid: number) => {
  return request({
    url: API.MV_DETAIL,
    method: 'GET',
    params: {
      mvid,
    },
  });
};

//mv链接
export const getMvUrl = (id: number, r: number) => {
  return request({
    url: API.MV_URL,
    method: 'GET',
    params: {
      id,
      r,
    },
  });
};

//相似mv
export const getMVSimi = (mvid: number) => {
  return request({
    url: API.MV_SIMI,
    method: 'GET',
    params: {
      mvid,
    },
  });
};

//获取专辑内容
export const getAlbumDetail = (id: number) => {
  return request({
    url: API.ALBUM_DETAIL,
    method: 'GET',
    params: {
      id,
    },
  });
};
