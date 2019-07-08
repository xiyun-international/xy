const yParser = require('yargs-parser');
const fs = require('fs');
const Service = require('../lib/Service').default;
const path = require('path');
const userHome = require('user-home');

const args = yParser(process.argv.slice(2));
// 自动注册插件
const pluginList = [];
const xyPlugins = fs.readdirSync('package.json');
const dependencies = require(xyPlugins).dependencies;
const pluginList = [];
Object.keys(dependencies).forEach(key => {
  if (key.indexOf('@xiyun/xy-plugin') !== -1) {
    const xyPlugin = require(key).default;
    pluginList.push(xyPlugin);
  }
});

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
