import add from './add';

export { add };

export default {
  name: 'xy-plugin-add',
  command: 'add',
  onRun: async api => {
    await add(api.args);
  },
};
