import { $get } from './request';

// ////爬虫接口
export const getHousePrise = city => $get(`/api/crawler/housePrise/${city}`);
