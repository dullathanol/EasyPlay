import request from "@/utils/request.js";

//每日推荐
export const getRecommendSongs = () => {
    return request({
        url: '/recommend/songs',
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//私人FM
export const getFM = () => {
    return request({
        url: '/personal_fm',
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//FM垃圾桶
export const getTrash = (id) => {
    return request({
        url: `/fm_trash?id${id}`,
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//用户详情
export const getUserDetail = (id) => {
    return request({
        url: `/user/detail?uid=${id}`,
        method: 'get',
    })
}

//账号信息
export const getAccount = () => {
    return request({
        url: '/user/account',
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//用户歌单
export const getPlaylist = (id) => {
    return request({
        url: `/user/playlist?uid=${id}`,
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//用户播放记录
export const getRecord = (id, type) => {
    return request({
        url: `/user/record?uid=${id}&type=${type}`,
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//喜欢音乐
export const getLike = (id, like) => {
    return request({
        url: `/like?id=${id}&like=${like}`,
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}

//喜欢音乐列表
export const getLikelist = (uid) => {
    return request({
        url: `/likelist?uid=${uid}`,
        method: 'get',
        params: {
            timestamp: new Date().getTime(),
        }
    })
}