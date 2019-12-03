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
	catchError(async (req, res) => {
		const result = await userSrv.getUserInfo(req);
		response.json(res, result);
	})
);

router.get(
	'/cart',
	authH5,
	catchError(async (req, res) => {
		const result = await userSrv.getCart(req);
		response.json(res, result);
	})
);
// 修改购物车信息
router.post(
	'/cart',
	authH5,
	catchError(async (req, res) => {
		const { goodsId } = req.query;
		const { number } = req.body;
		const result = await userSrv.addOrUpdateCart(
			req,
			goodsId,
			number === undefined ? undefined : Number(number)
		);
		response.json(res, result);
	})
);

router.delete(
	'/cart',
	authH5,
	catchError(async (req, res) => {
		const { goodsId } = req.query;
		if (goodsId) {
			// 删除指定购物车
			const result = await userSrv.delCart(req, goodsId);
			response.json(res, result);
		} else {
			// 清空购物车
			const result = await userSrv.clearCart(req);
			response.json(res, result);
		}
	})
);

router.get(
	'/address',
	authH5,
	catchError(async (req, res) => {
		const result = await userSrv.getAddr(req);
		response.json(res, result);
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
			id
		);
		response.json(res, result);
	})
);

router.delete(
	'/address',
	authH5,
	catchError(async (req, res) => {
		const { addrId } = req.query;
		const result = await userSrv.delAddr(req, addrId);
		response.json(res, result);
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
		response.json(res, result);
	})
);

// 创建订单
router.put(
	'/order',
	authH5,
	catchError(async (req, res) => {
		const { addrId, desc } = req.body;
		const result = await orderSrv.createOrder(req, addrId, desc);
		response.json(res, result);
	})
);
// 关闭订单
router.delete(
	'/order',
	authH5,
	catchError(async (req, res) => {
		const { addrId } = req.query;
		const result = await orderSrv.disableOrder(req, addrId);
		response.json(res, result);
	})
);

export default router;
