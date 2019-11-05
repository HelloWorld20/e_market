const config = require('./config');
const COS = require('cos-nodejs-sdk-v5')

const cos_conf = config.get('cos');

var cos = new COS({
  SecretId: cos_conf.SecretId,
  SecretKey: cos_conf.SecretKey,
});
// 分片上传
const upload = function (filePath, fileName) {
  if (!filePath || !fileName) return;
  return new Promise((resolve, reject) => {
    cos.sliceUploadFile({
      Bucket: cos_conf.Bucket, // Bucket 格式：test-1250000000
      Region: cos_conf.Region,
      Key: `/cos/${fileName}`,
      FilePath: filePath
    }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  })
}
module.exports = {
  upload
}
