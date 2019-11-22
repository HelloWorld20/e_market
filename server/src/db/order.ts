/*
 * @Author: jianghong.wei
 * @Date: 2019-11-22 17:06:09
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-22 18:28:22
 * 订单数据库
 */

import mongo from '../modules/mongodb';
import * as mongoose from 'mongoose';

const model = {
    id: Number, // 数据库里的id
    orderId: Number, // 订单id，显示给客户的订单id。时间+单子数
    payId: String, // 支付生成的id。根据情况变化变量名
    createTime: String, // 订单创建时间
    updateTime: String, // 更新时间
    payTime: String, // 支付时间
    acceptTime: String, // 商家接单时间
    deleverTime: String, // 开始配送时间
    dealTime: String, // 订单完成时间
    goods: [
        {
            goodsId: Number, // 商品id
            goodsName: String, // 商品名称
            goodsNum: Number, // 商品数量
            goodsUnit: String, // 商品单位
            goodsPrise: Number, // 商品单价
            goodsImage: [], // 商品图片
        },
    ],
    openid: Number, // 用户的openid
    userName: String, // 用户名称
    orderName: String, // 订单上的姓名
    orderPhone: Number, // 订单上的电话号码
    orderAddr: String, // 订单上的地址

    orderGoodsPrise: Number, // 商品总价
    orderDeleverPrise: Number, // 配送费
    orderDescountPrise: Number, // 减免价， 后台修改订单可以配置
    orderPriseAll: String, // 支付总价 = 商品总价 + 配送费 - 减免价
    deleverPhone: Number, // 配送人电话
    status: Number, // 订单状态 0：未支付；1：已支付；2：商家接单；3：正在配送；4：配送完成
    desc: String, // 订单额外描述
};
const schema = new mongoose.Schema(model);

const COLLECTION = 'order'; // collection是config，则对应的库是configs

export const insert = (value: any) => {
    return mongo.insert(COLLECTION, schema, value);
};

export const find = (condition?: any) => {
    return mongo.find(COLLECTION, schema, condition);
};

export const findAggregate = (aggregate: Array<any>) => {
    aggregate.push({ $project: { _id: 0, __v: 0 } });
    const Modal = mongo.getModal(COLLECTION, schema);
    return Modal.aggregate(aggregate);
};

export const del = (condition: any) => {
    return mongo.del(COLLECTION, schema, condition);
};

export const update = (condition: any, value: Record<string, any>) => {
    return mongo.update(COLLECTION, schema, condition, value);
};

export const getModal = () => {
    return mongo.getModal(COLLECTION, schema);
};
