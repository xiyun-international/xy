import { block } from '../src/index';

describe('Block', () => {
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

  test('Fill with wrong repo', () => {
    block('http://xiyun.com.cn', './');
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
