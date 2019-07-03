import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import download from 'download-git-repo';
import inquirer from 'inquirer';
import chalk from 'chalk';
import validateProjectName from 'validate-npm-package-name';
import shell from 'shelljs';
import which from 'which';
import assert from 'assert';

interface Params {
  ui: string;
  mode: string;
}

function findExecutor(): string {
  const executors = ['yarn', 'cnpm', 'npm'];
  for (let i = 0; i < executors.length; i++) {
    try {
      which.sync(executors[i]);
      console.log(`use: ${executors[i]}`);
      return executors[i];
    } catch (e) {}
  }
  console.log(chalk.red('please install yarn or npm'));
  throw new Error('please install yarn or npm');
}

class Create {
  private readonly cwd: string;
  private readonly inCurrent: boolean;
  private readonly name: string;
  private readonly targetDir: string;
  private readonly ui: string;
  private readonly appName: string;
  private readonly mode: string;

  public constructor(appName: string, params: Params) {
    const { ui, mode } = params;
    this.cwd = process.cwd();
    this.inCurrent = appName === '.' || appName === './';
    this.name = this.inCurrent ? path.relative('../', this.cwd) : appName;
    this.targetDir = path.resolve(this.cwd, appName || '.');
    this.appName = appName;

    const uiMapping = {
      e: 'xiyun-international/element-ui-template',
      a: 'xiyun-international/antd-ui-template',
    };
    assert(uiMapping[ui], 'ui is not valid');
    this.ui = uiMapping[ui];

    const modeMapping = {
      full: 'full',
      simple: 'simple',
    };
    assert(modeMapping[mode], 'mode is not valid');
    this.mode = modeMapping[mode];
  }

  private validPackageName(): void {
    const result = validateProjectName(this.name);
    assert(result.validForNewPackages, 'package name is not valid');
  }

  private async checkFileExist(): Promise<string> {
    if (fs.existsSync(this.targetDir)) {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: `Target directory ${chalk.cyan(
            this.targetDir,
          )} already exists. Pick an action:`,
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            { name: 'Cancel', value: false },
          ],
        },
      ]);
      if (action === 'overwrite') {
        console.log(`\nRemoving ${chalk.cyan(this.targetDir)}...`);
        await fs.remove(this.targetDir);
        return Promise.resolve('removed');
      } else {
        return Promise.reject('canceled');
      }
    }
  }

  private downloadTemplate(): void {
    const spinner = ora('downloading template...');
    spinner.start();
    download(
      this.ui,
      path.join(this.cwd, this.appName),
      { clone: false },
      err => {
        spinner.stop();
        if (err) {
          console.log(chalk.red(err));
        } else {
          const spinnerInstall = ora('Auto installing...');
          spinnerInstall.start();
          const npm: string = findExecutor();
          shell.exec(
            `cd ${path.join(this.cwd, this.appName)} && ${npm} install`,
            () => {
              console.log(chalk.green(npm + ' install end'));
              spinnerInstall.stop();
              this.writeEnv();
            },
          );
        }
      },
    );
  }

  private writeEnv(): void {
    shell.exec(
      `cd ${path.join(this.cwd, this.appName)} && echo VUE_APP_MODE=${
        this.mode
      } >> .env`,
      () => {
        console.log(chalk.green('write mode end.'));
        this.startServe();
      },
    );
  }

  private startServe(): void {
    console.log(chalk.cyan('starting development server...'));
    const npm: string = findExecutor();
    shell.exec(`cd ${path.join(this.cwd, this.appName)} && ${npm} start`);
  }

  public async run() {
    this.validPackageName();
    try {
      await this.checkFileExist();
      this.downloadTemplate();
    } catch (e) {
      console.log(chalk.cyan('User canceled.'));
    }
  }
}

export default Create;
