/*
 * @Author: jianghong.wei
 * @Date: 2019-11-13 19:04:24
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-14 19:33:08
 * 商品管理
 */
import * as config from "../modules/config";
import { ServiceError } from "../modules";
import * as db_goods from "../db/goods";
import { Request } from "express";

export const getGoods = async (params: {
  pageNo: number; // 页码
  pageSize: number; // 页数
  name?: string; // 商品名称
  maxPrise?: number; // 价格范围
  minPrise?: number; // 价格范围
  updateTime?: string; // 更新时间
  createTime?: string; // 创建时间
  rest?: number; // 库存
}) => {
  return db_goods.findAggregate([
    {$sort: {id: 1}},         // 顺序
    {$match: {status: 1}},    // 只选上架
    {$skip: (params.pageNo * params.pageSize)}, // 页码
    {$limit: params.pageSize}   // 页数
  ])
};

export const addOrUpdateGoods = async (params: {
  id?: number;
  name?: string;
  desc?: string;
  prise?: string;
  unit?: string;
  category?: number;
  images?: Array<string>;
  totalNum?: number;
  restNum?: number;
}) => {
  if (Object.keys(params).length <= 0) {
    throw new ServiceError('400', '参数为空');
  }
  var value: any = {
    updateTime: new Date().getTime(),
    ...params
  };
  if (params.id) {
    // 已存在商品的情况
    return db_goods.update({ id: params.id }, value);
  } else {
    // 不存在商品的情况
    value.createTime = new Date().getTime();
    value.status = 1;
    const maxRecord = await db_goods.findMax();
    if (maxRecord.length === 1) {
      value.id = maxRecord[0].id + 1;
    } else {
      // 数据库为空
      value.id = 1;
    }

    return db_goods.insert(value);
  }
};

export const delGoods = (id: Number) => {
  return db_goods.update({ id }, { status: -1 });
};
