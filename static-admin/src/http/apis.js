import { $post, $get, $delete } from './request';

let urls = {
	testUrl: '/api/test',
	redis: '/api/test/redis',
	mongo: '/api/test/mongo',
	upload: '/api/service/upload',	// 上传接口
	login: '/api/admin/auth/login',
	register: '/api/admin/auth/register',
	logout: '/api/admin/auth/logout',
	goods: '/api/admin/market/goods',
	cate: '/api/admin/market/category',	// 分类相关接口
	home: '/api/admin/market/home',	// 首页相关接口
	recommend: '/api/admin/market/recommend'
};

export const login = (username, password) => $post(urls.login, { username, password });

export const register = (username, password) => $post(urls.register, { username, password });

export const logout = () => $post(urls.logout);
/**
 * @param pageNo: number; // 页码
 * @param pageSize: number; // 页数
 * @param name?: string; // 商品名称
 * @param maxPrise?: number; // 价格范围
 * @param minPrise?: number; // 价格范围
 * @param updateTime?: string; // 更新时间
 * @param createTime?: string; // 创建时间
 * @param rest?: number; // 库存
 * @param category?: number; // 分类
 */
export const getGoods = params => $get(urls.goods, { params });
/**
 * @param {*} id?: number;
 * @param {*} name?: string;
 * @param {*} desc?: string;
 * @param {*} prise?: string;
 * @param {*} unit?: string;
 * @param {*} category?: number;
 * @param {*} images?: Array<string>;
 * @param {*} totalNum?: number;
 * @param {*} restNum?: number;
 */
export const addOrUpdateGoods = params => $post(urls.goods, params);

export const delGoods = ids => {
	const idsStr = ids.reduce((a, b) => (a + ',' + b), '').slice(1);
	return $delete(urls.goods, {
		params: { ids: idsStr }
	});
};

// 分类管理
export const getCategory = () => $get(urls.cate);

// 首页相关;
export const getHome = () => $get(urls.home);
export const updateHome = params => $post(urls.home, params);

export const updateRecommend = ids => {
	const idsStr = ids.reduce((a, b) => (a + ',' + b), '').slice(1);
	return $post(urls.recommend, { ids: idsStr });
};

export const delRecommend = ids => {
	const idsStr = ids.reduce((a, b) => (a + ',' + b), '').slice(1);
	return $delete(urls.recommend, {
		params: { ids: idsStr }
	});
};

export default urls;
