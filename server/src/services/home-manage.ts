/*
 * @Author: jianghong.wei
 * @Date: 2019-11-20 16:43:38
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-12-13 11:13:32
 * 首页管理
 */

import * as db_home from '../db/home';

export async function getConfig() {
  return db_home.find();
}

export async function updateConfig(value: Record<string, any>) {
  return db_home.update({}, value);
}
