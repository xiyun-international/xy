#!/usr/bin/env node

const yParser = require('yargs-parser');
const Service = require('../lib/Service').default;
const args = yParser(process.argv.slice(2));

// Plugin List
const Block = require('xy-plugin-block').default;
const Create = require('xy-plugin-create').default;

const service = new Service(args._[0], args, {
  plugins: [Block, Create],
});
service.run();
