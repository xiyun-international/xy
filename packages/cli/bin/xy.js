#!/usr/bin/env node

const path = require('path');
// const fs = require('fs');
const ora = require('ora');
const download = require('download-git-repo');
const shell = require('shelljs');
// const execa = require('execa');
const program = require('commander');
const inquirer = require('inquirer')
const validateProjectName = require('validate-npm-package-name')
const chalk = require('chalk');
const create = require('../library/create');
// const semver = require('semver');
// const slash = require('slash');
// const minimist = require('minimist');


// const cwd = process.cwd();
// const npms = ['yarn', 'cnpm', 'npm'];

// const getStream = require('get-stream');


program
  .version(require('../package.json').version)
  .description('A command line tool to create template quickly.')
  .usage('<command> [options]');
program
  .command('create <app-name>')
  .description('To create a template.')
  .action(appName => {
    (async () => {
      const {ui} = await inquirer.prompt({
        name: 'ui',
        type: 'list',
        message: 'Which UI template do you want to create?',
        choices: [
          { name: 'element-ui-template', value: 'e' },
          { name: 'ant-design-ui-template', value: 'a' },
        ]
      });
      create(ui, appName);
    })();
  });
program.parse(process.argv)







