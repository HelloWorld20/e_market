/**
 * 404 Not Found 中间件
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const error_1 = require("../error");
function default_1 (req, res, next) {
    const err = new error_1.ServiceError('service_code_1.default.SYSTEM', 'error_code_1.default.NOT_FOUND', 'Not Found');
    next(err);
}
exports.default = default_1;