import { Request, Response, NextFunction, RequestHandler } from 'express';
export declare class ServiceError extends Error {
    /**
     * 错误码：服务代码+状态码
     */
    code: string;
    /**
     * 状态码，参照http status code
     */
    status: number;
    nativeCode?: string | number;
    /**
     * 返回包装后的错误对象
     * @param  {string} [service='UNKONWN']    服务代码
     * @param  {ERROR_CODE} [status='500' ]   状态码
     * @param  {string} [msg='未知错误']        状态消息
     * @return {ServiceError}
     */
    constructor(service?: number | string, status?: number | number, msg?: string, nativeCode?: string | number);
}
/**
 * 错误捕捉代理函数
 * @param {RequestHandler} handler 真实的request处理函数
 */
export declare function catchError(handler: RequestHandler): (req: Request, res: Response, next: NextFunction) => Promise<any>;