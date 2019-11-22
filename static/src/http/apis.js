import { $get } from './request';

let urls = {
	testUrl: '/api/test',
	goods: '/api/market/h5/goods',
	cate: '/api/market/h5/category',	// 分类相关接口s
	home: '/api/market/h5/home',	// 首页相关接口
	recommend: '/api/market/h5/recommend'

};

export const getHome = () => $get(urls.home);

// 分类管理
export const getCategory = () => $get(urls.cate);

export const getGoods = params => $get(urls.goods, { params });

// for (let o in urls) {
// 	urls[o] = config.baseUrl() + urls[o];
// }

export default urls;
