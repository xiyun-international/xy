import { block } from '../src/index';

describe('Block', () => {
  test('test with wrong repo url', async () => {
    expect.assertions(1);
    try {
      await block('http://xiyun.com.cn', './');
    } catch (e) {
      expect(e).toEqual(new Error("can't match any pattern"));
    }
  });
});
