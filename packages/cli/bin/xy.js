#!/usr/bin/env node

const yParser = require('yargs-parser');
const fs = require('fs');
const Service = require('../lib/Service').default;
const path = require('path');
const userHome = require('user-home');

const args = yParser(process.argv.slice(2));
const pluginList = [];

const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
updateNotifier({ pkg }).notify({ defer: true });

// 自动注册插件  1.本目录引入的插件
const dependencies = require('../package.json').dependencies;
Object.keys(dependencies).forEach(key => {
  if (key.indexOf('@xiyun/xy-plugin') !== -1) {
    const xyPlugin = require(key).default;
    pluginList.push(xyPlugin);
  }
});

// 自动注册插件 2.使用yarn link引入的插件
const xy = fs.existsSync('node_modules/@xiyun');
if (xy) {
  const xyPkg = fs.readdirSync('./node_modules/@xiyun');
  Object.keys(xyPkg).forEach(key => {
    if (xyPkg[key].indexOf('xy-plugin') !== -1) {
      const xyPlugin = require('@xiyun/' + xyPkg[key]).default;
      if (pluginList.length > 0) {
        if (pluginList.indexOf(xyPlugin) == -1) {
          pluginList.push(xyPlugin);
        }
      } else {
        pluginList.push(xyPlugin);
      }
    }
  });
}

// 处理外部装载的插件
module.paths.unshift(path.resolve(userHome, '.xy', 'plugins', 'node_modules'));

// 根据宿主目录，./xy/plugins/packages.json 注入到 Service 中
const xyPluginPkg = path.resolve(userHome, '.xy', 'plugins', 'package.json');
if (fs.existsSync(xyPluginPkg)) {
  const dependencies = require(xyPluginPkg).dependencies;
  Object.keys(dependencies).forEach(item => {
    pluginList.push(require(item).default);
  });
}

const service = new Service(args._[0], args, {
  plugins: pluginList,
});

service.run();
