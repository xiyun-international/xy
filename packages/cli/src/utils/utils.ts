import chalk from "chalk";
import which from "which";
import { join, resolve } from "path";
import { existsSync, remove } from "fs-extra";
import userHome from "user-home";
import mkdirp from "mkdirp";
import inquirer from "inquirer";

/**
 * 获取可执行的命令
 */
export function getExecutor(): string {
  const executors = ["yarn", "tnpm", "cnpm", "npm"];
  for (let i = 0; i < executors.length; i++) {
    try {
      which.sync(executors[i]);
      return executors[i];
    } catch (e) {}
  }
  throw new Error(`Can't find yarn or npm commander`);
}

// umi's git url parser
const gitSiteParser = /^(https\:\/\/|http\:\/\/|git\@)((github|gitlab)[\.\w\-]+)(\/|\:)([\w\-]+)\/([\w\-]+)(\/tree\/([\w\.\-]+)([\w\-\/]+))?(.git)?$/;

export function isGitUrl(url: string): boolean {
  return gitSiteParser.test(url);
}

export interface UrlParse {
  repo: string;
  branch: string;
  path: string;
  id: string;
}

/**
 * 解析 git url
 *
 * @param url
 */
export function parseGitUrl(url: string): UrlParse {
  // (http|s)://(host)/(group)/(name)/tree/(branch)/(path)
  const [
    all,
    protocol,
    host,
    site,
    divide,
    group,
    name,
    allpath,
    branch = "master",
    path = "/"
  ] = gitSiteParser.exec(url);
  return {
    repo: `${protocol}${host}${divide}${group}/${name}.git`,
    branch,
    path,
    id: `${host}/${group}/${name}`
  };
}

export function getParsedData(url: string): UrlParse {
  if (isGitUrl(url)) {
    return parseGitUrl(url);
  } else {
    console.log(`${chalk.red("Error-url: ")} ${chalk.yellowBright(url)}`);
    console.log(`${chalk.red("can't match any pattern")}`);
    process.exit(1);
  }
}

/**
 * 创建临时目录
 */
export function makeSureMaterialsTempPathExist(): string {
  const blocksTempPath = join(userHome, ".xy/blocks");
  if (!existsSync(blocksTempPath)) {
    mkdirp.sync(blocksTempPath);
  }
  return blocksTempPath;
}

export async function checkFileExist(targetDir: string): Promise<string> {
  const realPath = join(resolve(targetDir), "/");
  if (existsSync(realPath)) {
    const { action } = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: `Target directory ${chalk.cyan(
          realPath
        )} already exists. Pick an action:`,
        choices: [
          { name: "Overwrite", value: "overwrite" },
          { name: "Cancel", value: false }
        ]
      }
    ]);
    if (action === "overwrite") {
      console.log(`\nRemoving ${chalk.cyan(realPath)}...`);
      await remove(realPath);
      return Promise.resolve("removed");
    } else {
      return Promise.reject("canceled");
    }
  }
}
