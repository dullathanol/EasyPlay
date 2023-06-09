import request from '@/utils/request';

//搜索
export const getSearch = (keywords, type) => {
  return request({
    url: `/cloudsearch?keywords=${keywords}&type=${type}`,
    method: 'get',
  });
};
