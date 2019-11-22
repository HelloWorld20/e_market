/*
 * @Author: jianghong.wei
 * @Date: 2019-11-22 17:51:01
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-22 18:51:56
 * H5用户相关服务
 */

import * as config from '../modules/config';
import { ServiceError } from '../modules';
import * as db_order from '../db/order';
import { Request } from 'express';

/**
 * 添加地址
 * @param openid openid
 * @param params
 * @param params.orderName  配送姓名
 * @param params.orderPhone 配送手机号
 * @param params.orderAddr  配送地址
 */
export const addAddr = (
    openid: string,
    params: {
        orderName: string;
        orderPhone: number;
        orderAddr: string;
    }
) => {};

// 获取所有配送地址
export const getAddr = (openid: string) => {};
