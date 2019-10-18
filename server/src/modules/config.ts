let config = {
  NODE_ENV: "production",
  RUNTIME_ENV: "RUNTIME_ENV",
  host: "http://localhost",
  port: 3000
};

function getInternally(conf: any, key: any) {
  const keys = key.split(".");
  let result = conf;
  for (const k of keys) {
    result = result[k];
    if (result == null) return null;
  }
  return result;
}

function get(key: string) {
  return getInternally(config, key);
}

export default {
  get
};
