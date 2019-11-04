import mongo from "../modules/mongodb";
import * as mongoose from "mongoose";

const model = { version: String, timestamp: Number };
const schema = new mongoose.Schema(model);
// const value = { age: 10, name: "save" };
const COLLECTION = "config";

// export const insert = async (value: any) => {
//   return mongo.insert(collection, schema, value);
// };

export const find = async () => {
  return mongo.find(COLLECTION, schema);
};

// export const del = async (condition: any) => {
//   return mongo.del(collection, schema, condition);
// };

// export const update = async (condition: any, value: Record<string, any>) => {
//   return mongo.update(collection, schema, condition, value);
// };
