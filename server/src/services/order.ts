/*
 * @Author: jianghong.wei
 * @Date: 2019-11-22 16:16:19
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-22 18:49:41
 * 订单服务
 */

import * as config from '../modules/config';
import { ServiceError } from '../modules';
import * as db_order from '../db/order';
import { Request } from 'express';

// 创建订单
export const createOrder = (openid: string) => {
    // 获取用户信息
    // 用户信息里获取购物车信息
    // 创建订单
    // 清空购物车
    // 推送通知
    // 返回订单详情
};

// 把订单状态从0更新到1。即从下单到支付状态。
export const update2Payed = (orderId: Number, payId: String) => {};

/**
 * 更新订单信息，只能递增更新，不能通过这个方法把状态从0 =》 1
 * @param orderId  // 订单id，不是数据库用的id，是前端可见的id
 * @param phone   送货人电话
 */
const updateOrder = (orderId: Number, phone?: number) => {};

// 查询订单
export const getOrder = (params: {
    pageNo: Number;
    pageSize: Number;
    state?: 0 | 1 | 2 | 3 | 4; // 订单状态 0：未支付；1：已支付；2：商家接单；3：正在配送；4：配送完成
    userId?: Number;
    startTime?: String; // 条件查询，开始时间
    endTime?: String; // 结束时间
    userPhone?: Number; // 用户手机号
    userName?: String; // 用户姓名
    deleverPhone?: Number; // 配送人电话
}) => {};

// 根据id返回订单数据
export const getOrderById = (id: Number) => {};
