/*
 * @Author: jianghong.wei
 * @Date: 2019-11-13 19:04:24
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-13 19:18:53
 * 商品管理
 */
import * as config from "../modules/config";
import { ServiceError } from "../modules";
import * as db_goods from "../db/goods";
import { Request } from 'express'

export const getGoods = (params: {
  pageNo: number, // 页码
  pageSize?: number,  // 页数
  name?: string,  // 商品名称
  maxPrize?: number,  // 价格范围
  minPrize?: number,  // 价格范围
  updateTime?: string, // 更新时间
  createTime?: string, // 创建时间
  rest?: number  // 库存
}) => {

}

export const addOrUpdateGoods = () => {

}

export const delGoods = () => {

}
