/*
 * @Author: jianghong.wei
 * @Date: 2019-11-22 10:38:12
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-22 15:20:47
 * h5端市场controller
 */

import { createRouter, response, catchError } from '../modules';
import { authH5 } from '../middlewares/auth';
import * as cateSrv from '../services/category';
import * as goodsSrv from '../services/goods';
import * as homeSrv from '../services/home-manage';
const router = createRouter();

// 获取所有分类
router.get(
    '/category',
    catchError(async (req, res) => {
        const result = await cateSrv.getCategory();
        res.send(result);
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
                : undefined,
        });
        res.send(result);
    })
);

// 获取首页配置
router.get(
    '/home',
    catchError(async (req, res) => {
        const result = await homeSrv.getConfig();
        res.send(result[0]);
    })
);

export default router;
