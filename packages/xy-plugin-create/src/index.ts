import Create from './create';
import inquirer from 'inquirer';
import assert from 'assert';

export { Create };

export default {
  name: 'xy-plugin-create',
  command: 'create',
  onRun: async api => {
    const { args: appName } = api;
    assert(appName, 'No appName specified');

    (async () => {
      const { ui } = await inquirer.prompt({
        name: 'ui',
        type: 'list',
        message: '您要对接哪套系统?',
        choices: [
          { name: '商家中心', value: 'e' },
          { name: '开放平台', value: 'a' },
        ],
      });
      const { mode } = await inquirer.prompt({
        name: 'mode',
        type: 'list',
        message: '请选择模板:',
        choices: [
          { name: '独立的管理后台', value: 'full' },
          { name: '以第三方应用接入', value: 'simple' },
        ],
      });

      const create = new Create(appName, { ui, mode });
      await create.run();
    })();
  },
};
