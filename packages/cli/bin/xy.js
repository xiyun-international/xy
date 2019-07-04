#!/usr/bin/env node

const yParser = require('yargs-parser');
const fs = require('fs');
const Service = require('../lib/Service').default;
const path = require('path');
const userHome = require('user-home');

const args = yParser(process.argv.slice(2));

// Plugin List
const Block = require('@xiyun/xy-plugin-block').default;
const Create = require('@xiyun/xy-plugin-create').default;
const Generator = require('@xiyun/xy-plugin-generator').default;
const Add = require('@xiyun/xy-plugin-add').default;
const Init = require('@xiyun/xy-plugin-init').default;

const pluginList = [Block, Create, Add, Generator, Init];

module.paths.unshift(path.resolve(userHome, '.xy', 'plugins', 'node_modules'));

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
