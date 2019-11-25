import { $get, $post, $delete } from './request';

let urls = {
	testUrl: '/api/test',
	goods: '/api/market/h5/goods',
	cate: '/api/market/h5/category', // 分类相关接口s
	home: '/api/market/h5/home', // 首页相关接口
	recommend: '/api/market/h5/recommend',
	userInfo: '/api/auth/userInfo', // 微信登陆授权
	cart: '/api/h5/user/cart',
	addr: '/api/h5/user/addr'
};

export const getHome = () => $get(urls.home);

// 分类管理
export const getCategory = () => $get(urls.cate);

export const getGoods = params =>
	$get(urls.goods, {
		params
	});

export const getUserInfo = () => $get(urls.userInfo);

export const getCart = () => $get(urls.cart);
export const getAddr = () => $get(urls.getAddr);

// params = {name, phone, addr}
export const addOrUpdateCart = (goodsId, number) =>
	$post(urls.cart, {
		goodsId,
		number
	});

export const delCart = goodsId =>
	$delete(urls.cart, {
		params: {
			goodsId
		}
	});

export default urls;
