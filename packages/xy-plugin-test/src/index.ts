import jest from './jest';

export { jest };

export default {
  name: 'xy-plugin-test',
  command: 'test',
  onRun: async api => {
    const { opts } = api;
    await jest(opts);
  },
};
