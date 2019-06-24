import chalk from 'chalk';
import { join } from 'path';
import { existsSync } from 'fs-extra';
import userHome from 'user-home';
import mkdirp from 'mkdirp';

// 解析 github 地址
const gitSiteParser = /^(https:\/\/|http:\/\/|git@)((github|gitlab)[.\w\-]+)([\/:])([\w\-]+)\/([\w\-]+)(\/tree\/([\w.\-]+)([\w\-\/]+))?(\/blob\/([\w.\-]+)([\w\-\/.]+))?(.git)?$/;

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
  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    all,
    protocol,
    host,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    site,
    divide,
    group,
    name,
    // 7 8 9 匹配目录
    allDirPath,
    dirBranch = 'master',
    dirPath = '/',
    // 10 11 12 匹配单文件
    allFilePath,
    fileBranch,
    filePath,
    // 如果直接提供整个仓库地址，按照目录来执行相应逻辑
  ] = gitSiteParser.exec(url);

  let branch, path;
  if (allDirPath === undefined && allFilePath === undefined) {
    branch = dirBranch;
    path = dirPath;
  } else if (allDirPath !== undefined) {
    branch = dirBranch;
    path = dirPath;
  } else {
    branch = fileBranch;
    path = filePath;
  }

  return {
    repo: `${protocol}${host}${divide}${group}/${name}.git`,
    branch,
    path,
    id: `${host}/${group}/${name}`,
  };
}

export function getParsedData(url: string): UrlParse {
  if (isGitUrl(url)) {
    return parseGitUrl(url);
  } else {
    console.log(`${chalk.red('Error-url: ')} ${chalk.yellowBright(url)}`);
    console.log(`${chalk.red("can't match any pattern")}`);
    process.exit(1);
  }
}

/**
 * 创建临时目录
 */
export function makeSureMaterialsTempPathExist(): string {
  const blocksTempPath = join(userHome, '.xy/blocks');
  if (!existsSync(blocksTempPath)) {
    mkdirp.sync(blocksTempPath);
  }
  return blocksTempPath;
}
