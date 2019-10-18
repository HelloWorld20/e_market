/**
 * 404 Not Found 中间件
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
// const error_1 = require("../error");
import * as error_1 from "../error";

export default (req: any, res: any, next: any) => {
  const err = new error_1.ServiceError(
    "service_code_1.default.SYSTEM",
    "error_code_1.default.NOT_FOUND",
    "Not Found"
  );
  next(err);
};
