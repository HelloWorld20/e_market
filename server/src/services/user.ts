/*
 * @Author: jianghong.wei
 * @Date: 2019-11-22 17:51:01
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-24 18:57:05
 * H5用户相关服务
 */

import { ServiceError } from '../modules';
import * as db_auth_h5 from '../db/user';
import * as db_goods from '../db/goods';
import { getWxUserInfo } from './auth';
import { Request } from 'express';
import * as _ from 'lodash';

// H5端的获取微信用户信息
// 这里还是去读取数据库的用户信息。
// 微信授权交给，判断登录中间件来调用。一旦未登录，则调用微信用户信息接口
export async function getUserInfo(req: Request): Promise<UserInfo> {
	// 从微信获取用户信息
	const wxUserInfo = await getWxUserInfo();
	// 添加登录标记
	try {
		if (req.session) {
			req.session.openid = wxUserInfo.openid;
		}

		const openid = wxUserInfo.openid;

		const userInfoArr = await db_auth_h5.find({ openid });
		let userInfo: UserInfo | {} = {};
		if (userInfoArr.length === 0) {
			// 不存在用户，新增.
			// 在获取用户数据时，如果没有，则直接获取微信数据，并”注册“
			userInfo = { ...wxUserInfo, cart: [], addr: [] };
			db_auth_h5.insert(userInfo);
		} else {
			userInfo = userInfoArr[0];
		}
		if (_.isEmpty(userInfo)) {
			throw new ServiceError('403', '获取用户信息失败');
		}
		return userInfo as UserInfo;
	} catch {
		throw new ServiceError('403', '获取用户信息失败');
	}
}

/**
 * 添加地址
 * @param openid openid
 * @param params
 * @param params.orderName  配送姓名
 * @param params.orderPhone 配送手机号
 * @param params.orderAddr  配送地址
 */
export const addAddr = (
	openid: string,
	params: {
		orderName: string;
		orderPhone: number;
		orderAddr: string;
	}
) => {};

// 获取所有配送地址
export async function getAddr(req: Request) {
	const openid: string = req.session && req.session.openid;

	const userInfoArr = await db_auth_h5.find({ openid });

	if (userInfoArr.length === 0) {
		throw new ServiceError('403', '获取用户信息失败');
	}
	const userInfo: any = userInfoArr[0];

	return (userInfo as UserInfo).addr;
}

export async function getCart(req: Request) {
	const openid: string = req.session && req.session.openid;

	const userInfoArr = await db_auth_h5.find({ openid });

	if (userInfoArr.length === 0) {
		throw new ServiceError('403', '获取用户信息失败');
	}
	const userInfo: any = userInfoArr[0];

	return (userInfo as UserInfo).cart;
}

/**
 * 新增或修改购物车
 * @param req
 * @param number    商品数量
 * @param priseId   商品id
 */
export async function addOrUpdateCart(
	req: Request,
	number: number,
	goodsId: number
) {
	if (number <= 0) throw new ServiceError('400', '数量不能小于1');
	const openid: string = req.session && req.session.openid;
	const userInfoArr = await db_auth_h5.find({ openid });
	const userInfo: UserInfo = userInfoArr[0];
	const cartArr = userInfo.cart;

	const goodsIndex = cartArr.findIndex(item => item.id === goodsId);
	if (goodsIndex !== -1) {
		// 找到对应商品
		const goods = cartArr[goodsIndex];
		goods.number = number;
		goods.totalPrise = number * goods.prise;
		cartArr[goodsIndex] = goods;
	} else {
		// 没在购物车里找到对应商品，新增一条记录
		const goodsModal = db_goods.getModal();
		const goodsInfo = (await goodsModal.findOne({ id: goodsId })) as any;

		const { id, name, prise, unit, images, restNum } = goodsInfo as {
			id: number;
			name: string;
			prise: number;
			unit: string;
			images: string[];
			restNum: number;
		};
		const goods = {
			id,
			name,
			prise,
			unit,
			number,
			images,
			restNum,
			totalPrise: prise * number
		};

		cartArr.push(goods);
	}

	userInfo.cart = cartArr;
	return db_auth_h5.update({ openid }, userInfo);
}

export async function delCart(req: Request, goodsId: number) {
	const openid: string = req.session && req.session.openid;

	const userInfoArr = await db_auth_h5.find({ openid });
	const userInfo: UserInfo = userInfoArr[0];
	const cartArr = userInfo.cart;

	const goodsIndex = cartArr.findIndex(v => v.id === goodsId);

	if (goodsIndex !== -1) {
		// cartArr
		cartArr.splice(goodsIndex, 1);
	} else {
		throw new ServiceError('400', '没有对应商品');
	}
	console.log(cartArr, goodsIndex);

	return db_auth_h5.update(
		{ openid },
		{
			cart: cartArr
		}
	);
}
