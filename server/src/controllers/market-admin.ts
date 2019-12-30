/*
 * @Author: jianghong.wei
 * @Date: 2019-11-09 23:18:08
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-12-30 14:05:58
 * 业务相关路由定义
 */

import { createRouter, response, catchError } from '../modules';
import { authAdmin } from '../middlewares/auth';
import * as cateSrv from '../services/category';
import * as goodsSrv from '../services/goods';
import * as homeSrv from '../services/home-manage';
import * as orderSrv from '../services/order';
import * as userSrv from '../services/user-admin';
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
		const { name, id, preority, images } = req.body;
		const result = await cateSrv.addOrUpdate({
			name,
			id,
			preority,
			images
		});
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
			status,
			timeKey,
			startTime,
			endTime,
			nickName,
			orderName,
			orderPhone,
			deleverPhone
		} = req.query;
		const result = await orderSrv.getOrderCondition({
			pageNo: Number(pageNo),
			pageSize: Number(pageSize) || 10,
			status,
			timeKey,
			startTime,
			endTime,
			nickName,
			orderName,
			orderPhone,
			deleverPhone
		});
		response.json(res, result);
	})
);
// 更新订单状态
router.post(
	'/order',
	authAdmin,
	catchError(async (req, res) => {
		const { orderId } = req.query;
		const { phone } = req.body;
		const result = await orderSrv.updateOrder(req, orderId, Number(phone));
		response.json(res, result);
	})
);
// 获取用户列表
router.get(
	'/user',
	authAdmin,
	catchError(async (req, res) => {
		let { pageNo, pageSize, state, name } = req.query;
		pageSize = pageSize || 10;
		const result = await userSrv.getUser({ pageNo, pageSize, state, name });
		response.json(res, result);
	})
);
// 更新用户状态
router.post(
	'/user',
	authAdmin,
	catchError(async (req, res) => {
		const { openid } = req.query;
		const { state } = req.body;
		const result = await userSrv.setUserState(openid, state);
		response.json(res, result);
	})
);

export default router;
