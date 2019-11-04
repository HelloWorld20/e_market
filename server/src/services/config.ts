import * as config from "../modules/config";
import * as db_config from "../db/config";

export async function getSystemConfig() {
  return db_config.find();
}
