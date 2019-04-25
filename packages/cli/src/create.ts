import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import download from 'download-git-repo';
import inquirer from 'inquirer';
import chalk from 'chalk';
import validateProjectName from 'validate-npm-package-name';
// tslint 不能检测到由for循环批量导出的模块，一直报错，所以改用此方式引用模块
const shell = require('shelljs');
import which from 'which';

class Create {
  cwd: string;
  inCurrent: boolean;
  name: string;
  targetDir: string;
  ui: string;
  appName: string;
  mode: string;
  constructor(appName:string, params:{ui, mode}) {
    const {ui, mode} = params;
    this.cwd = process.cwd();
    this.inCurrent = appName === '.';
    this.name = this.inCurrent ? path.relative('../', this.cwd) : appName;
    this.targetDir = path.resolve(this.cwd, appName || '.');
    this.ui = ui;
    this.appName = appName;
    this.mode = mode;
  }

  validPackageName():void {
    const result = validateProjectName(this.name);

    if (!result.validForNewPackages) {
      console.error(chalk.red(`Invalid project name: "${this.name}"`))
      result.errors && result.errors.forEach(err => {
        console.error(chalk.red.dim('Error: ' + err))
      });
      result.warnings && result.warnings.forEach(warn => {
        console.error(chalk.red.dim('Warning: ' + warn))
      });
      process.exit(1)
    }
  }

  async checkFileExist():Promise<string> {
    if (fs.existsSync(this.targetDir)) {
      const {action} = await inquirer.prompt([{
        name: 'action',
        type: 'list',
        message: `Target directory ${chalk.cyan(this.targetDir)} already exists. Pick an action:`,
        choices: [
          { name: 'Overwrite', value: 'overwrite' },
          { name: 'Cancel', value: false }
        ]
      }]);
      if (action === 'overwrite') {
        console.log(`\nRemoving ${chalk.cyan(this.targetDir)}...`)
        await fs.remove(this.targetDir)
        return Promise.resolve('removed');
      } else {
        return Promise.reject('canceled');
      }
    }
  }

  findExecutor():string {
    const executors = ['yarn', 'tnpm', 'cnpm', 'npm'];
    for (let i = 0; i < executors.length; i++) {
      try {
        which.sync(executors[i]);
        console.log(`use: ${executors[i]}`);
        return executors[i];
      } catch (e) {}
    }
    console.log(chalk.red('please install yarn or npm'));
    process.exit(1)
  }

  downloadTemplate():void {
    const spinner = ora('downloading template...');
    spinner.start();
    const repo = this.ui === 'e'
      ? 'xiyun-international/element-ui-template'
      : 'xiyun-international/antd-ui-template';

    download(repo, path.join(this.cwd, this.appName), { clone: false }, (err) => {
      spinner.stop();
      if (err) {
        console.log(chalk.red(err));
      } else {
        const spinnerInstall = ora('Auto installing...');
        spinnerInstall.start();
        const npm:string = this.findExecutor();
        shell.exec(`cd ${path.join(this.cwd, this.appName)} && ${npm} install`, () => {
          console.log(chalk.green(npm + ' install end'));
          spinnerInstall.stop();
          this.writeEnv();
        });
      }
    })
  }

  writeEnv() {
    shell.exec(
      `cd ${path.join(this.cwd, this.appName)} && echo VUE_APP_MODE=${this.mode} >> .env`,
    () => {
      console.log(chalk.green('write mode end.'));
      this.startServe();
    });
  }

  startServe() {
    console.log(chalk.cyan('starting development server...'));
    const npm:string = this.findExecutor();
    shell.exec(`cd ${path.join(this.cwd, this.appName)} && ${npm} start`);
  }

  async run() {
    this.validPackageName();
    try {
      await this.checkFileExist();
    } catch(e) {
      console.log(chalk.cyan('User canceled.'));
      process.exit(1)
    }
    this.downloadTemplate();
  }
}

export default function (appName, params) {
  return new Create(appName, params).run();
}
