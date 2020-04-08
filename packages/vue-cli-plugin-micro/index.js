let domain = '';
if (process.env.VUE_APP_PUBLIC_PATH) {
  domain = process.env.VUE_APP_PUBLIC_PATH;
} else if (process.env.NODE_ENV === 'production') {
  domain = `//${process.env.JOB_NAME.replace('_', '.')}.yunzong:11315`;
}

module.exports = (api, options) => {
  options.publicPath = domain;
  options.pages = {
    index: 'src/main.js',
    micro: 'src/micro-main.js',
  };

  api.chainWebpack(config => {
    config.output.set('library', '[name]');
    config.output.set('filename', '[name].js');
    config.output.set('libraryTarget', 'umd');
  });
};
