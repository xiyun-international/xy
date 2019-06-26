#!/usr/bin/env node

const yParser = require('yargs-parser');
const Service = require('../lib/Service').default;
const args = yParser(process.argv.slice(2));

// Plugin List
const Block = require('xy-plugin-block').default;

const service = new Service(args._[0], args, {
  plugins: [Block],
});
service.run();
