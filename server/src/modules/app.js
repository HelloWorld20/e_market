import express from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import config from '../modules/config'
import _404 from './middlewares/404'
import _error from './middlewares/error'

const NODE_ENV = config.get('NODE_ENV');
const RUNTIME_ENV = config.get('RUNTIME_ENV');
const host = 'http://localhost'
const port = '4000'

function createApp(settings) {
    const app = express();
    const { routes = {}, middlewares = [], premiddlewares, views = './views', middlewareStartHook, middlewareEndHook, } = settings;

    // 初始化预中间件
    if (premiddlewares)
        premiddlewares(app);

    // app.set('views', views);
    app.set('view engine', 'ejs');
    // 同时也支持将html文件作为ejs模板来渲染
    // app.engine('html', ejs.renderFile);
    app.set('host', host);
    app.set('port', port);

    app.set('NODE_ENV', NODE_ENV);
    app.set('RUNTIME_ENV', RUNTIME_ENV);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    if (middlewareStartHook)
        middlewareStartHook(app);
    // use all middlewares
    for (const middleware of middlewares) {
        if (typeof middleware !== 'function')
            continue;
        app.use(middleware);
    }
    // use all routes
    for (const route in routes) {
        const handle = routes[route];
        if (typeof handle !== 'function')
            continue;
        app.use(route, handle);
    }
    if (middlewareEndHook)
        middlewareEndHook(app);


    app.use(_404.default);

    // app.use(_error(settings.errorHandler));

    return app;
}

exports.createApp = createApp;