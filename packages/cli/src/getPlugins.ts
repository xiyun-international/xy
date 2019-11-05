const fs = require('fs');
const path = require('path');
const userHome = require('user-home');

const pluginList = [];

// 自动注册插件  1.本目录引入的插件
const dependencies = require('../package.json').dependencies;
Object.keys(dependencies).forEach(key => {
  if (key.indexOf('@xiyun/xy-plugin') !== -1) {
    const xyPlugin = require(key).default;
    pluginList.push(xyPlugin);
  }
});

// 自动注册插件 2.使用yarn link引入的插件
const xy = fs.existsSync(path.resolve('./', 'node_modules', '@xiyun'));
if (xy) {
  const listKeys = [];
  pluginList.forEach(plugin => {
    listKeys.push(plugin.name);
  });
  const xyPkg = fs.readdirSync(path.resolve('./', 'node_modules', '@xiyun'));
  xyPkg.forEach(key => {
    if (key.indexOf('xy-plugin') !== -1) {
      const tmpPlugin = require(path.resolve(
        './',
        'node_modules',
        '@xiyun',
        key,
      )).default;
      if (listKeys.indexOf(tmpPlugin.name) === -1) {
        pluginList.push(tmpPlugin);
      }
    }
  });
}

// 处理外部装载的插件
module.paths.unshift(path.resolve(userHome, '.xy', 'plugins', 'node_modules'));
const xyPluginPkg = path.resolve(userHome, '.xy', 'plugins', 'package.json');
if (fs.existsSync(xyPluginPkg)) {
  const listKeys = [];
  pluginList.forEach(plugin => {
    listKeys.push(plugin.name);
  });
  const userDependencies = require(xyPluginPkg).dependencies;
  if (userDependencies) {
    Object.keys(userDependencies).forEach(item => {
      const tmpPlugin = require(item).default;
      if (listKeys.indexOf(tmpPlugin.name) === -1) {
        pluginList.push(tmpPlugin);
      }
    });
  }
}

export default pluginList;
