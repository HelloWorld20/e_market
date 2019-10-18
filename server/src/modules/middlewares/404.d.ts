import { Request, Response, NextFunction } from 'express';
/**
 * 404 Not Found 中间件
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export default function (req: Request, res: Response, next: NextFunction): void;