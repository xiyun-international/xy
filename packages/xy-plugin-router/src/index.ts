import router from './router';

export { router };

export default {
  name: 'xy-plugin-router',
  command: 'router',
  onRun: async api => {
    // console.log(args);
    router(api.args);
  },
};
