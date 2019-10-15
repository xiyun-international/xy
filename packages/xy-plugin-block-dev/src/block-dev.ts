import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';
import webpackConfig from '../webpack.config.js';
import mergeConfig from 'webpack-merge';
import path from 'path';
import assert from 'assert';
import fs from 'fs';

import xyConfig from '../xy.config.js';

// 资源项
type resourceItem = {
  importName: string;
  globalVar: string;
  cssUrl: string;
  jsUrl: string;
};

/**
 * 解析资源配置项
 * @param resourceData 资源配置项
 * @param externals 配置外部扩展
 * @param resourceLists 解析后的资源列表
 */
function setXyConfig(
  resourceData: Array<resourceItem>,
  externals: object,
  resourceLists: Array<string>,
) {
  resourceData.forEach(item => {
    if (item.importName) {
      externals[item.importName] = item.globalVar;
    }
    if (item.cssUrl) {
      resourceLists.push(item.cssUrl);
    }
    if (item.jsUrl) {
      resourceLists.push(item.jsUrl);
    }
  });
}

type UIType = {
  antd: resourceItem;
  element: resourceItem;
  vant: resourceItem;
};

/**
 * 设置命令行选项提供的 UI 资源
 * @param defaultUI 默认 UI 数据
 * @param type 从选项读取的 UI 类型
 * @param externals 配置外部扩展
 * @param resourceLists 解析后的资源列表
 */
function setOptsConfig(
  defaultUI: UIType,
  type: string,
  externals: object,
  resourceLists: Array<string>,
) {
  const UI = defaultUI[type];
  externals[UI.importName] = UI.globalVar;
  resourceLists.push(UI.jsUrl, UI.cssUrl);
}

/**
 * 设置用户资源配置项
 * @param configFile 用户配置文件
 * @param externals 配置外部扩展
 * @param resourceLists 解析后的资源列表
 */
function setUserConfig(
  configFile: string,
  externals: object,
  resourceLists: Array<string>,
) {
  const userConfig = require(path.resolve(configFile));
  // 设置用户资源
  setXyConfig(userConfig.resources, externals, resourceLists);
}

/**
 * 校验执行逻辑的条件
 * @param configFile 配置文件
 * @param error 如果文件不存在是否抛出错误
 * @return true - 配置项正常 | false - 配置项无效
 */
function checkCondition(configFile: string, error: boolean = false): boolean {
  if (!fs.existsSync(path.resolve(configFile))) {
    if (error) {
      throw new Error(`${configFile} 文件不存在，请检查`);
    }
    return false;
  }
  const userConfig = require(path.resolve(configFile));
  const { resources } = userConfig;
  if (!(resources && resources instanceof Array)) {
    return false;
  }
  return true;
}

type opts = {
  // 服务运行端口
  port: number;
  // 资源配置项
  config: string;
  // UI 配置项
  vant: boolean;
  element: boolean;
  antd: boolean;
};

/**
 * 运行
 * @param opts 选项
 * @param args 参数
 */
export default function run(opts: opts, args: Array<string>) {
  // --port 代表端口选项，默认 8080 端口
  const port = opts.port || 8080;

  // 入口文件
  const entryFile = path.resolve(args[1]);

  assert(fs.existsSync(entryFile), '没有提供组件或组件不存在');

  const externals = {};
  const resourceLists = [];

  // 设置基础资源
  setXyConfig(xyConfig.resources, externals, resourceLists);

  /**
   * 按哪种条件来执行逻辑，优先级依次降低
   * 1、appoint - 指定配置文件
   * 2、config - 当前配置文件
   * 3、package - 当前 package.json
   * 4、option - 根据选项参数
   */
  let condition = 'option';
  let isEnd = false;

  // 如果指定了资源配置文件，那么优先级最高
  if (opts.config && checkCondition(opts.config, true)) {
    condition = 'appoint';
    isEnd = true;
    setUserConfig(opts.config, externals, resourceLists);
  }

  // 如果用户当前目录存在 xy.config.js 配置文件
  if (isEnd === false && checkCondition('xy.config.js')) {
    condition = 'config';
    isEnd = true;
    setUserConfig('xy.config.js', externals, resourceLists);
  }

  // 如果用户当前目录存在 package.json 文件
  if (isEnd === false && checkCondition('package.json')) {
    condition = 'package';
    isEnd = true;
    setUserConfig('package.json', externals, resourceLists);
  }

  // 上述条件不成立，就读取选项
  if (isEnd === false && condition === 'option') {
    const defaultUI = xyConfig.defaultUIResources;
    if (opts.vant) {
      setOptsConfig(defaultUI, 'vant', externals, resourceLists);
    } else if (opts.element) {
      setOptsConfig(defaultUI, 'element', externals, resourceLists);
    } else {
      // 默认使用 antd UI
      setOptsConfig(defaultUI, 'antd', externals, resourceLists);
    }
  }

  const configs = mergeConfig(webpackConfig, {
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          ENTRY_FILE: JSON.stringify(entryFile),
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'public', 'index.html'),
      }),
      new HtmlWebpackTagsPlugin({
        tags: resourceLists,
        append: false,
      }),
    ],
  });

  const compiler = Webpack(configs);

  // 开发服务配置项
  const devServerOptions = {
    open: true,
    stats: 'errors-warnings',
  };

  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(port, '127.0.0.1', () => {
    console.log(`Starting server on http://localhost:${port}`);
  });
}
