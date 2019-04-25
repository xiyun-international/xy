#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer')
const chalk = require('chalk');
const create = require('../lib/create');

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
      const {mode} = await inquirer.prompt({
        name: 'mode',
        type: 'list',
        message: 'Please select a mode:',
        choices: [
          { name: 'Full layout(with side nav and header bar).', value: 'full' },
          { name: 'Simple layout(with out side nav and header var).', value: 'simple' },
        ]
      });

      create.default(appName, {ui, mode});
    })();
  });

// output help information on unknown commands
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
  })

// output help information on no arguments supplied
if (!process.argv.slice(2).length) {
  program.outputHelp()
}

program.parse(process.argv);
