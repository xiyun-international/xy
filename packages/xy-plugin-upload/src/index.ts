import Upload from './upload';

export default {
  name: 'xy-plugin-upload',
  command: 'upload',
  onRun: async api => {
    const { opts } = api;
    opts['_'].splice(0, 1);
    await Upload(opts._);
  },
};
