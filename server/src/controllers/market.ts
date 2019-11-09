/*
 * @Author: jianghong.wei
 * @Date: 2019-11-09 23:18:08
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-09 23:49:51
 * 业务相关路由定义
 */

import { createRouter, response, catchError } from "../modules";
import * as cateSrv from "../services/category";
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

export default router;
