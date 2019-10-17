import createServer from './create-server';

export default {
  name: 'xy-plugin-mock',
  command: 'mock',
  alias: 'm',
  onRun: async api => {
    const { opts } = api;
    opts['_'].splice(0, 1);
    await createServer(opts);
  },
};
