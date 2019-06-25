// 测试，正常要用 TS
module.exports = {
  name: 'xy-plugin-block',
  command: 'block',
  alias: 'b',
  onRun: api => {
    console.log('启动 block 插件');
    console.dir(api.command);
    console.dir(api.args);
    console.dir(api.args.version);
    console.log('block 插件停止');
  },
};
