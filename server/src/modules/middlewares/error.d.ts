import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ServiceError } from '../error';
/**
 * 错误处理中间件
 * @param {ErrorRequestHandler} [errorHandler] 自定义错误处理中间件
 * @returns {ErrorRequestHandler}
 */
export default function (errorHandler?: ErrorRequestHandler): (err: ServiceError, req: Request, res: Response, next: NextFunction) => void;
