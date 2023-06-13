import request from '@/apis';

//收藏的歌手列表
export const getArtistSublist = () => {
  return request({
    url: '/artist/sublist',
    method: 'get',
  });
};

//收藏的专辑列表
export const getAlbumSublist = () => {
  return request({
    url: '/album/sublist',
    method: 'get',
  });
};

//收藏/取消收藏歌手
export const getArtistSub = (id: number, t: number) => {
  return request({
    url: '/artist/sub',
    method: 'get',
    params: {
      id,
      t,
    },
  });
};

//收藏/取消收藏专辑
export const getAlbumSub = (id: number, t: number) => {
  return request({
    url: '/album/sub',
    method: 'get',
    params: {
      id,
      t,
    },
  });
};

//获取歌手详情
export const getArtistDetail = (id: number) => {
  return request({
    url: '/artist/detail',
    method: 'get',
    params: {
      id,
    },
  });
};

//歌手热门 50 首歌曲
export const getArtistSong = (id: number) => {
  return request({
    url: '/artist/top/song',
    method: 'get',
    params: {
      id,
    },
  });
};

//歌手粉丝数量
export const getArtistFollow = (id: number) => {
  return request({
    url: '/artist/follow/count',
    method: 'get',
    params: {
      id,
    },
  });
};

//获取专辑内容
export const getAlbum = (id: number) => {
  return request({
    url: '/album',
    method: 'get',
    params: {
      id,
    },
  });
};

//获取歌手MV
export const getArtistMv = (id: number) => {
  return request({
    url: '/artist/mv',
    method: 'get',
    params: {
      id,
    },
  });
};

//获取歌手专辑
export const getArtistAlbum = (id: number) => {
  return request({
    url: '/artist/album',
    method: 'get',
    params: {
      id,
    },
  });
};
