import * as db_cate from '../db/category';
const Hashids = require('hashids/cjs');

const hashids = new Hashids('category salt', 10);

// 获取所有分类
export async function getCategory() {
	return db_cate.find();
}
// 新增或更新分类。如果有id，则更新
export async function addOrUpdate(opts: {
	name: string;
	id?: string;
    preority: number;
    images?: Array<string>;
}) {
	let value: any = {
		updateTime: new Date().getTime(),
		...opts
	};
	if (opts.id) {
		// 已有id的情况
		return db_cate.update(
			{
				id: opts.id
			},
			value
		);
	} else {
		// 没有id的情况
		value.createTime = new Date().getTime();
		value.id = hashids.encode(new Date().getTime());

		return db_cate.insert(value);
	}
}
// 删除指定分类
export async function delCategory(id: number) {
	return db_cate.del({ id });
}
