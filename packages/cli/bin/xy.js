#!/usr/bin/env node

const commander = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const create = require('../lib/create');
const block = require('../lib/block');

const program = new commander.Command();

program
  .version(require('../package.json').version, '-v, --version')
  .description('A command line tool to create template quickly.')
  .usage('<command> [options]');

program
  .command('create <app-name>')
  .description('Create a template.')
  .action(appName => {
    (async () => {
      const { ui } = await inquirer.prompt({
        name: 'ui',
        type: 'list',
        message: 'Which UI template do you want to create?',
        choices: [
          { name: 'element-ui-template', value: 'e' },
          { name: 'ant-design-ui-template', value: 'a' },
        ],
      });
      const { mode } = await inquirer.prompt({
        name: 'mode',
        type: 'list',
        message: 'Please select a mode:',
        choices: [
          { name: 'Full layout(with side nav and header bar).', value: 'full' },
          {
            name: 'Simple layout(with out side nav and header var).',
            value: 'simple',
          },
        ],
      });

      await create.default(appName, { ui, mode });
    })();
  });

program
  .command('block <add> <git-repo>')
  .option('-p, --path <path>', 'Define a path to locate block.', './')
  .description('Download a block template from a git repo.')

  /**
   * type - 操作类型：add,remove 等
   * repo - 提供的 git 仓库地址
   * cmd - 命令行的各种参数，能取到 path
   */
  .action((type, repo, cmd) => {
    block.run(type, repo, cmd);
  });

// output help information on unknown commands
program.arguments('<command>').action(cmd => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
});

// output help information on no arguments supplied
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);
