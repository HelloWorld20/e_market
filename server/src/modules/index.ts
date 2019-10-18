// const router_1 = require("./router");
// exports.createRouter = router_1.createRouter;
// const response = require("./response");
// exports.response = response;

// const error_1 = require("./error");
// exports.ServiceError = error_1.ServiceError;
// exports.catchError = error_1.catchError;

import * as createRouter_ from "./router";
import * as response_ from "./response";
import * as error_1 from "./error";

// export default {
//   createRouter,
//   response,
//   ServiceError: error_1.ServiceError,
//   catchError: error_1.catchError
// };
console.log('createRouter_', createRouter_.createRouter)
export const createRouter = createRouter_.createRouter;
export const response = response_;
export const ServiceError = error_1.ServiceError;
export const catchError = error_1.catchError;
