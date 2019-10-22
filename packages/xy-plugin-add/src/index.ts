import add from './add';

export { add };

export default {
  name: 'xy-plugin-add',
  command: 'add',
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

    add(opts, args);
  },
};
