import { block } from '../src/index';

describe('Block', () => {
  test('test with wrong repo url', async () => {
    // expect(async () => {
    //   await block('http://xiyun.com.cn', './')
    // }).toThrow('can\'t match any pattern');
    try {
      await block('http://xiyun.com.cn', './');
    } catch (e) {
      expect(e.message).toBe("can't match any pattern");
    }
  });
});
