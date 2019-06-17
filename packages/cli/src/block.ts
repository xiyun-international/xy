import { join, resolve } from "path";
import ora from "ora";
import execa from "execa";
import {
  getParsedData,
  // getExecutor,
  UrlParse,
  makeSureMaterialsTempPathExist
  // checkFileExist
} from "./utils/utils";
import { merge } from "lodash";
import { existsSync } from "fs-extra";
import { copy } from "fs-jetpack";
import assert from "assert";
import chalk from "chalk";

interface Cmd {
  path: string;
}

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
  // 创建临时目录
  const blocksTempPath = makeSureMaterialsTempPathExist();
  const templateTmpDirPath = join(blocksTempPath, ctx.id);
  merge(ctx, {
    sourcePath: join(templateTmpDirPath, ctx.path),
    branch: ctx.branch,
    templateTmpDirPath,
    blocksTempPath,
    repoExists: existsSync(templateTmpDirPath)
  });

  return ctx;
}

async function gitClone(ctx: CtxInter, spinner: OraInter): Promise<void> {
  spinner.start("Clone git repo");
  try {
    await execa(
      `git`,
      [`clone`, ctx.repo, ctx.id, `--single-branch`, `-b`, ctx.branch],
      {
        cwd: ctx.blocksTempPath,
        env: process.env
      }
    );
  } catch (e) {
    spinner.fail();
    throw new Error(e);
  }
  spinner.succeed();
}

async function gitUpdate(ctx: CtxInter, spinner: OraInter): Promise<void> {
  spinner.start("Git fetch");
  try {
    await execa(`git`, ["fetch"], {
      cwd: ctx.templateTmpDirPath
    });
  } catch (e) {
    spinner.fail();
    throw new Error(e);
  }
  spinner.succeed();

  spinner.start(`Git checkout ${ctx.branch}`);
  try {
    await execa(`git`, ["checkout", ctx.branch], {
      cwd: ctx.templateTmpDirPath
    });
  } catch (e) {
    spinner.fail();
    throw new Error(e);
  }
  spinner.succeed();

  spinner.start("Git pull");
  try {
    await execa(`git`, [`pull`], {
      cwd: ctx.templateTmpDirPath
    });
  } catch (e) {
    spinner.fail();
    throw new Error(e);
  }
  spinner.succeed();
}

function copyFiles(sourcePath: string, destPath: string): void {
  const sp = resolve(sourcePath);
  const dp = resolve(destPath);
  copy(sp, dp);
}

async function add(repo: string, destDir: string): Promise<void> {
  const spinner = ora();

  console.log(`${chalk.cyan("Parsing url and args...")}`);
  const ctx = getCtx(repo);

  // spinner.start("Check Dest directory");
  // console.log(`\n ${chalk.cyan("Check Dest directory")}`);
  // try {
  //   await checkFileExist(destDir);
  // } catch (e) {
  //   console.log(chalk.cyan("User canceled."));
  //   process.exit(1);
  // }
  // spinner.succeed();
  // console.log(`\n ${chalk.cyan("Check Dest directory")}`);

  // spinner.start("Get commander");
  // const exe = getExecutor();
  // spinner.succeed();

  // 1、如果 block 项目不存在就执行 clone git repo
  if (!ctx.repoExists) {
    await gitClone(ctx, spinner);
  }
  // 2、如果 block 项目存在就执行 update git repo
  if (ctx.repoExists) {
    await gitUpdate(ctx, spinner);
  }
  // make sure sourcePath exists
  assert(existsSync(ctx.sourcePath), `${ctx.sourcePath} don't exists`);

  // 3、把目标文件复制到指定目录中
  spinner.start("Copying files");
  copyFiles(ctx.sourcePath, destDir);
  spinner.succeed();
}

async function run(type: string, repo: string, cmd: Cmd): Promise<void> {
  if (type === "add") {
    await add(repo, cmd.path);
  }
}

export { run };
