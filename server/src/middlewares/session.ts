import * as session from "express-session";
import * as connectRedis from "connect-redis";

import * as config from "../modules/config";
const sessionConfig = config.get("session");
const redisConf = config.get("redis.session");

var redis = require("redis");
var client = redis.createClient({
  port: redisConf.port,
  host: redisConf.host,
  password: redisConf.password
});

const RedisStore = connectRedis(session);

export const createSession = function() {
  const redisStore = new RedisStore({ client });
  return session({ ...sessionConfig, store: redisStore });
};
