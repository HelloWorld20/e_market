/**
 * 渲染指定页面视图
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {string} view 页面视图
 * @param {*} data 需要渲染到页面视图上的模板数据
 */
export function render(req: any, res: any, view: any, data: any) {
    res.render(view, Object.assign({}, data));
}
// exports.render = render;
/**
 * 响应JSON请求
 * @param  {Response} res  响应对象
 * @param  {any} data              响应数据
 */
export function json(res: any, data: any) {
    res.json({
        success: true,
        statuscode: 200,
        errorcode: 0,
        errormsg: null,
        data,
    });
}
// exports.json = json;
/**
 * 响应JSONP请求
 * @param  {Response} res  响应对象
 * @param  {any} data              响应数据
 */
export function jsonp(res: any, data: any) {
    res.jsonp({
        success: true,
        statuscode: 200,
        errorcode: 0,
        errormsg: null,
        data,
    });
}
// exports.jsonp = jsonp;
/**
 * 错误响应（JSON数据结构）
 * @param  {Response} res 响应对象
 * @param  {ServiceError} err            错误对象（包装对象）
 */
export function error(res: any, err: any) {
    const status = err.status || 'ERROR_CODE.INTERNAL_SERVER_ERROR';
    res.status(status).send({
        success: false,
        statuscode: status,
        nativecode: err.nativeCode,
        errorcode: err.code,
        errormsg: err.message || '服务器错误',
        errorstack: err.stack,
        data: null,
    });
}
// exports.error = error;
/**
 * 重定向请求
 * @param  {Response} res         响应对象
 * @param  {string} url                   重定向地址
 * @param  {number} [status=302]          重定向响应码，默认302，可以指定301、307
 */
export function redirect(res: any, url: any, status = 302) {
    res.redirect(status, url);
}
// exports.redirect = redirect;
/**
 * 重定向请求
 * 替换原url中的内容，改变为新url
 * @param  {Request} req          请求对象
 * @param  {Response} res         响应对象
 * @param  {RegExp} reg                   替换正则表达式
 * @param  {string} replaceValue          替换内容
 */
export function replace(req: any, res: any, reg: any, replaceValue: any) {
    const url = req.originalUrl.replace(reg, replaceValue);
    res.redirect(301, url);
}
// exports.replace = replace;
//# sourceMappingURL=response.js.map