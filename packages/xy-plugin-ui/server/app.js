module.exports = function(app) {
  const express = require('express');

  // 全局变量
  require('./plugins/global-varies');

  // 生产环境: 复写进程的工作目录, 用于文件处理
  process.cwd = () => {
    return process.env.workDir;
  };

  // socket
  require('./plugins/socket');

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // routes
  require('./routes/index')(app);

  // graphql
  require('./graphql/index')(app);
};
