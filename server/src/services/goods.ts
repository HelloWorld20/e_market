/*
 * @Author: jianghong.wei
 * @Date: 2019-11-13 19:04:24
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-12-05 22:04:02
 * 商品管理
 */
import { ServiceError } from '../modules';
import * as db_goods from '../db/goods';
import * as _ from 'lodash';
const Hashids = require('hashids/cjs');

const hashids = new Hashids('goods salt', 10);

export const getGoods = async (params: {
	pageNo: number; // 页码
	pageSize: number; // 页数
	name?: string; // 商品名称
	maxPrise?: number; // 价格范围
	minPrise?: number; // 价格范围
	updateTime?: string; // 更新时间
	createTime?: string; // 创建时间
	rest?: number; // 库存
	category?: string; // 分类
	isRecommend?: boolean; // 是否是推荐
}) => {
	let condition: Array<any> = [
		{ $sort: { createTime: 1 } }, // 顺序
		{ $match: { status: 1 } } // 只选上架
	];
	// 分类查询
	const category = params.category;
	if (category) {
		condition.push({ $match: { category } });
	}
	// 价格范围查询
	const maxPrise = params.maxPrise && Number(params.maxPrise);
	const minPrise = params.minPrise && Number(params.minPrise);
	if (minPrise) {
		condition.push({ $match: { prise: { $gte: minPrise } } });
	}
	if (maxPrise) {
		condition.push({ $match: { prise: { $lte: maxPrise } } });
	}
	// 名字查询
	if (params.name) {
		condition.push({ $match: { name: new RegExp(params.name) } });
	}
	// 是否推荐
	if (_.isBoolean(params.isRecommend)) {
		condition.push({ $match: { isRecommend: params.isRecommend } });
	}
	// 当前条件的总数
	console.log(JSON.stringify(condition));
	const totalPromise = db_goods.findAggregate([
		...condition,
		{ $group: { _id: null, count: { $sum: 1 } } }
	]);
	// 条件 + 分页(需放在后面)
	condition = condition.concat([
		{ $skip: params.pageNo * params.pageSize }, // 页码
		{ $limit: params.pageSize } // 页数
	]);
	const dataPromise = db_goods.findAggregate(condition);

	const [total, list] = await Promise.all([totalPromise, dataPromise]);

	return {
		list,
		total: total.length > 0 ? total[0].count : 0
	};
};

export const getAllGoods = async (params: {
	category: number;
	isRecommend?: boolean;
}) => {
	let condition: {
		category: number;
		status: -1 | 1;
		isRecommend?: boolean;
	} = {
		category: params.category,
		status: 1
	};
	if (_.isBoolean(params.isRecommend)) {
		condition.isRecommend = params.isRecommend;
	}
	const data = await db_goods.find(condition);
	return {
		data,
		total: data.length
	};
};

// 更新商品
export const addOrUpdateGoods = async (params: {
	id?: string;
	name?: string;
	desc?: string;
	prise?: number;
	unit?: string;
	category?: number;
	images?: Array<string>;
	totalNum?: number;
	restNum?: number;
	isRecommend?: boolean;
}) => {
	if (Object.keys(params).length <= 0) {
		throw new ServiceError('400', '参数为空');
	}
	var value: any = {
		updateTime: new Date().getTime(),
		...params
	};
	if (params.id) {
		// 已存在商品的情况
		return db_goods.update({ id: params.id }, value);
	} else {
		// 不存在商品的情况
		value.createTime = new Date().getTime();
		value.status = 1;
		value.id = hashids.encode(new Date().getTime());

		return db_goods.insert(value);
	}
};

// 删除商品
export const delGoods = async (ids: Array<string>) => {
	return db_goods.getModal().updateMany({ id: { $in: ids } }, { status: -1 });
};
// 批量更新推荐状态
export const updateMultiRecommend = async (
	ids: Array<string>,
	state: Boolean
) => {
	return db_goods
		.getModal()
		.updateMany({ id: { $in: ids } }, { isRecommend: state });
};

// 随机获取推荐商品
export const getRecommend = async (params: {
	pageNo: number; // 页码
	pageSize: number; // 页数
}) => {
	let condition: Array<any> = [
		{ $sort: { id: 1 } }, // 顺序
		{ $match: { status: 1, isRecommend: 1 } }, // 只选上架
		{ $skip: params.pageNo * params.pageSize }, // 页码
		{ $limit: params.pageSize } // 页数
	];
};
