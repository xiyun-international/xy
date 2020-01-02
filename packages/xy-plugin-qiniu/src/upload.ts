const fs = require('fs');
const path = require('path');
import fileConfig from './config';

async function UploadImage(filePath) {
  console.log(filePath);
  const qiniuConfig = filePath.shift();
  fs.stat(qiniuConfig, function(eror, stats) {
    if (eror) {
      console.warn('请重新选择路径');
    } else {
      var isFile = stats.isFile();
      var isDir = stats.isDirectory();
      if (isFile) {
        if (qiniuConfig.indexOf('qiniuConfig.js') >= 0) {
          const config = fileConfig(
            JSON.parse(fs.readFileSync(qiniuConfig, 'utf-8')),
          );

          // 上传文件
          if (filePath.length === 0) {
            console.log('请选择上传文件');
            return;
          }

          filePath.forEach(file => {
            fs.exists(file, res => {
              if (!res) {
                console.log('目录不存在');
                return false;
              }
              fs.stat(file, function(err, stat) {
                if (err) {
                  throw Error(err);
                  return false;
                }

                if (stat.isDirectory() || !stat.isFile()) {
                  throw Error('请输入要上传的文件路径');
                  return false;
                }
                upload(file, config);
              });
            });
          });
        } else {
          console.log('请输入配置文件qiniuConfig.json的路径');
        }
      }
      if (isDir) {
        console.log('请输入配置文件qiniuConfig.json的路径');
      }
    }
  });
}

function upload(file, config, qiniuFile = '') {
  // console.log(qiniuFile)
  // 上传到服务器的名称,和本地名称保持一致
  var key = file.substring(file.lastIndexOf('/') + 1, file.length);
  const fileType = /\.(png|jpeg|jpg|gif|webp)(\?.*)?$/;
  if (fileType.test(path.extname(file))) {
    // 文件上传
    config.formUploader.putFile(
      config.uploadToken,
      key,
      file,
      config.putExtra,
      function(respErr, respBody, respInfo) {
        if (respErr) {
          throw respErr;
        }
        switch (respInfo.statusCode) {
          case 200:
            console.log(`${file}上传成功`);
            console.log(`下载链接：${config.domain}/${key}`);
            break;
          case 401:
            console.log('认证授权失败');
            break;
          case 403:
            console.log('权限不足，拒绝访问');
            break;
          case 404:
            console.log(`${file}资源不存在`);
            break;
          case 419:
            console.log('用户账号被冻结');
            break;
          case 614:
            console.log(`${key}目标资源已存在`);
            break;
          default:
            console.log(`${file}上传失败`);
            break;
        }
      },
    );
  } else {
    console.log('请选择上传图片');
  }
}

export default UploadImage;
