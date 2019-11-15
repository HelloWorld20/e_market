/*
 * @Author: jianghong.wei
 * @Date: 2019-11-13 18:50:28
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-15 17:55:41
 * 是否登陆判断中间件
 */

import { Request, Response, NextFunction } from "express";
import { ServiceError } from "../modules/error";

// 不用验证的接口
const NO_LOGIN = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout'
]

export default function(req: Request, res: Response, next: NextFunction) {
  if (NO_LOGIN.includes(req.path)) {
    next();
    return;
  }
  if (req.session && req.session.username) {
    next();
    return;
  }
  throw new ServiceError("403", "用户未登陆");
}
