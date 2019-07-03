import execa from 'execa';
import { existsSync } from 'fs-extra';
import mkdirp from 'mkdirp';
import userHome from 'user-home';
import assert from 'assert';
import signale from 'signale';
import chalk from 'chalk';
import which from 'which';
import { join } from 'path';

async function findExecutor() {
  const executors = ['yarn', 'pnpm', 'cnpm', 'npm'];
  for (let i = 0; i < executors.length; i++) {
    try {
      which.sync(executors[i]);
      return executors[i];
    } catch (e) {}
  }
  signale.error(chalk.red('please install yarn or npm'));
  throw new Error('please install yarn or npm');
}

function findPluginsDir() {
  const tempPath = join(userHome, '.xy', 'plugins');
  if (!existsSync(tempPath)) {
    try {
      mkdirp.sync(tempPath);
    } catch (e) {
      throw new Error("can't create dir");
    }
  }
  return tempPath;
}

async function installPkg(pkg: string) {
  signale.start('Installing package...');

  const executor = await findExecutor();
  const pluginsDir = findPluginsDir();
  const pkgFile = join(pluginsDir, 'package.json');

  if (!existsSync(pkgFile)) {
    await execa('echo', ['{}', '>', 'package.json'], {
      cwd: pluginsDir,
      env: process.env,
    });
    signale.info('created package.json file');
  }

  if (executor === 'yarn') {
    try {
      await execa('yarn', ['add', pkg], {
        cwd: pluginsDir,
        env: process.env,
      });
    } catch (e) {
      throw new Error('install plugin error');
    }
  } else {
    try {
      await execa(executor, ['install', pkg], {
        cwd: pluginsDir,
        env: process.env,
      });
    } catch (e) {
      throw new Error('install plugin error');
    }
  }
  signale.success('install complete');
}

async function run(pkg: string) {
  assert(pkg && pkg.indexOf('xy-plugin-') < 0, 'Invalid package name');

  await installPkg(pkg);
}

export default run;
