import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as config from "./config";
import _404 from "./middlewares/404";
import _error from "./middlewares/error";

const path = require("path");

const NODE_ENV = config.get("NODE_ENV");
const RUNTIME_ENV = config.get("RUNTIME_ENV");
const ALLOW_ORIGINS = config.get("allowOrigins")

export function createApp(settings: any) {
  const app = express();
  const {
    routes = {},
    middlewares = [],
    premiddlewares,
    views = "./views",
    middlewareStartHook,
    middlewareEndHook
  } = settings;

  // 初始化预中间件
  if (premiddlewares) premiddlewares(app);

  // app.set('views', views);
  app.set("view engine", "ejs");
  // 同时也支持将html文件作为ejs模板来渲染
  // app.engine('html', ejs.renderFile);
  // app.set("host", host);
  // app.set("port", port);

  app.set("NODE_ENV", NODE_ENV);
  app.set("RUNTIME_ENV", RUNTIME_ENV);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  if (middlewareStartHook) middlewareStartHook(app);

  app.all("*", function(req, res, next) {
    if (typeof(req.headers.origin) === 'string') {
      if (ALLOW_ORIGINS.includes(req.headers.origin)) {
        res.set('Access-Control-Allow-Credentials', 'true');
        res.set('Access-Control-Allow-Origin', req.headers.origin)
      }
    }
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", "292701515@qq.com");
    if (req.method == "OPTIONS") res.send(200);
    /*让options请求快速返回*/ else next();
  });
  // 捕捉favicon错误
  app.get("/favicon.ico", (req, res) => res.status(204));
  // 加载静态文件，加载前端页面，只有线上生效
  app.use("/pages", express.static(path.resolve(__dirname, "../../html")));
  app.use("/admin", express.static(path.resolve(__dirname, "../../html-admin")));
  // use all middlewares
  for (const middleware of middlewares) {
    if (typeof middleware !== "function") continue;
    app.use(middleware);
  }
  // use all routes
  for (const route in routes) {
    const handle = routes[route];
    if (typeof handle !== "function") continue;
    app.use(route, handle);
  }
  if (middlewareEndHook) middlewareEndHook(app);

  app.use(_404);

  // app.use(_error(settings.errorHandler));

  return app;
}
