import cp from 'child_process';

type opts = {};
export default function service(opts: opts, args: Array<any>) {
  console.log('正在开启 UI 服务');

  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const start = cp.spawn(command, ['run', 'serve'], {
    cwd: __dirname,
    // 将当前的工作目录传递给子进程, 用于操作文件
    env: Object.assign(process.env, {
      workDir: process.cwd(),
    }),
  });

  start.stdout.on('data', data => {
    // 临时处理 屏蔽掉启动消息
    if (
      data.indexOf('Note that the development build is not optimized.') !==
        -1 ||
      data.indexOf('To create a production build, run yarn build.') !== -1 ||
      data.indexOf('INFO  Starting development server...') !== -1 ||
      data.indexOf('DONE  Compiled successfully in') !== -1 ||
      data.indexOf('@xiyun/xy-plugin-ui@') !== -1 ||
      data.indexOf('vue-cli-service serve') !== -1
    ) {
      return;
    }
    process.stdout.write(data);
  });

  start.stderr.on('data', data => {
    process.stdout.write(data);
  });
}
