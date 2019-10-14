import blockCreate from './block-create';

export default {
  name: 'xy-plugin-block-create',
  command: 'block-create',
  onRun: async api => {
    const {
      opts: {
        // args 可以取到命令行中不带选项的参数，
        // 数组，第0项是 block，取参时从第1项开始
        _: args,
      },
    } = api;

    blockCreate(args);
  },
};
