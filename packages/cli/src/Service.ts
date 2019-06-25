import { IConfig, IOpt, IPluginAPI } from './types';

export default class Service {
  public config: IConfig;

  /**
   * 当前服务注册的插件
   */
  public plugins: object;

  /**
   * CLi 所执行的命令
   */
  private cliCommand: string;

  /**
   * 初始化命令行、参数、插件
   * @param opts
   */
  constructor(opts: IOpt) {
    const { config, plugins } = opts;

    if (config.command.length === 0) {
      throw new Error('插件注册失败，`command` 命令不存在');
    }

    this.cliCommand = config.command[0];

    if (config.command.length > 1) {
      config.command = config.command.slice(1);
    }

    // 注册命令和参数
    this.config = config;

    // 注入插件
    this.plugins = this.resolvePlugins(plugins);
  }

  /**
   * 分析注入的插件
   * @param plugins inlinePlugins
   */
  private resolvePlugins(inlinePlugins: Array<object>): object {
    const usePluginList = {};

    if (!inlinePlugins) {
      return usePluginList;
    }

    // { "命令": "实现逻辑"} => { 'create': () => {} }
    inlinePlugins.forEach((plugin: IPluginAPI) => {
      // 注册插件
      this.registerPlugin(usePluginList, plugin.command, plugin.onRun);

      // 注册插件别名
      if (plugin.alias) {
        this.registerPlugin(usePluginList, plugin.alias, plugin.onRun);
      }
    });

    return usePluginList;
  }

  /**
   * 注册插件
   * @param usePluginList
   * @param command
   * @param onRun
   */
  private registerPlugin(usePluginList, command, onRun): void {
    if (usePluginList[command]) {
      throw new Error('别名已经存在');
    } else {
      usePluginList[command] = onRun;
    }
  }

  /**
   * 运行插件
   */
  public run(): void {
    const onRun = this.plugins[this.cliCommand];
    if (onRun) {
      onRun(this);
    }
  }
}
