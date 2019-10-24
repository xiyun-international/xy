#! /usr/bin/env node

const path = require('path');
const sh = require('shelljs');

console.log(path.resolve('.'));

console.log(__dirname);
console.log(__filename);

console.log('正在开启 UI 服务');

var silentState = sh.config.silent; // save old silent state
sh.config.silent = true;
sh.config.silent = silentState;

sh.exec(`cd ${__dirname} && npm run serve`, {
  // silent: true,
});

console.log('woeiurowieuro');
sh.echo('sldfkjsldkfj');
