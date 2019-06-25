import Service from '../src/Service';

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
      cmd: ['create', 'ant-design-ui'],
    });

    expect(service.command).toBe('create');

    expect(service.args.length).toBe(1);
    expect(service.args).toContain('ant-design-ui');
  });

  // 注册插件，并支持 alias 命名方式
  test('register plugins', () => {
    const service = new Service({
      cmd: ['create', 'ant-design-ui'],
      plugins: [
        {
          command: 'create',
          alias: 'c',
          name: 'xy-plugin-create',
          onRun: _ => {
            console.log(_);
          },
        },
      ],
    });

    expect(service.plugins).toHaveProperty('create');
    expect(service.plugins).toHaveProperty('c');
  });

  // 插件别名已存在
  test('register plugin alias exists', () => {
    expect(() => {
      new Service({
        cmd: ['create', 'ant-design-ui'],
        plugins: [
          {
            command: 'create',
            alias: 'c',
            name: 'xy-plugin-create',
            onRun: _ => {
              console.log(_);
            },
          },
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

    const service = new Service({
      cmd: ['create', 'ant-design-ui'],
      plugins: [
        {
          command: 'create',
          alias: 'c',
          name: 'xy-plugin-create',
          onRun: _ => {
            mockCallback(_);
          },
        },
      ],
    });

    service.run();
    expect(mockCallback).toHaveBeenCalledWith(service);
  });
});
