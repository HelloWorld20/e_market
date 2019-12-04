// const config = require('./config');
// const COS = require('cos-nodejs-sdk-v5')
import * as config from './config'
import * as COS from 'cos-nodejs-sdk-v5';

const cos_conf = config.get('cos');

var cos = new COS({
  SecretId: cos_conf.SecretId,
  SecretKey: cos_conf.SecretKey,
});
// 分片上传
export const upload = function (filePath: string, fileName: string) {
  if (!filePath || !fileName) return;
  return new Promise((resolve, reject) => {
    cos.sliceUploadFile({
      Bucket: cos_conf.Bucket.market, // Bucket 格式：test-1250000000
      Region: cos_conf.Region,
      Key: `/cos/${fileName}`,
      FilePath: filePath
    }, function (err: any, data: any) {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  })
}

