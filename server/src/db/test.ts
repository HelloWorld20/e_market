import mongo from "../modules/mongodb";
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const model = { age: Number, name: String };
const schema = new mongoose.Schema(model);
// const value = { age: 10, name: "save" };
const collection = "temp";

export const insert = async (value: any) => {
  return mongo.insert(collection, schema, value);
};

export const find = async (condition?: any) => {
  return mongo.find(collection, schema, condition);
};

export const del = async (condition: any) => {
  return mongo.del(collection, schema, condition);
};

export const update = async (condition: any, value: Record<string, any>) => {
  return mongo.update(collection, schema, condition, value);
};
