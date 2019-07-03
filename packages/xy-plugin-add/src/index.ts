import add from './add';

export { add };

export default {
  name: 'xy-plugin-add',
  command: 'add',
  onRun: async api => {
    const { args } = api;
    if (args) {
      await add(args);
    }
  },
};
