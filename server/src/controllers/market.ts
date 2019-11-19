/*
 * @Author: jianghong.wei
 * @Date: 2019-11-09 23:18:08
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-19 18:45:07
 * 业务相关路由定义
 */

import { createRouter, response, catchError } from "../modules";
import * as cateSrv from "../services/category";
import * as goodsSrv from '../services/goods';
const router = createRouter();

// 获取所有分类
router.get(
  "/category",
  catchError(async (req, res) => {
    const result = await cateSrv.getCategory();
    res.send(result)
  })
);

// 新增或修改菜单
router.post(
  "/category",
  catchError(async (req, res) => {
    const { name, id, preority } = req.body;
    const result = await cateSrv.addOrUpdate({ name, id, preority });
    res.send(result)
  })
);
// 删除指定分类
router.delete(
  "/category",
  catchError(async (req, res) => {
    const {id} = req.query;
    const result = await cateSrv.delCategory(id);
    res.send(result)
  })
);

router.get(
  "/goods",
  catchError(async (req, res, next) => {
    const {
      pageNo,
      pageSize,
      name,
      maxPrise,
      minPrise,
      updateTime,
      createTime,
      rest
    } = req.query;
    const result = await goodsSrv.getGoods({
      pageNo,
      pageSize: pageSize || 10,
      name,
      maxPrise,
      minPrise,
      updateTime,
      createTime,
      rest
    });
    res.send(result);
  })
);

router.post(
  "/goods",
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
      restNum
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
      restNum
    });
    res.send(result);
  })
);

router.delete(
  "/goods",
  catchError(async (req, res, next) => {
    const { ids } = req.query;
    console.log(ids.split(','))
    const result = await goodsSrv.delGoods(ids.split(','));
    res.send(result);
  })
);


export default router;
