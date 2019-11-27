import { createRouter, response, catchError } from '../modules';
import * as userSrv from '../services/user-h5';
import { authH5 } from '../middlewares/auth';
const router = createRouter();

// 获取首页配置

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

router.get(
	'/address',
	authH5,
	catchError(async (req, res) => {
		const result = await userSrv.getAddr(req);
		res.send(result);
	})
);

router.post(
	'/address',
	authH5,
	catchError(async (req, res) => {
		const { name, phone, addr, id } = req.body;
		const result = await userSrv.addOrUpdateAddr(req, {
            orderAddr: addr,
            orderPhone: phone,
            orderName: name,
        }, id && Number(id));
		res.send(result);
	})
);

router.delete(
	'/address',
	authH5,
	catchError(async (req, res) => {
		const { goodsId } = req.query;
		const result = await userSrv.delCart(req, Number(goodsId));
		res.send(result);
	})
);

export default router;
