#!/usr/bin/env node

const yParser = require('yargs-parser');
const Service = require('../lib/Service');

const args = yParser(process.argv.slice(2));
console.log(args);

// const service = new Service.default({
//   cwd: args._,
//   plugins: [
//     // XyPluginBlock,
//   ]
// })
// service.run();
