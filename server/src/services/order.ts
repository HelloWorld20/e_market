/*
 * @Author: jianghong.wei
 * @Date: 2019-11-22 16:16:19
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-12-05 14:42:35
 * 订单服务
 */

import { ServiceError } from '../modules';
import * as db_order from '../db/order';
import * as db_goods from '../db/goods';
import * as userSrv from './user-h5';
import * as _ from 'lodash';
const Hashids = require('hashids/cjs');

const hashids = new Hashids('order salt', 10);
const orderids = new Hashids('order id salt for user', 15);
import { Request } from 'express';

// 获取个人所有订单
export const getOrder = (
	req: Request,
	params: {
		status: 0 | 1 | 2 | 3 | 4 | -1;
	}
) => {
	const openid: string = req.session && req.session.openid;
	let condition: any = {
		openid
	};
	if (params.status) {
		condition.status = params.status;
	}
	return db_order.find(condition);
};
// 根据id返回订单数据
export const getOrderById = (req: Request, id: Number) => {
	const openid: string = req.session && req.session.openid;
	return db_order.find({ openid, id });
};
// 查询订单，后台
export const getOrderCondition = async (params: {
	pageNo: number;
	pageSize: number;
	status?: 0 | 1 | 2 | 3 | 4 | -1; // 订单状态 0：未支付；1：已支付；2：商家接单；3：正在配送；4：配送完成；-1：关闭
	// orderId?: number;
	timeKey?: // 多种时间查询，只能选一个
	| 'createTime'
		| 'updateTime'
		| 'payTime'
		| 'acceptTime'
		| 'deleverTime'
		| 'dealTime';
	startTime?: string; // 条件查询，开始时间
	endTime?: string; // 结束时间
	nickName?: string; // 用户名（微信名)
	orderPhone?: string; // 配送地址手机号
	orderName?: string; // 配送地址姓名
	deleverPhone?: string; // 配送人电话
}) => {
	let condition: Array<any> = [
		{ $sort: { createTime: 1 } } // 顺序
	];

	// 订单状态查询
	if (params.status && [-1, 0, 1, 2, 3, 4].includes(Number(params.status))) {
		condition.push({ $match: { status: Number(params.status) } });
	}
	// 用户名查询
	if (params.nickName) {
		condition.push({ $match: { nickName: params.nickName } });
	}
	// 配送手机号查询
	if (params.orderPhone) {
		condition.push({ $match: { orderPhone: params.orderPhone } });
	}
	// 配送用户名查询
	if (params.orderName) {
		condition.push({ $match: { orderName: params.orderName } });
	}
	// 送货小哥手机号查询
	if (params.deleverPhone) {
		condition.push({ $match: { deleverPhone: params.deleverPhone } });
	}

	// 时间范围查询
	if (params.startTime) {
		const timeKey = params.timeKey || 'createTime';
		let matchCondition: any = {};
		matchCondition[timeKey] = { $gte: params.startTime };
		condition.push({ $match: matchCondition });
	}
	if (params.endTime) {
		const timeKey = params.timeKey || 'createTime';
		let matchCondition: any = {};
		matchCondition[timeKey] = { $lte: params.startTime };
		condition.push({ $match: matchCondition });
    }

	// 当前条件的总数
	const totalPromise = db_order.findAggregate([
		...condition,
		{ $group: { _id: null, count: { $sum: 1 } } }
	]);

	const dataPromise = db_order.findAggregate(condition);

	const [total, list] = await Promise.all([totalPromise, dataPromise]);

	return {
		list,
		total: total.length > 0 ? total[0].count : 0
	};
};

// 创建订单
export const createOrder = async (
	req: Request,
	addrId: string,
	desc?: string
) => {
	// 获取用户信息
	// 用户信息里获取购物车信息
	const openid: string = req.session && req.session.openid;
	const userInfo = await userSrv.getUserInfo(req);
	const cartArr = userInfo.cart;
	if (!addrId) {
		throw new ServiceError('400', '请选择送货地址');
	}
	const addrInfo = userInfo.addr.find(v => v.id === addrId);
	if (!addrInfo) {
		throw new ServiceError('404', '没有找到地址');
	}

	// 检查剩余库存，
	const goodsIds = cartArr.map(v => v.id);

	let goodsInfo = await db_goods.find({ id: { $in: goodsIds } });

	goodsInfo = goodsInfo.map((goodsItem: any) => {
		const id = goodsItem.id;
		const cartItem = cartArr.find(v => v.id === id);
		if (!cartItem) {
			throw new ServiceError('403', `不存在商品：${goodsItem.name}`);
		}
		if (cartItem.number > goodsItem.restNum) {
			throw new ServiceError('403', `${goodsItem.name}库存不足`);
		}

		goodsItem.restNum = goodsItem.restNum - cartItem.number;

		return goodsItem;
	});

	// 更新剩余库存
	for (let i = 0; i < goodsIds.length; i++) {
		const id = goodsIds[i];
		const goods = goodsInfo.find(v => id === v.id);
		if (!goods) throw new ServiceError('500', '无法修改剩余库存');
		const restNum = (goods as any).restNum;
		await db_goods.update({ id }, { restNum });
	}

	// 创建订单
	const goods = cartArr.map(v => ({
		goodsId: v.id,
		goodsName: v.name,
		goodsNum: v.number,
		goodsUnit: v.unit,
		goodsPrise: v.prise,
		goodsImage: v.images,
		goodsTotalPrise: v.number * v.prise
	}));
	let orderGoodsPrise = 0;
	cartArr.forEach(v => (orderGoodsPrise += v.totalPrise));

	const t = new Date().getTime();
	const id = hashids.encode(t);
	const orderId = orderids.encode(t);
	const order: OrderInfo = {
		id,
		orderId,
		payId: null,
		createTime: t + '',
		updateTime: t + '',
		payTime: null,
		acceptTime: null,
		deleverTime: null,
		dealTime: null,
		goods,
		openid,
		nickName: userInfo.nickName,
		orderName: addrInfo.orderName,
		orderPhone: addrInfo.orderPhone,
		orderAddr: addrInfo.orderAddr,

		orderGoodsPrise,
		orderDeleverPrise: 0,
		orderDescountPrise: 0,
		orderPriseAll: orderGoodsPrise,

		deleverPhone: null,
		status: 0,
		desc: desc || ''
	};
	await db_order.insert(order);
	// 清空购物车
	// await userSrv.clearCart(req);
	// 推送通知
	// ??????
	// 返回订单详情
	return order;
};

// 把订单状态从0更新到1。即从下单到支付状态。
export const update2Payed = async (
	req: Request,
	orderId: Number,
	payId: String
) => {
	const openid: string = req.session && req.session.openid;
	if (!payId) throw new ServiceError('400', '请传入交易id');
	return db_order.update(
		{ openid, orderId, status: 0 },
		{
			status: 1,
			payId
		}
	);
};
// 关闭订单（只能关闭、不能删除）
export const disableOrder = (req: Request, orderId: Number) => {
	const openid: string = req.session && req.session.openid;
	return db_order.update({ openid, orderId }, { status: -1 });
};

/**
 * 更新订单信息，只能递增更新，不能通过这个方法把状态从0 =》 1
 * @param orderId  // 订单id，不是数据库用的id，是前端可见的id
 * @param phone   送货人电话
 */
export const updateOrder = async (
	req: Request,
	orderId: Number,
	phone?: number
) => {
	const openid: string = req.session && req.session.openid;
	const orderInfoArr = await db_order.find({ openid, orderId });
	const orderInfo: any = orderInfoArr[0];

	if (orderInfo.status === 0) {
		throw new ServiceError('403', '无法操作，订单未支付');
	}

	if (_.isNumber(phone)) {
		(orderInfo as OrderInfo).deleverPhone = phone;
	}
	if (orderInfo.status < 4) {
		orderInfo.status++;
	}

	return db_order.update({ openid, orderId }, orderInfo);
};
