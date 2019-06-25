#!/usr/bin/env node

const yParser = require('yargs-parser');
const Service = require('../lib/Service');
const args = yParser(process.argv.slice(2));

const service = new Service.default(args._[0], args, {
  plugins: [
    // XyPluginBlock,
  ],
});
service.run();
