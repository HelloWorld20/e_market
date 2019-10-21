import * as config from '../modules/config';
const sha1 = require("sha1");

const WECHAT_VALID_TOCKEN = config.get('wechat.valid_tocken');
/**
 * 接入微信公众平台接口
 * @param signature 
 * @param timestamp 
 * @param nonce 
 */
export async function wechatServerValid(
  signature: string,
  timestamp: string,
  nonce: string
) {
  const tmpArr = [nonce, timestamp, WECHAT_VALID_TOCKEN];
  const tmpStr = sha1(tmpArr.join(""));
  return tmpStr === signature;
}
