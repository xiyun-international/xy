const serverApp = require('./server/app');
const path = require('path');

module.exports = {
  configureWebpack(config) {
    config.resolve.alias['@'] = path.resolve('frontend');
  },
  devServer: {
    before: function(app) {
      serverApp(app);
    },
    open: true,
  },
};
