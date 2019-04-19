#!/usr/bin/env node

const signale = require('signale');
const chalk = require('chalk');
const yParser = require('yargs-parser');
const args = yParser(process.argv.slice(2));

const cwd = process.cwd();

if (args.v || args.version) {
  console.log(require('./package').version);
  process.exit(0);
}

switch (args._[0]) {
  case 'theme':
    require('../lib/gulp').default({
      cwd,
    }).catch(e => {
      signale.error(e);
      process.exit(1);
    });
    break;
  case 'component':
    require('../lib/components').default({
      cwd,
    }).catch(e => {
      signale.error(e);
      process.exit(1);
    });
    break;
  default:
    signale.error(chalk.red(`Unsupported command ${args._[0]}`))
    break;
}
