import { block } from '../src/index';

describe('Block', () => {
  test('Fill with wrong repo', async () => {
    try {
      await block('http://xiyun.com.cn', './');
    } catch (e) {
      expect(e.message).toBe("can't match any pattern");
    }
  });
});
