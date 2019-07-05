import block from './block';

export { block };

export default {
  name: 'xy-plugin-block',
  command: 'block',
  onRun: async api => {
    const { args: repo, opts } = api;
    const path = opts['p'] || opts['path'] ? opts['p'] || opts['path'] : './';
    await block(repo, path);
  },
};
