import mongo from '../modules/mongodb';
import * as mongoose from 'mongoose';

const model = {
	name: String,
    id: String,
    images: [],  // 商品图片
	createTime: String,
	updateTime: String,
	preority: Number
};
const schema = new mongoose.Schema(model);
const COLLECTION = 'category'; // collection是config，则对应的库是configs

export const insert = async (value: any) => {
	return mongo.insert(COLLECTION, schema, value);
};

export const find = async () => {
	return mongo.find(COLLECTION, schema);
};
export const findSort = async (sort: Record<string, any>) => {
	mongo.find(COLLECTION, schema).sort({ preority: -1 });
};
export const del = async (condition: any) => {
	return mongo.del(COLLECTION, schema, condition);
};

export const update = async (condition: any, value: Record<string, any>) => {
	return mongo.update(COLLECTION, schema, condition, value);
};
