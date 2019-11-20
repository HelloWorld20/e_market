/*
 * @Author: jianghong.wei
 * @Date: 2019-11-13 19:04:24
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-20 14:35:24
 * 商品管理
 */
import { ServiceError } from '../modules';
import * as db_goods from '../db/goods';

export const getGoods = async (params: {
    pageNo: number; // 页码
    pageSize: number; // 页数
    name?: string; // 商品名称
    maxPrise?: number; // 价格范围
    minPrise?: number; // 价格范围
    updateTime?: string; // 更新时间
    createTime?: string; // 创建时间
    rest?: number; // 库存
    category?: number; // 分类
}) => {
    const totalPromise = db_goods.find({ status: 1 }).count();
    let condition: Array<any> = [
        { $sort: { id: 1 } }, // 顺序
        { $match: { status: 1 } }, // 只选上架
        { $skip: params.pageNo * params.pageSize }, // 页码
        { $limit: params.pageSize }, // 页数
    ];
    // 分类查询
    const category = Number(params.category);
    if (category && category > 0) {
        condition.push({ $match: { category: category } });
    }
    // 价格范围查询
    const maxPrise = params.maxPrise && Number(params.maxPrise);
    const minPrise = params.minPrise && Number(params.minPrise);
    if (minPrise) {
        condition.push({ $match: { prise: { $gte: minPrise } } });
    }
    if (maxPrise) {
        condition.push({ $match: { prise: { $lte: maxPrise } } });
    }
    // 名字查询
    if (params.name) {
        condition.push({ $match: { name: new RegExp(params.name) } });
    }
    const dataPromise = db_goods.findAggregate(condition);

    const [total, data] = await Promise.all([totalPromise, dataPromise]);

    return {
        data,
        total,
    };
};

export const addOrUpdateGoods = async (params: {
    id?: number;
    name?: string;
    desc?: string;
    prise?: number;
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
        ...params,
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

export const delGoods = async (ids: Array<Number>) => {
    ids = ids.map(v => Number(v));
    return db_goods.getModal().updateMany({ id: { $in: ids } }, { status: -1 });
};
