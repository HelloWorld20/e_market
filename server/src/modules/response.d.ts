/**
 * 请求响应工具函数
 * @author luoying
 * @since 17/08/24
 */
import { Request, Response } from 'express';
import { ServiceError } from './error';
/**
 * 渲染指定页面视图
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {string} view 页面视图
 * @param {*} data 需要渲染到页面视图上的模板数据
 */
export declare function render(req: Request, res: Response, view: string, data: any): void;
/**
 * 响应JSON请求
 * @param  {Response} res  响应对象
 * @param  {any} data              响应数据
 */
export declare function json(res: Response, data: any): void;
/**
 * 响应JSONP请求
 * @param  {Response} res  响应对象
 * @param  {any} data              响应数据
 */
export declare function jsonp(res: Response, data: any): void;
/**
 * 错误响应（JSON数据结构）
 * @param  {Response} res 响应对象
 * @param  {ServiceError} err            错误对象（包装对象）
 */
export declare function error(res: Response, err: ServiceError): void;
/**
 * 重定向请求
 * @param  {Response} res         响应对象
 * @param  {string} url                   重定向地址
 * @param  {number} [status=302]          重定向响应码，默认302，可以指定301、307
 */
export declare function redirect(res: Response, url: string, status?: number): void;
/**
 * 重定向请求
 * 替换原url中的内容，改变为新url
 * @param  {Request} req          请求对象
 * @param  {Response} res         响应对象
 * @param  {RegExp} reg                   替换正则表达式
 * @param  {string} replaceValue          替换内容
 */
export declare function replace(req: Request, res: Response, reg: RegExp, replaceValue: string): void;
