const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');
const download = require('download-git-repo');
const inquirer = require('inquirer')
const chalk = require('chalk');
const validateProjectName = require('validate-npm-package-name')
const shell = require('shelljs');
const which = require('which');


module.exports = async function (ui, appName) {
  const cwd = process.cwd()
  const inCurrent = appName === '.'
  const name = inCurrent ? path.relative('../', cwd) : appName
  const targetDir = path.resolve(cwd, appName || '.')

  const result = validateProjectName(name)
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors && result.errors.forEach(err => {
      console.error(chalk.red.dim('Error: ' + err))
    })
    result.warnings && result.warnings.forEach(warn => {
      console.error(chalk.red.dim('Warning: ' + warn))
    })
    process.exit(1)
  }

  if (fs.existsSync(targetDir)) {
    const {action} = await inquirer.prompt([{
      name: 'action',
      type: 'list',
      message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
      choices: [
        { name: 'Overwrite', value: 'overwrite' },
        { name: 'Cancel', value: false }
      ]
    }]);
    if (action === 'overwrite') {
      console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
      await fs.remove(targetDir)
    } else {
      return;
    }
  }

  const spinner = ora('downloading template...');
  spinner.start();
  const repo = ui === 'e'
    ? 'xiyun-international/element-ui-template'
    : 'xiyun-international/antd-ui-template';

  download(repo, path.join(cwd, appName), { clone: false }, function (err) {
    spinner.stop();
    if (err) {
      console.log(err);
    } else {
      const spinnerInstall = ora('Auto installing...');
      spinnerInstall.start();

      const npm = findExecutor();

      shell.exec(`cd ${path.join(cwd, appName)} && ${npm} install`, function () {
        console.log(chalk.green(npm + ' install end'));
        spinnerInstall.stop();
      });
    }
  })
}

function findExecutor() {
  const executors = ['yarn', 'tnpm', 'cnpm', 'npm'];
  for (let i = 0; i < executors.length; i++) {
    try {
      which.sync(executors[i]);
      console.log(`use: ${executors[i]}`);
      return executors[i];
    } catch (e) {}
  }
  throw new Error('please install yarn or npm');

}
