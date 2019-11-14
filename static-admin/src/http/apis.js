import { $post, $get, $delete } from './request';

let urls = {
	testUrl: '/api/test',
	redis: '/api/test/redis',
	mongo: '/api/test/mongo',
	upload: '/api/service/upload',	// 上传接口
	login: '/api/auth/login',
	register: '/api/auth/register',
	logout: '/api/auth/logout',
	goods: '/api/market/goods',
	cate: '/api/market/category'	// 分类相关接口
};


export const login = (username, password) => {
	return $post(urls.login, { username, password });
};

export const register = (username, password) => {
	return $post(urls.register, { username, password });
};

export const logout = () => {
	return $post(urls.logout);
};
/**
 * @param pageNo: number; // 页码
 * @param pageSize: number; // 页数
 * @param name?: string; // 商品名称
 * @param maxPrise?: number; // 价格范围
 * @param minPrise?: number; // 价格范围
 * @param updateTime?: string; // 更新时间
 * @param createTime?: string; // 创建时间
 * @param rest?: number; // 库存
 */
export const getGoods = params => {
	return $get(urls.goods, { params });
};
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
export const addOrUpdateGoods = params => {
	return $post(urls.goods, params);
};

export const delGoods = id => {
	return $delete(urls.goods, id);
};

export default urls;
