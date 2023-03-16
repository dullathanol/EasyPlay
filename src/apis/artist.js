import request from "@/utils/request.js";

//收藏的歌手列表
export const getArtistSublist = () => {
    return request({
        url: '/artist/sublist',
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//收藏的专辑列表
export const getAlbumSublist = () => {
    return request({
        url: '/album/sublist',
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//收藏/取消收藏歌手
export const getArtistSub = (id, sub) => {
    return request({
        url: `/artist/sub?id=${id}&t=${sub}`,
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//收藏/取消收藏专辑
export const getAlbumSub = (id, sub) => {
    return request({
        url: `/album/sub?id=${id}&t=${sub}`,
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//获取歌手详情
export const getArtistDetail = (id) => {
    return request({
        url: `/artist/detail?id=${id}`,
        method: 'get',
    })
}

//歌手热门 50 首歌曲
export const getArtistSong = (id) => {
    return request({
        url: `/artist/top/song?id=${id}`,
        method: 'get',
    })
}

//歌手粉丝数量
export const getArtistFollow = (id) => {
    return request({
        url: `/artist/follow/count?id=${id}`,
        method: 'get',
    })
}

//获取专辑内容
export const getAlbum = (id) => {
    return request({
        url: `/album?id=${id}`,
        method: 'get',
    })
}

//获取歌手MV
export const getArtistMv = (id) => {
    return request({
        url: `/artist/mv?id=${id}`,
        method: 'get',
    })
}

//获取歌手专辑
export const getArtistAlbum = (id) => {
    return request({
        url: `/artist/album?id=${id}`,
        method: 'get',
    })
}