/*
 * 商品交互
 * @Author: jianghong.wei
 * @Date: 2019-11-05 14:50:37
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-23 17:58:38
 */

import mongo from "../modules/mongodb";
import * as mongoose from "mongoose";

const model = {
  createTime: String,
  updateTime: String,
  id: Number,
  name: String, // 商品名称
  desc: String, // 商品描述
  prise: Number,  // 单价
  unit: String,  // 单位
  category: Number, // 所属分类
  images: [],  // 商品图片
  totalNum: Number, // 总库存
  restNum: Number,  // 剩余库存
  status: Number,  // 状态 -1: 不显示，1显示
  isRecommend: Boolean  // 是否是推荐商品
};
const schema = new mongoose.Schema(model);

const COLLECTION = "goods";

export const insert = (value: any) => {
  return mongo.insert(COLLECTION, schema, value);
};

export const find = (condition?: any) => {
  return mongo.find(COLLECTION, schema, condition);
};

export const findAggregate = (aggregate: Array<any>) => {
  aggregate.push({$project: {_id: 0, __v: 0}})
  const Modal = mongo.getModal(COLLECTION, schema);
  return Modal.aggregate(aggregate);
}

export const del = (condition: any) => {
  return mongo.del(COLLECTION, schema, condition);
};

export const update = (condition: any, value: Record<string, any>) => {
  return mongo.update(COLLECTION, schema, condition, value);
};

export const findMax = () => {
  const Modal = mongo.getModal(COLLECTION, schema);
  return Modal.aggregate([{$sort:{id: -1}}, {$limit: 1}])
}

export const getModal = () =>{
  return mongo.getModal(COLLECTION, schema);
};
