/*
 * @Author: jianghong.wei
 * @Date: 2019-11-22 10:38:12
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-12-02 16:44:29
 * h5端市场controller
 */

import { createRouter, response, catchError } from '../modules';
import * as cateSrv from '../services/category';
import * as goodsSrv from '../services/goods';
import * as homeSrv from '../services/home-manage';
const router = createRouter();

// 获取所有分类
router.get(
	'/category',
	catchError(async (req, res) => {
		const result = await cateSrv.getCategory();
		response.json(res, result);
	})
);

// 获取商品，列表
router.get(
	'/goods',
	catchError(async (req, res, next) => {
		const { category, isRecommend } = req.query;
		const result = await goodsSrv.getAllGoods({
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

// 获取首页配置
router.get(
	'/home',
	catchError(async (req, res) => {
		const result = await homeSrv.getConfig();
		response.json(res, result);
	})
);

export default router;
