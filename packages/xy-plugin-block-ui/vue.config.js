const serverApp = require('./server/app');
const path = require('path');

module.exports = {
  configureWebpack(config) {
    config.resolve.alias['@'] = path.resolve('frontend');
  },
  devServer: {
    proxy: {
      '/ui-ws': {
        target: 'ws://localhost:8081/',
        ws: true,
      },
    },
    before: function(app, server) {
      serverApp(app, server);
    },
    open: true,
  },
};
