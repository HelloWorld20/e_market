import { createRouter, response, catchError } from '../modules';
import * as authSrv from '../services/auth';
const router = createRouter();
// 微信服务器认证
router.get(
    '/wechatServerValid',
    catchError(async (req, res, next) => {
        res.send('wechatServerValid closed');
        // const { signature, timestamp, nonce, echostr } = req.query;
        // const result = await authSrv.wechatServerValid(signature, timestamp, nonce);
        // res.send(result ? echostr : 'valid error')
    })
);

// 工作台授权认证
router.post(
    '/login',
    catchError(async (req, res, next) => {
        const { username, password } = req.body;
        const result = await authSrv.login(req, username, password);
        res.send(result);
    })
);

router.post(
    '/register',
    catchError(async (req, res, next) => {
        const { username, password } = req.body;
        const result = await authSrv.register(username, password);
        res.send(result);
    })
);

router.post(
    '/logout',
    catchError(async (req, res, next) => {
        const result = await authSrv.logout(req);
        res.send(result);
    })
);


export default router;
