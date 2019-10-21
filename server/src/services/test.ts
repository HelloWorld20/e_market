import Redis from "../modules/redis";
import * as config from '../modules/config';
const redisConfig = config.get('redis.app');
const redisIns = new Redis(redisConfig);

export async function getRedis(key: string) {
  return redisIns.get(key);
}

export async function setRedis(key: string, value: string) {
  console.log('redisInsredisInsredisIns', redisIns.set)
  redisIns.set(key, value);
  return value;
}

export async function getMongo(key: string) {
  return "";
}

export async function setMongo(key: string, value: string) {
  return value;
}
