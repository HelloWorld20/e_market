import { createRouter, response, catchError } from '../modules';
import * as userSrv from '../services/user-h5';
import * as orderSrv from '../services/order';
import { authH5 } from '../middlewares/auth';
import * as _ from 'lodash';
const router = createRouter();

// 获取首页配置

// H5获取用户信息
router.get(
	'/userInfo',
	catchError(async (req, res, next) => {
		const result = await userSrv.getUserInfo(req);
		res.send(result);
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
		const { goodsId } = req.query;
		const { number } = req.body;
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
		const { id } = req.query;
		const { name, phone, addr } = req.body;
		const result = await userSrv.addOrUpdateAddr(
			req,
			{
				orderAddr: addr,
				orderPhone: phone,
				orderName: name
			},
			id && Number(id)
		);
		res.send(result);
	})
);

router.delete(
	'/address',
	authH5,
	catchError(async (req, res) => {
		const { addrId } = req.query;
		const result = await userSrv.delAddr(req, Number(addrId));
		res.send(result);
	})
);
// 查看所有订单（分页？）
router.get(
	'/order',
	authH5,
	catchError(async (req, res) => {
		const { status } = req.query;
		const result = await orderSrv.getOrder(req, {
			status
		});
		res.send(result);
	})
);

// 创建订单
router.put(
	'/order',
	authH5,
	catchError(async (req, res) => {
		const { addrId, desc } = req.body;
		const result = await orderSrv.createOrder(req, addrId, desc);
		res.send(result);
	})
);
// 关闭订单
router.delete(
	'/order',
	authH5,
	catchError(async (req, res) => {
		const { addrId } = req.query;
		const result = await orderSrv.disableOrder(req, addrId);
		res.send(result);
	})
);

export default router;
