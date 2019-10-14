import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config.js';
import mergeConfig from 'webpack-merge';
import path from 'path';

type opts = {
  // 服务运行端口
  port: number;
};

/**
 * 运行
 * @param opts 选项
 * @param args 参数
 */
export default function run(opts: opts, args: Array<string>): void {
  // --port 代表端口选项，默认 8080 端口
  const port = opts.port || 8080;
  // 入口文件
  const entryFile = path.resolve(args[1]);

  const configs = mergeConfig(webpackConfig, {
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          ENTRY_FILE: JSON.stringify(entryFile),
        },
      }),
    ],
  });

  const compiler = Webpack(configs);

  // 开发服务配置项
  const devServerOptions = {
    open: true,
    stats: {
      colors: true,
    },
  };

  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(port, '127.0.0.1', () => {
    console.log(`Starting server on http://localhost:${port}`);
  });
}
