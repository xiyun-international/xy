import { router } from '../src/index';

describe('Router', () => {
  test('test with empty string', () => {
    try {
      router('');
    } catch (e) {
      expect(e.message).toEqual('no directory specified');
    }
  });
  test('test with error directory', () => {
    try {
      router('./');
    } catch (e) {
      expect(e.message).toEqual('directory can not specified with "." or "./"');
    }
  });
  test('test with error execute directory', () => {
    try {
      router('user');
    } catch (e) {
      expect(e.message).toEqual('can not found the "src" directory');
    }
  });
});
