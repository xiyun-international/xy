import Service from '../src/Service';

// 常用的数据部分
const cmd = ['create', 'ant-design-ui'];
const createPlugin = {
  command: 'create',
  alias: 'c',
  name: 'xy-plugin-create',
  onRun: _ => {
    console.log(_);
  },
};

describe('Service', () => {
  // 只输入命令（xy create）
  test('input command', () => {
    const service = new Service({
      cmd: ['create'],
    });
    expect(service.command).toBe('create');
  });

  // 输入命令行 + 参数（xy create ant-design-ui）
  test('input command and args', () => {
    const service = new Service({
      cmd,
    });

    expect(service.command).toBe('create');

    expect(service.args.length).toBe(1);
    expect(service.args).toContain('ant-design-ui');
  });

  // 注册插件，并支持 alias 命名方式
  test('register plugins', () => {
    const service = new Service({
      cmd,
      plugins: [createPlugin],
    });

    expect(service.plugins).toHaveProperty('create');
    expect(service.plugins).toHaveProperty('c');
  });

  // 插件别名已存在
  test('register plugin alias exists', () => {
    expect(() => {
      new Service({
        cmd,
        plugins: [
          createPlugin,
          {
            command: 'exists-plugin',
            alias: 'c',
            name: 'xy-plugin-create',
            onRun: _ => {
              console.log(_);
            },
          },
        ],
      });
    }).toThrow(Error);
  });

  // 执行 Plugin
  test('register and execute plugins', () => {
    // Mock Function
    const mockCallback = jest.fn(api => api.args);

    createPlugin.onRun = _ => {
      mockCallback(_);
    };

    const service = new Service({
      cmd,
      plugins: [createPlugin],
    });

    service.run();
    expect(mockCallback).toHaveBeenCalledWith(service);
  });
});
