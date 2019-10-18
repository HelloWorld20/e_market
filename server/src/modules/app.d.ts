import { Application, Router, RequestHandler, ErrorRequestHandler } from 'express';
export interface AppSettings {
    /**
     * 业务方定义的路由列表
     * @type {(Record<string, Router | RequestHandler>)}
     * @memberof AppSettings
     */
    readonly routes?: Record<string, Router | RequestHandler>;
    /**
     * 业务方扩展的中间件
     * @type {RequestHandler[]}
     * @memberof AppSettings
     */
    readonly middlewares?: RequestHandler[];
    /**
     * 业务方定义的模板视图所在目录路径
     * @type {string}
     * @memberof AppSettings
     */
    readonly views?: string;
    readonly styleRules?: string;
    /**
     * 业务方定义的错误捕捉器，可以自行渲染错误页面
     * @type {ErrorRequestHandler}
     * @memberof AppSettings
     */
    readonly errorHandler?: ErrorRequestHandler;
    /**
     * 业务方预中间件
     * @memberof AppSettings
     */
    readonly premiddlewares?: (app: Application) => void;
    readonly middlewareStartHook?: (app: Application) => void;
    readonly middlewareEndHook?: (app: Application) => void;
}
/**
 * 创建并初始化Express Application
 * @param {Application} app Express Application
 * @param  {AppSettings} settings   App设置项
 * @returns {Application}
 */
export declare function createApp(settings: AppSettings): import("express-serve-static-core").Express;
