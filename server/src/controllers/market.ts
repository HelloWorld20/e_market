/*
 * @Author: jianghong.wei
 * @Date: 2019-11-09 23:18:08
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-22 10:39:54
 * 业务相关路由定义
 */

import { createRouter, response, catchError } from '../modules';
import { authAdmin } from '../middlewares/auth';
import * as cateSrv from '../services/category';
import * as goodsSrv from '../services/goods';
import * as homeSrv from '../services/home-manage';
const router = createRouter();

// 获取所有分类
router.get(
    '/category',
    authAdmin,
    catchError(async (req, res) => {
        const result = await cateSrv.getCategory();
        res.send(result);
    })
);

// 新增或修改菜单
router.post(
    '/category',
    authAdmin,
    catchError(async (req, res) => {
        const { name, id, preority } = req.body;
        const result = await cateSrv.addOrUpdate({ name, id, preority });
        res.send(result);
    })
);
// 删除指定分类
router.delete(
    '/category',
    authAdmin,
    catchError(async (req, res) => {
        const { id } = req.query;
        const result = await cateSrv.delCategory(id);
        res.send(result);
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
            isRecommend,
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
                : undefined,
        });
        res.send(result);
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
            isRecommend,
        } = req.body;
        const result = goodsSrv.addOrUpdateGoods({
            id,
            name,
            desc,
            prise,
            unit,
            category,
            images,
            totalNum,
            restNum,
            isRecommend,
        });
        res.send(result);
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
        res.send(result);
    })
);
// 获取首页配置
router.get(
    '/home',
    authAdmin,
    catchError(async (req, res) => {
        const result = await homeSrv.getConfig();
        res.send(result[0]);
    })
);
// 更新首页配置
router.post(
    '/home',
    authAdmin,
    catchError(async (req, res) => {
        const { carousel } = req.body;
        const result = await homeSrv.updateConfig({ carousel });
        res.send(result);
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
        res.send(result);
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
        res.send(result);
    })
);

export default router;
