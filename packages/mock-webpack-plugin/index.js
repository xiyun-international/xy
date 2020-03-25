const forever = require('forever-monitor');
const path = require('path');

// 在插件函数的 prototype 上定义一个 `apply` 方法。
// createServer.prototype.apply = function(compiler) {
//   // 指定一个挂载到 webpack 自身的事件钩子。
//   compiler.plugin('afterCompile', function(compilation /* 处理 webpack 内部实例的特定数据。*/, callback) {
//     console.log("This is an example plugin!!!");

//     // 功能完成后调用 webpack 提供的回调。
//     callback();
//   });
// };
class MockWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
    this.isWatching = false; // 是否watch模式

    this.watcher = null;
    this.cacheExportNameMap = {};
    this.compileHasError = false;
  }

  // init(stats) {
  //   this.compileHasError = stats.hasErrors();

  //   if (this.isWatching && !this.watcher && !this.compileHasError) {

  //     this.watcher = chokidar.watch(this.options.dir || '__mock__', {
  //       usePolling: true,
  //       ignored: this.options.ignored
  //     });
  //     this.watcher.on('change', _.debounce(this.handleChange.bind(this)(), 0))
  //       .on('unlink', _.debounce(this.handleChange.bind(this)(true), 0));
  //   }
  // }

  apply(compiler) {
    compiler.hooks.afterPlugins.tap('MockWebpackPlugin', () => {
      console.log('1This is an example plugin!!!');
      // fetchMockData()
      const script = path.join(__dirname, '.', 'create-server.js');
      const child = new forever.Monitor(script);
      child.start();
      child.on('watch:restart', function(info) {
        console.error('Restarting script because ' + info.file + ' changed');
      });

      child.on('restart', function() {
        console.error('Forever restarting script for ' + child.times + ' time');
      });

      child.on('exit:code', function(code) {
        console.error('Forever detected script exited with code ' + code);
      });
      // createServer()
    });
    // if (compiler.hooks) {
    //   compiler.hooks.done.tap('MockWebpackPlugin', () => {
    //     console.log("1This is an example plugin!!!");
    //     createServer()
    //   });
    // } else {
    //   compiler.plugin('done', function(compilation /* 处理 webpack 内部实例的特定数据。*/, callback) {
    //     console.log("2This is an example plugin!!!");
    //     // createServer(this.options)
    //     // console.log('4234');
    //     // 功能完成后调用 webpack 提供的回调。
    //     callback();
    //   });
    // }

    // const init = this.init.bind(this);
    // const watchClose = this.watchClose.bind(this);

    // if (compiler.hooks) {
    //   compiler.hooks.watchRun.tap('AutoExport', () => {
    //     this.isWatching = true;
    //   });
    //   compiler.hooks.done.tap('AutoExport', init);
    //   compiler.hooks.watchClose.tap('AutoExport', watchClose);
    // } else {
    //   compiler.plugin('watchRun', () => {
    //     this.isWatching = true;
    //   });
    //   compiler.plugin('done', init);
    //   compiler.plugin('watchClose', watchClose);
    // }
  }
}
module.exports = MockWebpackPlugin;
