import { join, resolve } from 'path';
import ora from 'ora';
import execa from 'execa';
import { merge } from 'lodash';
import { existsSync, statSync, readFileSync } from 'fs-extra';
import { copy } from 'fs-jetpack';
import assert from 'assert';
import chalk from 'chalk';
import glob from 'glob';
import write from 'write';
// import fs from 'fs';

import {
  getParsedData,
  UrlParse,
  makeSureMaterialsTempPathExist,
} from './utils';
import { fstat } from 'fs';

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

/**
 * 拉取 git 仓库
 * @param ctx 解析 url 后得到的路径上下文
 * @param spinner loading
 */
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

/**
 * 更新 git 仓库
 * @param ctx 解析 url 后得到的路径上下文
 * @param spinner loading
 */
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

/**
 * 复制
 * @param sourcePath 临时路径
 * @param destPath 目标路径
 */
async function copyFiles(sourcePath: string, destPath: string): Promise<void> {
  const spinner = ora();
  // 源路径
  const sp = resolve(sourcePath);
  // 目标路径
  let dp;

  // 判断下载的是文件还是目录
  if (statSync(sp).isFile()) {
    const [fileName, dirName] = sourcePath.split('/').reverse();
    dp = resolve(destPath, dirName, fileName);
  } else {
    const dirName = sourcePath.split('/').reverse()[0];
    dp = resolve(destPath, dirName);
  }

  // 复制文件
  copy(sp, dp, { overwrite: true });

  spinner.succeed('下载完成');
}

/**
 * 下载
 * @param url GitHub url
 * @param destPath 目标路径
 */
async function download(url: string, destPath: string) {
  const spinner = ora();

  console.log(`${chalk.cyan('正在解析 URL 和参数')}`);
  const ctx = getCtx(url);
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
  await copyFiles(ctx.sourcePath, destPath);
}

/**
 * 生成组件引用文件
 * @param path 路径
 */
function generateExportFile(blockPath: string) {
  const files = glob.sync(blockPath + '*/src/index.vue');
  const regexp = RegExp('name:\\s?[\\\'|"](\\w+)[\\\'|"]', 'g');
  let importStr = "import Vue from 'vue';\n";
  let installStr = '\n';
  files.forEach(filePath => {
    const dirName = /\.\/src\/blocks\/([a-zA-Z-_]+)/.exec(filePath)[1];
    const content = readFileSync(resolve(filePath), 'utf8');
    let matches;
    while ((matches = regexp.exec(content)) !== null) {
      const componentName = matches[1];
      importStr += `import ${componentName} from '@/blocks/${dirName}/src/index.vue';\n`;
      installStr += `Vue.component(${componentName}.name, ${componentName});\n`;
    }
  });

  write.sync(resolve(blockPath, 'index.js'), importStr + installStr, {
    overwrite: true,
  });
}

type opts = {
  // 下载集合的选项
  collection: boolean;
  // 下载的目标路径
  path: string;
  // 是否扫描 blocks 目录并生成组件引用文件
  scan: boolean;
};

/**
 * 运行
 * @param opts 选项
 * @param args 参数
 */
async function run(opts: opts, args: Array<any>): Promise<void> {
  // 选项 --collection 集合下载
  // 如果不是集合下载，才校验是否有 url
  if (!opts.collection) {
    // args[1] 为 GitHub url，断言为 false 时才会抛出错误
    assert(args[1] !== undefined, '请填写要下载的区块 URL');

    // 选项 --path，表示要下载到哪个目录下，默认当前目录
    const destPath = opts.path ? opts.path : './';

    await download(args[1], destPath);
  } else {
    // 集合下载逻辑
    const pkgJson = require(resolve(process.env.PWD, 'package.json'));
    const destPath = './src/blocks/';
    Object.keys(pkgJson.blocks).map(async key => {
      await download(pkgJson.blocks[key], destPath);
    });
  }

  // --scan 选项，是否要扫描 blocks 目录并生成引用组件的文件
  process.on('beforeExit', () => {
    if (opts.scan) {
      if (existsSync(resolve('./src/blocks/'))) {
        generateExportFile('./src/blocks/');
      } else {
        throw new Error('"./src/blocks/"目录不存在，无法生成引用文件。');
      }
    }
  });
}

export default run;
