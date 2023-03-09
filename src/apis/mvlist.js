import request from '@/utils/request.js';

//全部mv
export function getMvAll(limit, area = '全部', type = '全部', order = '上升最快') {
    return request({
        url: `/mv/all?limit=${limit}&area=${area}&type=${type}&order=${order}`,
        method: 'get',
    })
}

//最新mv
export const getFirst = () => {
    return request({
        url: '/mv/first?limit=50',
        method: 'get',
    })
}

//网易出品mv
export const getExclusive = () => {
    return request({
        url: '/mv/exclusive/rcmd?limit=50',
        method: 'get',
    })
}

//mv数据
export const getDetail = (id) => {
    return request({
        url: `/mv/detail?mvid=${id}`,
        method: 'get',
    })
}

//mv地址
export const getMvUrl = (id, r) => {
    return request({
        url: `/mv/url?id=${id}&r=${r}`,
        method: 'get',
    })
}

////相似mv
export const getSimi = (id) => {
    return request({
        url: `/simi/mv?mvid=${id}`,
        method: 'get',
    })
}