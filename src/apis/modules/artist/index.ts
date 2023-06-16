import type { ArtistDetail, ArtistSong, ArtistAlbum, ArtistMv } from './types';

import request from '@/apis';

enum API {
  ARTIST_DETAIL = '/artist/detail',
  ARTIST_SONG = '/artist/top/song',
  ARTIST_FOLLOW = '/artist/follow/count',
  ARTIST_MV = '/artist/mv',
  ARTIST_ALBUM = '/artist/album',
}

//获取歌手详情
export const getArtistDetail = (id: number): Promise<ArtistDetail> => {
  return request({
    url: API.ARTIST_DETAIL,
    method: 'GET',
    params: {
      id,
    },
  });
};

//歌手热门 50 首歌曲
export const getArtistSong = (id: number): Promise<ArtistSong> => {
  return request({
    url: API.ARTIST_SONG,
    method: 'GET',
    params: {
      id,
    },
  });
};

//歌手粉丝数量
export const getArtistFollow = (id: number) => {
  return request({
    url: API.ARTIST_FOLLOW,
    method: 'GET',
    params: {
      id,
    },
  });
};

//获取歌手MV
export const getArtistMv = (id: number): Promise<ArtistMv> => {
  return request({
    url: API.ARTIST_MV,
    method: 'GET',
    params: {
      id,
    },
  });
};

//获取歌手专辑
export const getArtistAlbum = (id: number): Promise<ArtistAlbum> => {
  return request({
    url: API.ARTIST_ALBUM,
    method: 'GET',
    params: {
      id,
    },
  });
};
