import router from './router';

export { router };

export default {
  name: 'xy-plugin-router',
  command: 'router',
  onRun: async args => {
    await router();
  },
};
