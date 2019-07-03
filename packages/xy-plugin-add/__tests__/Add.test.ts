import { add } from '../src/index';

describe('Add', () => {
  test('test with no "xy-plugin-*" format name', async () => {
    try {
      await add('foo');
    } catch (e) {
      expect(e.message).toEqual('Invalid package name');
    }
  });

  test('test with wrong npm pkg', async () => {
    try {
      await add('@xiyun/xy-plugin-create000');
    } catch (e) {
      expect(e.message).toEqual('install plugin error');
    }
  });
});
