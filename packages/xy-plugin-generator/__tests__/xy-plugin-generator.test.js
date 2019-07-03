'use strict';

import { generator } from '../src/index';

describe('generator', () => {
  test('test with wrong repo url', async () => {
    expect.assertions(1);
    try {
      await generator('http://xiyun.com.cn', './');
    } catch (e) {
      expect(e).toEqual(new Error("can't match any pattern"));
    }
  });
});
