const mockServer = require('./mock-server');

module.exports = (api, options) => {
  // console.log(api, api.chainWebpack);
  // api.chainWebpack(config => {
  //   console.log('config: ', config.dev);
  //   config.dev.before(app => {
  //     mockServer()
  //   })
  // })
  // PluginAPI {
  //   id: 'vue-cli-plugin-mock',
  //   service:
  //    Service {
  //      initialized: true,
  //      context: '/Users/yue.yu/Documents/xiyun/xy-qd-frontend',
  //      inlineOptions: undefined,
  //      webpackChainFns:
  //       [ [Function],
  //         [Function],
  //         [Function],
  //         [Function],
  //         [Function],
  //         [Function],
  //         [Function] ],
  //      webpackRawConfigFns: [],
  //      devServerConfigFns: [],
  //      commands:
  //       { serve: [Object],
  //         build: [Object],
  //         inspect: [Object],
  //         help: [Object],
  //         lint: [Object] },
  //      pkgContext: '/Users/yue.yu/Documents/xiyun/xy-qd-frontend',
  //      pkg:
  //       { name: 'xy-qd-frontend',
  //         version: '2.2.0',
  //         private: true,
  //         scripts: [Object],
  //         dependencies: [Object],
  //         devDependencies: [Object],
  //         gitHooks: [Object],
  //         license: 'MIT',
  //         'lint-staged': [Object],
  //         readme: 'ERROR: No README data found!',
  //         _id: 'xy-qd-frontend@2.2.0' },
  //      plugins:
  //       [ [Object],
  //         [Object],
  //         [Object],
  //         [Object],
  //         [Object],
  //         [Object],
  //         [Object],
  //         [Object],
  //         [Object],
  //         [Object],
  //         [Object],
  //         [Object] ],
  //      pluginsToSkip: Set {},
  //      modes:
  //       { serve: 'development',
  //         build: 'production',
  //         inspect: 'development' },
  //      mode: 'development',
  //      projectOptions:
  //       { configureWebpack: [Object],
  //         filenameHashing: true,
  //         publicPath: '',
  //         pages: [Object],
  //         chainWebpack: [Function: chainWebpack],
  //         baseUrl: '',
  //         outputDir: 'dist',
  //         assetsDir: '',
  //         indexPath: 'index.html',
  //         runtimeCompiler: false,
  //         transpileDependencies: [],
  //         productionSourceMap: true,
  //         parallel: true,
  //         crossorigin: undefined,
  //         integrity: false,
  //         css: {},
  //         lintOnSave: true,
  //         devServer: {}
  //       }
  //     }
  // }
  api.service.projectOptions.devServer.before = app => {
    mockServer(app);
  };
};
