import { IOpt, IPluginAPI } from './types';

export default class Service {
  /**
   * 当前 CLI 的 Command，xy `create`
   */
  public command: string;

  /**
   * 其它参数选项 xy create `--version=1`
   */
  public args: object;

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
  constructor(command: string, args: object, opts?: IOpt) {
    // 注册命令和参数
    this.command = command;
    this.args = args;

    // 注入插件
    if (opts) {
      const { plugins } = opts;
      this.plugins = this.resolvePlugins(plugins);
    }
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
      throw new Error('插件或alias已经存在');
    } else {
      usePluginList[command] = onRun;
    }
  }

  /**
   * 运行插件
   */
  public run(): void {
    const onRun = this.plugins[this.command];
    if (onRun) {
      onRun(this);
    }
  }
}
