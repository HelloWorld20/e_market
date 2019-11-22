/*
 * @Author: jianghong.wei
 * @Date: 2019-11-22 10:20:11
 * @Last Modified by:   jianghong.wei
 * @Last Modified time: 2019-11-22 10:20:11
 * 公共服务
 */

import { createRouter, response, catchError } from "../modules";
import * as cosSrv from "../services/cos";
const router = createRouter();

router.post(
  "/upload",
  catchError(async (req, res, next) => {
    const result = await cosSrv.upload(req);
    res.send(result);
  })
);

export default router;
