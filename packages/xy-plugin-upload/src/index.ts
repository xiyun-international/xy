import Upload from './upload';

export default {
  name: 'xy-plugin-qiniu',
  command: 'qiniu',
  onRun: async api => {
    const { opts } = api;
    opts['_'].splice(0, 1);
    await Upload(opts._);
  },
};
