import { IConfig, IPluginAPI } from './types';

export default class Service {
  /**
   * 当前输入的命令行
   */
  public command: string;

  /**
   * 当前输入的参数
   */
  public args: string[];

  /**
   * 当前服务注册的插件
   */
  public plugins: object;

  /**
   * 初始化命令行、参数、插件
   * @param config
   */
  constructor(config: IConfig) {
    const { cmd, plugins } = config;

    // 分析命令行传递的命令
    const { command, args } = this.resolveCommand(cmd);

    // 注册命令和参数
    this.command = command;
    this.args = args;

    // 注入插件
    this.plugins = this.resolvePlugins(plugins);
  }

  /**
   * 分析命令和参数
   * @param cmd
   */
  private resolveCommand(cmd: string[]) {
    try {
      const args = cmd.length > 1 ? cmd.slice(1) : [];

      return {
        command: cmd[0],
        args,
      };
    } catch (_) {
      throw new Error('插件注册失败，`command` 命令不存在');
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
      throw new Error('别名已经存在');
    } else {
      usePluginList[command] = onRun;
    }
  }

  /**
   * 运行插件
   */
  public run() {
    const onRun = this.plugins[this.command];
    if (onRun) {
      onRun(this);
    }
  }
}
