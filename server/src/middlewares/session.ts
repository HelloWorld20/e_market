import * as session from "express-session";
import * as connectRedis from "connect-redis";
var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');
import * as config from "../modules/config";
const sessionConfig = config.get("session");

const RedisStore = connectRedis(session);

export const createSession = function() {
  const redisStore = new RedisStore({client});
  return session({...sessionConfig, store: redisStore});
};
