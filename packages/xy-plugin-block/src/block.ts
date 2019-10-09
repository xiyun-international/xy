import { join, resolve } from 'path';
import ora from 'ora';
import execa from 'execa';
import { merge } from 'lodash';
import { existsSync, statSync } from 'fs-extra';
import { copy } from 'fs-jetpack';
import assert from 'assert';
import chalk from 'chalk';
// import inquirer from 'inquirer';

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
  // 源路径
  const sp = resolve(sourcePath);
  // 目标路径
  let dp;
  // 如果是一个文件，并且没有配置目标文件名，就使用原文件名
  if (statSync(sp).isFile() && destPath === './') {
    const fileName = sourcePath.split('/').reverse()[0];
    dp = resolve(destPath, fileName);
  } else {
    dp = resolve(destPath);
  }

  try {
    // 优先使用 shell 原生命令复制
    await execa(`cp`, [`-R`, sp, dp]);
  } catch (e) {
    // 如果下载的是一个单独的文件，并且指定了一个不存在的目录作为下载路径，
    // 就会导致 cp 命令失败，这时使用 copy 工具来处理新建目录等操作。
    copy(sp, dp, { overwrite: true });
  }
  spinner.succeed('下载完成');
}

async function run(repo: string, destDir: string): Promise<void> {
  const spinner = ora();

  console.log(`${chalk.cyan('正在解析 URL 和参数')}`);
  const ctx = getCtx(repo);
  assert(ctx, '没有匹配到合适的 GitHub URL，请检查你的 URL 是否正确');

  // 1、如果 block 项目不存在就执行 clone git repo
  if (!ctx.repoExists) {
    await gitClone(ctx, spinner);
  }

  // 2、如果 block 项目存在就执行 update git repo
  if (ctx.repoExists) {
    await gitUpdate(ctx, spinner);
  }

  // 3、把目标文件复制到指定目录中
  await copyFiles(ctx.sourcePath, destDir);
}

export default run;
