const fs = require('fs');

function checkFile(file: string): any {
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

      return true;
    });
  });
}

export default checkFile;
