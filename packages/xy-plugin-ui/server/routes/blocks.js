const router = require('express').Router();

// 返回 block 组件列表
router.get('/blocks', function(req, res) {
  const rawBlocks = require('../public/blocks-data.json');

  // 处理成标准格式数据(建议修改源数据)
  let blocks = [];
  _.forIn(rawBlocks, (subBlocks, libraryType) => {
    subBlocks.forEach(block => {
      block.libraryType = libraryType;
    });
    blocks.push(...subBlocks);
  });

  // 数据筛选
  const { libraryType, categories, keyword } = req.query.query;
  blocks = _.filter(blocks, block => {
    const flag =
      // 组件库类型
      block.libraryType === libraryType &&
      // 功能类别
      (!categories ||
        !categories.length ||
        _.intersection(block.categories, categories).length) &&
      // 关键字 title
      (!keyword ||
        !keyword.length ||
        _.intersection(block.title.split(''), keyword.split('')).length);
    return flag;
  });

  // 数据分页
  const { current, pageSize } = req.query.pagination;
  const blocksGroups = _.chunk(blocks, +pageSize);
  const resultData = blocksGroups[+current - 1];

  res.send({
    data: resultData,
    pagination: {
      total: blocks.length,
    },
  });
});

// 让工作区下载 block 组件
router.post('/download-block', async function(req, res) {
  const { name: blockName, repository } = req.body;

  const containerDir = 'blocks';

  if (fs.existsSync(path.resolve(process.cwd(), containerDir, blockName))) {
    res.status(500);
    res.send('区块已经存在 !!!');

    return;
  }

  socket.emit('task-info', `正在下载: ${blockName} 到当前项目......`);

  await new Promise((resolve, reject) => {
    const child_process = require('child_process');

    const workerProcess = child_process.exec(
      `xy block ${repository} --path ./${containerDir}/${blockName}`,
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
      resolve();
    });
  })
    .then(() => {
      res.send('下载成功');
    })
    .catch(err => {
      console.log(err, 'err');
      res.status(500);
      res.send('下载失败');
    });
});

module.exports = router;
