import * as _ from 'lodash';
const localConfig = require("../../../var/server.config.json");

const defaultConfig = require('./server.config.json');

const config = _.merge(defaultConfig, localConfig);

function getInternally(conf: any, key: any) {
  const keys = key.split(".");
  let result = conf;
  for (const k of keys) {
    result = result[k];
    if (result == null) return null;
  }
  return result;
}

export function get(key: string) {
  return getInternally(config, key);
}
