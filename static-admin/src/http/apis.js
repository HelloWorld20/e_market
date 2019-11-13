import { $post } from './request';

let urls = {
	testUrl: '/api/test',
	redis: '/api/test/redis',
	mongo: '/api/test/mongo',
	upload: '/api/service/upload',	// 上传接口
	cate: '/api/market/category',	// 分类相关接口
	login: '/api/auth/login',
	register: '/api/auth/register',
	logout: '/api/auth/logout'
};


export const login = (username, password) => {
	return $post(urls.login, {username, password});
};

export const register = (username, password) => {
	return $post(urls.register, {username, password});
};

export const logout = () => {
	return $post(urls.logout);
};

export default urls;
