/*
 * 商品交互
 * @Author: jianghong.wei
 * @Date: 2019-11-05 14:50:37
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-05 14:52:53
 */

import mongo from "../modules/mongodb";
import * as mongoose from "mongoose";

const model = { age: Number, name: String };
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
