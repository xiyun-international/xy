#!/usr/bin/env node

const yParser = require('yargs-parser');
const Service = require('../lib/Service').default;
const args = yParser(process.argv.slice(2));

// Plugin List
const Block = require('@xiyun/xy-plugin-block').default;
const Create = require('@xiyun/xy-plugin-create').default;
const Generator = require('@xiyun/xy-plugin-generator').default;
const Add = require('@xiyun/xy-plugin-add').default;

const service = new Service(args._[0], args, {
  plugins: [Block, Create, Generator, Add],
});
service.run();
