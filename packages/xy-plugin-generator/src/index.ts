import generator from './generator';
import { block } from '../../xy-plugin-block/src';

export { generator };

export default {
  name: 'xy-plugin-generator',
  command: 'generator',
  alias: 'g',
  onRun: async api => {
    console.log(api.args);
    // const { args: repo, opts } = api;
    // const path = opts['p'] || opts['path'] ? opts['p'] || opts['path'] : './';
    // await generator(repo, path);
  },
};
