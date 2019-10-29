const router = require('express').Router();

/**
 * 获取工作区所有的依赖包
 */
router.get('/all-dependencies', function(req, res) {
  fs.readFile(
    path.resolve(process.cwd(), 'package.json'),
    'utf-8',
    (err, data) => {
      if (err) {
        res.send({
          errMsg: '没有package.json 文件,请先执行 npm init',
        });
      } else {
        const json = JSON.parse(data);
        res.send({
          list: _.pick(json, ['dependencies', 'devDependencies']),
        });
      }
    },
  );
});

/**
 * 让工作区安装一个npm包
 */
router.post('/add-dependency', async function(req, res) {
  console.log(process.cwd(), 'process.cwd() add-dep');

  const { dependencies } = req.body;
  // console.log(dependencies,'dependencies')

  const dependenciesStr = dependencies.join(' ');
  socket.emit('task-info', `正在安装: ${dependenciesStr} ......`);

  await new Promise((resolve, reject) => {
    const child_process = require('child_process');
    const workerProcess = child_process.exec(
      `npm install ${dependenciesStr}`,
      {
        // 指定一下执行环境, 便于开发测试
        cwd: process.cwd(),
      },
      function(error, stdout, stderr) {
        if (error) {
          console.log('error ----', error);
          reject();
        }
        console.log('stdout ---- ' + stdout);
        socket.emit('task-finish', stdout);

        console.log('stderr ---- ' + stderr.message);
      },
    );

    workerProcess.on('exit', function(code) {
      // console.log('子进程已退出，退出码 ' + code);
      resolve();
    });
  })
    .then(() => {
      res.send('安装成功');
    })
    .catch(err => {
      console.log(err, 'err');
      res.sendStatus(500);
      res.send(err);
    });
});

module.exports = router;
