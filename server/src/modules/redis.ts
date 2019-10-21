import * as IORedis from "ioredis";

export default class Redis {
  isReady: boolean;
  conf: any;
  name: string;
  client: any;
  constructor(conf: any) {
    this.isReady = false;
    this.conf = conf;
    this.name = conf.alias;
    this.client = this.create(conf);
  }
  create(conf: any) {
    const client = new IORedis(conf.server);
    client.on("connect", () => {
      this.isReady = true;
    });
    client.on("ready", () => {
      this.isReady = true;
    });
    client.on("end", () => {
      this.isReady = false;
    });
    client.on("error", (err: any) => {
      console.error(this.name, err);
      this.isReady = false;
    });
    return client;
  }
  get(key: string) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err: any, result: any) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  set(key: string, value: string) {
    console.log('redis set', key, value)
    this.client.set(key, value);
  }
}
