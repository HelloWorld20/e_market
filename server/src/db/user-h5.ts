/*
 * @Author: jianghong.wei
 * @Date: 2019-11-22 17:32:30
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-12-30 14:04:03
 * H5个人信息 数据库控制
 */

import mongo from '../modules/mongodb';
import * as mongoose from 'mongoose';

const model = {
	// 个人信息都是微信的数据
	city: String,
	country: String,
	headimgurl: String,
	latitude: Number,
	longitude: Number,
	nickName: String,
	openid: String,
	province: String,
	sex: Number,
	unionid: Number,
    userId: Number,
    state: Number, // 用户状态。1：正常。-1：封禁
	// 购物车
	cart: [
		{
			id: String, // 商品id
			name: String,
			prise: Number,
			unit: String,
			number: Number,
			images: [],
			restNum: Number,
			totalNum: Number,
			totalPrise: Number // 商品总价
		}
	],
	// 配送地址
	addr: [
		{
			id: String,
			orderName: String, // 配送姓名
			orderPhone: String, // 真实手机号
			orderAddr: String // 真实地址
		}
	]
};

const schema = new mongoose.Schema(model);

const COLLECTION = 'userH5'; // collection是config，则对应的库是configs

export const insert = (value: any) => {
	return mongo.insert(COLLECTION, schema, value);
};

export const find = (condition?: any): any => {
	return mongo.find(COLLECTION, schema, condition);
};

export const findAggregate = (aggregate: Array<any>) => {
	aggregate.push({ $project: { _id: 0, __v: 0 } });
	const Modal = mongo.getModal(COLLECTION, schema);
	return Modal.aggregate(aggregate);
};

export const del = (condition: any) => {
	return mongo.del(COLLECTION, schema, condition);
};

export const update = (condition: any, value: Record<string, any>) => {
	return mongo.update(COLLECTION, schema, condition, value);
};

export const getModal = () => {
	return mongo.getModal(COLLECTION, schema);
};
