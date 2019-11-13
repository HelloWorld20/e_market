import { Request, Response, NextFunction } from "express";
import { ServiceError } from "../modules/error";

export default function(req: Request, res: Response, next: NextFunction) {
  if (req.path === '/api/auth/login') {
    next();
    return;
  }
  if (req.session && req.session.username) {
    next();
    return;
  }
  throw new ServiceError("403", "403", "用户未登陆");
}
