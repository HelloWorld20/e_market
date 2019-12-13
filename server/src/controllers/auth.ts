import { createRouter, response, catchError } from '../modules';
import * as authSrv from '../services/auth';
import * as config from '../modules/config';

const isWechatServerValid = config.get('wechatServerValid');
const router = createRouter();
// 微信服务器认证
router.get(
	'/wechatServerValid',
	catchError(async (req, res) => {
		if (isWechatServerValid) {
			const { signature, timestamp, nonce, echostr } = req.query;
			const result = await authSrv.wechatServerValid(
				signature,
				timestamp,
				nonce
			);
			res.send(result ? echostr : 'valid error');
		} else {
			res.send('wechatServerValid closed');
		}
	})
);

// 工作台授权认证
router.post(
	'/login',
	catchError(async (req, res) => {
		const { username, password } = req.body;
		const result = await authSrv.login(req, username, password);
		response.json(res, result);
	})
);

router.post(
	'/register',
	catchError(async (req, res) => {
		const { username, password } = req.body;
		const result = await authSrv.register(username, password);
		response.json(res, result);
	})
);

router.post(
	'/logout',
	catchError(async (req, res) => {
		const result = await authSrv.logout(req);
		response.json(res, result);
	})
);

export default router;
