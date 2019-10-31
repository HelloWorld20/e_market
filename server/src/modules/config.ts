import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";
// const localConfig = require("../../../var/server.config.json");

const localConfig = (function() {
  if (process.env.NODE_ENV === "development") {
    return loadJSON("../../../var/server.config.json");
  }
  return loadJSON(path.resolve(__dirname, "../../../server.config.json"));
})();

// const defaultConfig = require('./server.config.json');
const defaultConfig = require("./server.config.json");

const config = _.merge(defaultConfig, localConfig);

function loadJSON(filename: string) {
  try {
    const content = fs.readFileSync(filename, "utf8");
    return JSON.parse(content);
  } catch (error) {
    return {};
  }
}

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
