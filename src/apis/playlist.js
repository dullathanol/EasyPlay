import request from '@/utils/request.js';

//推荐新音乐
export const getNewsong = () => {
    return request({
        url: '/personalized/newsong',
        method: 'get',
    })
}

//推荐歌单
export const getPersonalized = (limit) => {
    return request({
        url: `/personalized?limit=${limit}`,
        method: 'get',
    })
}

//精品歌单
export const getHighquality = (limit) => {
    return request({
        url: `/top/playlist/highquality?limit=${limit}`,
        method: 'get',
    })
}

//所有榜单内容摘要
export const getToplist = () => {
    return request({
        url: '/toplist',
        method: 'get',
    })
}

//歌单分类
export const getCatlist = () => {
    return request({
        url: '/playlist/catlist',
        method: 'get',
    })
}

//网友精选碟歌单
export const getPlayList = (limit, cat) => {
    return request({
        url: `/top/playlist?limit=${limit}&cat=${cat}`,
        method: 'get',
    })
}

//歌单详情
export const getDetail = (id) => {
    return request({
        url: `/playlist/detail?id=${id}`,
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//收藏/取消收藏歌单
export const getSubscribe = (id, sub) => {
    return request({
        url: `/playlist/subscribe?id=${id}&t=${sub}`,
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//是否可用
export const getCheck = (id) => {
    return request({
        url: `/check/music?id=${id}`,
        method: 'get',
    })
}

//音乐url
export const getSongUrl = (id) => {
    return request({
        url: `/song/url?id=${id}`,
        method: 'get',
    })
}