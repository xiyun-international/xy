module.exports = function(app) {
  console.log('appppp ---------------');
  const express = require('express');

  // 全局变量
  require('./plugins/global-varies');

  // // 开发环境临时: 调试时设置工作目录
  // process.cwd = () => {
  //   return "D:/前端开发/code_test/learn-engineering/learn-vue-cli/learn-cli-ui_dev-server/_test-area";
  // };

  // 生产环境: 复写进程的工作目录, 用于文件处理
  process.cwd = () => {
    // return process.env.workDir
    return `D:/前端开发/code_test/learn-engineering/learn-vue-cli/learn-cli-ui_dev-server_graphql/_test-area`;
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
