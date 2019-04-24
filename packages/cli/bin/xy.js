#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer')
const create = require('../library/create');

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

program.parse(process.argv);
