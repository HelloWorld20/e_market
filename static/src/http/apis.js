import { $get, $post, $delete } from './request';

let urls = {
	testUrl: '/api/test',
	goods: '/api/h5/market/goods',
	cate: '/api/h5/market/category', // 分类相关接口s
	home: '/api/h5/market/home', // 首页相关接口
	recommend: '/api/h5/market/recommend',
	userInfo: '/api/h5/user/userInfo', // 微信登陆授权
	cart: '/api/h5/user/cart',
	addr: '/api/h5/user/address'
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

export const addOrUpdateCart = (goodsId, number) =>
	$post(urls.cart, {
		params: {
			goodsId
		},
		data: {
			number
		}
	});

export const delCart = goodsId =>
	$delete(urls.cart, {
		params: {
			goodsId
		}
	});

export const getAddr = () => $get(urls.addr);
export const addOrUpdateAddr = ({ name, phone, addr, id }) =>
	$post(urls.addr, {
		params: { id },
		data: {
			name,
			phone,
			addr
		}

	});

export default urls;
