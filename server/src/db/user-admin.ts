/*
 * @Author: jianghong.wei
 * @Date: 2019-11-13 11:58:20
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-22 17:33:21
 * 工作台用户登陆
 */

import mongo from "../modules/mongodb";
import * as mongoose from "mongoose";

const model = { username: String, password: String };
const schema = new mongoose.Schema(model);

const COLLECTION = "userAdmin";

export const insert = async (value: any) => {
  return mongo.insert(COLLECTION, schema, value);
};

export const find = async (condition?: any) => {
  return mongo.find(COLLECTION, schema, condition);
};
