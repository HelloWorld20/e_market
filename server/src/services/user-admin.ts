import { ServiceError } from '../modules';
import * as db_user from '../db/user-h5';
import { Request } from 'express';
import * as _ from 'lodash';

// 获取用户数据列表（分页)
export async function getUser(params: {
	pageNo: number;
	pageSize: number;
	state: -1 | 1;
	name: string;
}) {
	let condition: Array<any> = [
		{ $sort: { createTime: 1 } } // 顺序
	];

	// 状态
	const state = Number(params.state);
	if (state === -1 || state === 1) {
		condition.push({ $match: { state } });
	}

	// 名称
	if (params.name) {
		condition.push({ $match: { nickName: params.name } });
	}

	// 当前条件的总数
	const totalPromise = db_user.findAggregate([
		...condition,
		{ $group: { _id: null, count: { $sum: 1 } } }
	]);

	params.pageSize = params.pageSize || 10;
	// 条件 + 分页(需放在后面)
	condition = condition.concat([
		{ $skip: params.pageNo * params.pageSize }, // 页码
		{ $limit: params.pageSize } // 页数
	]);

	const dataPromise = db_user.findAggregate(condition);

	const [total, list] = await Promise.all([totalPromise, dataPromise]);

	return {
		list,
		total: total.length > 0 ? total[0].count : 0
	};
}
// 设置单个用户状态
export async function setUserState(openid: string, state: -1 | 1) {
	if (Number(state) === -1 || Number(state) === 1) {
		return db_user.update({ openid }, { state });
	} else {
		throw new ServiceError('403', `不可设置状态为${Number(state)}`);
	}
}
