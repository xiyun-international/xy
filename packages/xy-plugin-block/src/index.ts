import block from './block';
import assert from 'assert';

export { block };

export default {
  name: 'xy-plugin-block',
  command: 'block',
  onRun: async api => {
    // opts 可以取到带有选项的参数，选项为 key，参数为 value
    const {
      opts,
      opts: {
        // args 可以取到命令行中不带选项的参数，
        // 数组，第0项是 block，取参时从第1项开始
        _: args,
      },
    } = api;

    // 断言为 false 时才会抛出错误
    assert(args[1] !== undefined, '请填写要下载的区块 URL');

    /**
     * 选项 -p (path）
     * 如果下载的是一个目录，那么 -p 就表示要下载到哪个目录下，默认当前目录
     * 如果下载的是一个文件，那么 -p 就表示要把下载的文件重命名为指定的文件，默认不会重命名
     */
    const directory = opts.p ? opts.p : './';

    await block(args[1], directory);
  },
};
