import { join, resolve } from 'path';
import ora from 'ora';
import execa from 'execa';
import { merge } from 'lodash';
import { existsSync, statSync } from 'fs-extra';
import { copy } from 'fs-jetpack';
import assert from 'assert';
import chalk from 'chalk';
import inquirer from 'inquirer';
import signale from 'signale';

import {
  getParsedData,
  UrlParse,
  makeSureMaterialsTempPathExist,
} from './utils';

interface OraInter {
  start: Function;
  fail: Function;
  succeed: Function;
}

interface CtxInter extends UrlParse {
  sourcePath?: string;
  templateTmpDirPath?: string;
  blocksTempPath?: string;
  repoExists?: boolean;
}

/**
 * 解析 github url ，创建临时目录，返回组合好的所需数据
 *
 * @param url
 */
function getCtx(url: string): CtxInter {
  let ctx: CtxInter;
  // 解析 git repo 地址
  ctx = getParsedData(url);
  if (!ctx) return null;

  // 创建临时目录
  const blocksTempPath = makeSureMaterialsTempPathExist();
  const templateTmpDirPath = join(blocksTempPath, ctx.id);
  merge(ctx, {
    sourcePath: join(templateTmpDirPath, ctx.path),
    branch: ctx.branch,
    templateTmpDirPath,
    blocksTempPath,
    repoExists: existsSync(templateTmpDirPath),
  });

  return ctx;
}

async function gitClone(ctx: CtxInter, spinner: OraInter): Promise<void> {
  spinner.start('Clone git repo');
  try {
    await execa(
      `git`,
      [`clone`, ctx.repo, ctx.id, `--single-branch`, `-b`, ctx.branch],
      {
        cwd: ctx.blocksTempPath,
        env: process.env,
      },
    );
  } catch (e) {
    spinner.fail();
    throw new Error(e);
  }
  spinner.succeed();
}

async function gitUpdate(ctx: CtxInter, spinner: OraInter): Promise<void> {
  spinner.start('Git fetch');
  try {
    await execa(`git`, ['fetch'], {
      cwd: ctx.templateTmpDirPath,
    });
  } catch (e) {
    spinner.fail();
    throw new Error(e);
  }
  spinner.succeed();

  spinner.start(`Git checkout ${ctx.branch}`);
  try {
    await execa(`git`, ['checkout', ctx.branch], {
      cwd: ctx.templateTmpDirPath,
    });
  } catch (e) {
    spinner.fail();
    throw new Error(e);
  }
  spinner.succeed();

  spinner.start('Git pull');
  try {
    await execa(`git`, [`pull`], {
      cwd: ctx.templateTmpDirPath,
    });
  } catch (e) {
    spinner.fail();
    throw new Error(e);
  }
  spinner.succeed();
}

async function copyFiles(sourcePath: string, destPath: string): Promise<void> {
  const spinner = ora();
  const sp = resolve(sourcePath);
  let dp;
  // 如果是一个文件，并且没有配置目标文件名，就使用原文件名
  if (statSync(sp).isFile() && destPath === './') {
    const fileName = sourcePath.split('/').reverse()[0];
    dp = resolve(destPath, fileName);
  } else {
    dp = resolve(destPath);
  }

  try {
    spinner.start('Copying files');
    copy(sp, dp);
    spinner.succeed('Copy success.');
  } catch (e) {
    spinner.warn(`${chalk.yellowBright('Exist Warning.')}`);
    spinner.stop();

    const promptOption = [
      {
        name: 'action',
        type: 'list',
        message: `Target directory ${chalk.cyan(
          dp,
        )} already exists. Pick an action:`,
        choices: [
          { name: 'Overwrite', value: 'overwrite' },
          { name: 'Cancel', value: 'cancel' },
        ],
      },
    ];

    // 如果没有指定目标目录，并且仓库也是一个目录，增加一个选项
    if (destPath === './' && !statSync(sp).isFile()) {
      const filePath = sourcePath.split('/').reverse()[0];
      promptOption[0].choices.push({
        name: `Replace ./ to ./${filePath}`,
        value: 'replace',
      });
    }

    const { action } = await inquirer.prompt(promptOption);
    if (action === 'overwrite') {
      spinner.start('Continue copying files...');
      copy(sp, dp, { overwrite: true });
      spinner.succeed('Copy success.');
    } else if (action === 'cancel') {
      spinner.fail('User canceled.');
      process.exit(1);
    } else {
      // 替换目录
      const filePath = sourcePath.split('/').reverse()[0];
      if (statSync(sp).isDirectory()) {
        spinner.fail(`Error: The path "./${filePath}" is also exists.`);
        process.exit(1);
      }
      dp = resolve(destPath, filePath);
      copy(sp, dp, { overwrite: true });
    }
  }
}

async function run(repo: string, destDir: string): Promise<void> {
  const spinner = ora();

  console.log(`${chalk.cyan('Parsing url and args...')}`);
  const ctx = getCtx(repo);
  assert(ctx, "can't match any pattern");

  // 1、如果 block 项目不存在就执行 clone git repo
  if (!ctx.repoExists) {
    await gitClone(ctx, spinner);
  }
  // 2、如果 block 项目存在就执行 update git repo
  if (ctx.repoExists) {
    await gitUpdate(ctx, spinner);
  }
  // 确保源地址存在
  // assert(existsSync(ctx.sourcePath), `${ctx.sourcePath} don't exists`);

  // 3、把目标文件复制到指定目录中
  await copyFiles(ctx.sourcePath, destDir);
}

export default run;
