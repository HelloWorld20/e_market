import { createRouter, response, catchError } from '../modules';
import * as userSrv from '../services/user';
import { authH5 } from '../middlewares/auth';
const router = createRouter();

// 获取首页配置
router.get(
	'/addr',
	authH5,
	catchError(async (req, res) => {
		const result = await userSrv.getAddr(req);
		res.send(result[0]);
	})
);

router.get(
	'/cart',
	authH5,
	catchError(async (req, res) => {
		const result = await userSrv.getCart(req);
		res.send(result);
	})
);

router.post(
	'/cart',
	authH5,
	catchError(async (req, res) => {
		const { number, goodsId } = req.body;
		const result = await userSrv.addOrUpdateCart(
			req,
			Number(goodsId),
			number === undefined ? undefined : Number(number)
		);
		res.send(result);
	})
);

router.delete(
	'/cart',
	authH5,
	catchError(async (req, res) => {
		const { goodsId } = req.query;
		const result = await userSrv.delCart(req, Number(goodsId));
		res.send(result);
	})
);

export default router;
