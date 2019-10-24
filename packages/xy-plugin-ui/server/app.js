const express = require('express');
const Router = require('./rouer');
const graphql = require('./graphql');
const WebSocket = require('./websocket');

// 主入口
module.exports = function run(app) {
  // 开启 graphql 服务
  graphql(app);

  // 为 req.body 提供解析
  // 解析 application/json
  app.use(express.json());
  // 解析 application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // 路由转发
  app.use('/api', Router);

  // 开启 WebSocket 服务
  WebSocket(8081);
};
