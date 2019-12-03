/*
 * @Author: jianghong.wei
 * @Date: 2019-11-09 23:18:08
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-12-03 11:55:14
 * 业务相关路由定义
 */

import { createRouter, response, catchError } from '../modules';
import { authAdmin } from '../middlewares/auth';
import * as cateSrv from '../services/category';
import * as goodsSrv from '../services/goods';
import * as homeSrv from '../services/home-manage';
import * as orderSrv from '../services/order';
const router = createRouter();

// 获取所有分类
router.get(
	'/category',
	authAdmin,
	catchError(async (req, res) => {
		const result = await cateSrv.getCategory();
		response.json(res, result);
	})
);

// 新增或修改菜单
router.post(
	'/category',
	authAdmin,
	catchError(async (req, res) => {
		const { name, id, preority } = req.body;
		const result = await cateSrv.addOrUpdate({ name, id, preority });
		response.json(res, result);
	})
);
// 删除指定分类
router.delete(
	'/category',
	authAdmin,
	catchError(async (req, res) => {
		const { id } = req.query;
		const result = await cateSrv.delCategory(id);
		response.json(res, result);
	})
);
// 获取商品，列表
router.get(
	'/goods',
	authAdmin,
	catchError(async (req, res, next) => {
		const {
			pageNo,
			pageSize,
			name,
			maxPrise,
			minPrise,
			updateTime,
			createTime,
			rest,
			category,
			isRecommend
		} = req.query;
		const result = await goodsSrv.getGoods({
			pageNo,
			pageSize: pageSize || 10,
			name,
			maxPrise,
			minPrise,
			updateTime,
			createTime,
			rest,
			category,
			isRecommend: isRecommend
				? isRecommend === 'true'
					? true
					: false
				: undefined
		});
		response.json(res, result);
	})
);
// 更新新增商品，单个
router.post(
	'/goods',
	authAdmin,
	catchError(async (req, res, next) => {
		const {
			id,
			name,
			desc,
			prise,
			unit,
			category,
			images,
			totalNum,
			restNum,
			isRecommend
		} = req.body;
		const result = await goodsSrv.addOrUpdateGoods({
			id,
			name,
			desc,
			prise,
			unit,
			category,
			images,
			totalNum,
			restNum,
			isRecommend
		});
		response.json(res, result);
	})
);
// 删除商品，批量
router.delete(
	'/goods',
	authAdmin,
	catchError(async (req, res) => {
		let { ids } = req.query;
		ids = ids.split(',');
		const result = await goodsSrv.delGoods(ids);
		response.json(res, result);
	})
);
// 获取首页配置
router.get(
	'/home',
	authAdmin,
	catchError(async (req, res) => {
		const result = await homeSrv.getConfig();
		response.json(res, result[0]);
	})
);
// 更新首页配置
router.post(
	'/home',
	authAdmin,
	catchError(async (req, res) => {
		const { carousel } = req.body;
		const result = await homeSrv.updateConfig({ carousel });
		response.json(res, result);
	})
);
// 批量添加推荐
router.post(
	'/recommend',
	authAdmin,
	catchError(async (req, res) => {
		let { ids } = req.body;
		ids = ids.split(',');
		const result = await goodsSrv.updateMultiRecommend(ids, true);
		response.json(res, result);
	})
);
// 批量删除推荐
router.delete(
	'/recommend',
	authAdmin,
	catchError(async (req, res) => {
		let { ids } = req.query;
		ids = ids.split(',');
		const result = await goodsSrv.updateMultiRecommend(ids, false);
		response.json(res, result);
	})
);
// 获取订单信息
router.get(
	'/order',
	authAdmin,
	catchError(async (req, res) => {
		const {
			pageNo,
			pageSize,
			state,
			timeKey,
			startTime,
			endTime,
			userName,
			orderName,
			orderPhone,
			deleverPhone
		} = req.query;
		const result = await orderSrv.getOrderCondition({
			pageNo: Number(pageNo),
			pageSize: Number(pageSize) || 10,
			state,
			timeKey,
			startTime,
			endTime,
			userName,
			orderName,
			orderPhone,
			deleverPhone
		});
		response.json(res, result);
	})
);
// 更新状态
router.post(
	'/order',
	authAdmin,
	catchError(async (req, res) => {
		let { orderId } = req.query;
		let { phone } = req.body;
		const result = await orderSrv.updateOrder(req, orderId, phone);
		response.json(res, result);
	})
);

export default router;
