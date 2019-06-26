import Create from './create';
import inquirer from 'inquirer';
import assert from 'assert';

export { Create };

export default {
  name: 'xy-plugin-create',
  command: 'create',
  alias: 'c',
  onRun: async api => {
    const { args: appName } = api;
    assert(appName, 'No appName specified');

    (async () => {
      const { ui } = await inquirer.prompt({
        name: 'ui',
        type: 'list',
        message: 'Which UI template do you want to create?',
        choices: [
          { name: 'element-ui-template', value: 'e' },
          { name: 'ant-design-ui-template', value: 'a' },
        ],
      });
      const { mode } = await inquirer.prompt({
        name: 'mode',
        type: 'list',
        message: 'Please select a mode:',
        choices: [
          { name: 'Full layout(with side nav and header bar).', value: 'full' },
          {
            name: 'Simple layout(with out side nav and header var).',
            value: 'simple',
          },
        ],
      });

      const create = new Create(appName, { ui, mode });
      await create.run();
    })();
  },
};
