import request from '@/apis';

//搜索
export const getSearch = (keywords: string, type: number) => {
  return request({
    url: '/cloudsearch',
    method: 'get',
    params: {
      keywords,
      type,
    },
  });
};
