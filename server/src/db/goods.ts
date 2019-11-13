/*
 * 商品交互
 * @Author: jianghong.wei
 * @Date: 2019-11-05 14:50:37
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-13 19:22:58
 */

import mongo from "../modules/mongodb";
import * as mongoose from "mongoose";

const model = {
  createTime: String,
  updateTime: String,
  id: Number,
  desc: String, // 商品描述
  category: Number, // 所属分类
  images: [],  // 商品图片
  name: String, // 商品名称
  prize: String,  // 单价
  totalNum: Number, // 总库存
  restNum: Number,  // 剩余库存
  unit: String  // 单位
};
const schema = new mongoose.Schema(model);

const COLLECTION = "goods";

export const insert = async (value: any) => {
  return mongo.insert(COLLECTION, schema, value);
};

export const find = async (condition?: any) => {
  return mongo.find(COLLECTION, schema, condition);
};

export const del = async (condition: any) => {
  return mongo.del(COLLECTION, schema, condition);
};

export const update = async (condition: any, value: Record<string, any>) => {
  return mongo.update(COLLECTION, schema, condition, value);
};
