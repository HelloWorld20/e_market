/*
 * @Author: jianghong.wei
 * @Date: 2019-11-20 16:43:38
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-11-20 17:20:23
 * 首页管理
 */

import { ServiceError } from '../modules';
import * as db_home from '../db/home';

export async function getConfig() {
  return db_home.find();
}

export async function updateConfig(value: Record<string, any>) {
  return db_home.update({}, value);
}
