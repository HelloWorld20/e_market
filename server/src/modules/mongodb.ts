import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

// mongoose.connect('mongodb://用户名:密码@127.0.0.1:27017/数据库名称')
const DB_URL = "mongodb://192.168.99.100:27017";

/**
 * 连接异常
 */
mongoose.connection.on("error", function(err: any) {
  console.log("Mongoose connection error: " + err);
});

/**
 * 连接断开
 */
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose connection disconnected");
});

class Mongo {
  constructor() {
    /**
     * 连接
     */
    mongoose.connect(DB_URL, err => {
      if (err) {
        this.isConnected = false;
        console.log("Mongoose connection error: " + err);
      } else {
        this.isConnected = true;
        console.log("Mongoose connection open to " + DB_URL);
      }
    });
  }
  // 条件查询或者查询所有
  find(collection: string, schema: any, condition?: Record<string, any>) {
    const Model = mongoose.model(collection, schema);
    if (condition) {
      return Model.find(condition);
    } else {
      return Model.find();
    }
  }
  // 插入一个
  insert(collection: string, schema: any, value: Record<string, any>) {
    const Model = mongoose.model(collection, schema);
    //使用链式写法
    return new Model(value).save();
  }
  // 更新一个
  update(
    collection: string,
    schema: any,
    condition: Record<string, any>,
    value: Record<string, any>
  ) {
    const Model = mongoose.model(collection, schema);
    return Model.updateOne(condition, value);
  }
  // 删除所有
  del(collection: string, schema: any, condition: Record<string, any>) {
    const Model = mongoose.model(collection, schema);
    return Model.remove(condition);
  }

  private isConnected = false;
}

export default new Mongo();
