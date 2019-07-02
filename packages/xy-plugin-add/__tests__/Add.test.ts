import { add } from '../src/index';

describe('Add', () => {
  test('test with wrong npm pkg', async () => {
    try {
      await add('@xiyun/xy-plugin-create000');
    } catch (e) {
      expect(e.message).toEqual('install plugin error');
    }
  });
});
