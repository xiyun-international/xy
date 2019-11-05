#!/usr/bin/env node

const yParser = require('yargs-parser');
const Service = require('../lib/Service').default;
const args = yParser(process.argv.slice(2));
const pluginList = require('../lib/getPlugins').default;
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
updateNotifier({ pkg }).notify({ defer: true });

const service = new Service(args._[0], args, {
  plugins: pluginList,
});

service.run();
