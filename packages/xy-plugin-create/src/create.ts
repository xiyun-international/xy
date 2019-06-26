import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import download from 'download-git-repo';
import inquirer from 'inquirer';
import chalk from 'chalk';
import validateProjectName from 'validate-npm-package-name';
import shell from 'shelljs';
import which from 'which';

interface Params {
  ui: string;
  mode: string;
}

class Create {
  private readonly cwd: string;
  private readonly inCurrent: boolean;
  private readonly name: string;
  private readonly targetDir: string;
  private readonly ui: string;
  private readonly appName: string;
  private readonly mode: string;

  public constructor(params: Params, appName?: string) {
    const { ui, mode } = params;
    this.cwd = process.cwd();
    if (!appName) appName = './';
    this.inCurrent = appName === '.' || appName === './';
    this.name = this.inCurrent ? path.relative('../', this.cwd) : appName;
    console.log(path.relative('../', this.cwd));
    return;
    this.targetDir = path.resolve(this.cwd, appName || '.');
    this.ui = ui;
    this.appName = appName;
    this.mode = mode;
  }

  private validPackageName(): void {
    const result = validateProjectName(this.name);

    if (!result.validForNewPackages) {
      console.error(chalk.red(`Invalid project name: "${this.name}"`));
      result.errors &&
        result.errors.forEach(err => {
          console.error(chalk.red.dim('Error: ' + err));
        });
      result.warnings &&
        result.warnings.forEach((warn): void => {
          console.error(chalk.red.dim('Warning: ' + warn));
        });
      process.exit(1);
    }
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

  private findExecutor(): string {
    const executors = ['yarn', 'tnpm', 'cnpm', 'npm'];
    for (let i = 0; i < executors.length; i++) {
      try {
        which.sync(executors[i]);
        console.log(`use: ${executors[i]}`);
        return executors[i];
      } catch (e) {}
    }
    console.log(chalk.red('please install yarn or npm'));
    process.exit(1);
  }

  private downloadTemplate(): void {
    const spinner = ora('downloading template...');
    spinner.start();
    const repo =
      this.ui === 'e'
        ? 'xiyun-international/element-ui-template'
        : 'xiyun-international/antd-ui-template';

    download(repo, path.join(this.cwd, this.appName), { clone: false }, err => {
      spinner.stop();
      if (err) {
        console.log(chalk.red(err));
      } else {
        const spinnerInstall = ora('Auto installing...');
        spinnerInstall.start();
        const npm: string = this.findExecutor();
        shell.exec(
          `cd ${path.join(this.cwd, this.appName)} && ${npm} install`,
          () => {
            console.log(chalk.green(npm + ' install end'));
            spinnerInstall.stop();
            this.writeEnv();
          },
        );
      }
    });
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
    const npm: string = this.findExecutor();
    shell.exec(`cd ${path.join(this.cwd, this.appName)} && ${npm} start`);
  }

  public async run() {
    this.validPackageName();
    try {
      await this.checkFileExist();
    } catch (e) {
      console.log(chalk.cyan('User canceled.'));
      process.exit(1);
    }
    this.downloadTemplate();
  }
}

export default Create;
