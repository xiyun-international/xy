import { existsSync, writeFileSync } from 'fs-extra';
import userHome from 'user-home';
import assert from 'assert';
import path from 'path';
import shelljs from 'shelljs';

/**
 * 查找执行命令
 */
function findCommand() {
  const commands = ['yarn', 'npm', 'cnpm', 'pnpm'];
  for (let i = 0; i < commands.length; i++) {
    if (shelljs.which(commands[i])) {
      return commands[i];
    }
  }
  throw Error('请安装 yarn 或 npm');
}

/**
 * 获取/创建插件存放目录
 * @returns 路径
 */
function getPluginDir(): string {
  const tempPath = path.join(userHome, '.xy', 'plugins');
  if (!existsSync(tempPath)) {
    try {
      shelljs.mkdir('-p', tempPath);
    } catch (e) {
      throw new Error(`没有权限创建"${tempPath}"目录`);
    }
  }
  return tempPath;
}

/**
 * 创建插件 package.json 文件
 * @param pluginsDir 插件存放目录
 */
function createPackageJsonFile(pluginsDir: string) {
  const pkgFile = path.join(pluginsDir, 'package.json');
  if (!existsSync(pkgFile)) {
    writeFileSync(pkgFile, '{}', 'utf8');
  }
}

/**
 * 执行安装
 * @param command 命令
 * @param pkgName 包名
 * @param pluginsDir 插件目录
 */
function runInstall(command: string, pkgName: string, pluginsDir: string) {
  if (command === 'yarn') {
    shelljs.exec(`cd ${pluginsDir} && yarn add ${pkgName}`);
  } else {
    shelljs.exec(`cd ${pluginsDir} && ${command} install ${pkgName}`);
  }
}

/**
 * 运行
 * @param opts 选项
 * @param args 参数
 */
export default function run(opts: object, args: Array<string>) {
  assert(
    args[1] && !(args[1].indexOf('xy-plugin-') === -1),
    '无效的插件名，禧云插件格式为：xy-plugin-*',
  );
  console.log('开始安装包');
  const command = findCommand();
  console.log(`将使用${command}命令安装`);
  const pluginsDir = getPluginDir();
  console.log(`插件将会安装到"${pluginsDir}"目录下，请知晓`);
  createPackageJsonFile(pluginsDir);
  runInstall(command, args[1], pluginsDir);
}
