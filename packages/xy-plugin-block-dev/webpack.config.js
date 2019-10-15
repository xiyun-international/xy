const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: [path.resolve(__dirname, './vue-src/main.js')],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: require.resolve('vue-loader'),
          options: {
            compilerOptions: {
              preserveWhitespace: false,
            },
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          /* config.module.rule('images').use('url-loader') */
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 4096,
              fallback: {
                loader: require.resolve('file-loader'),
                options: {
                  name: 'img/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          /* config.module.rule('svg').use('file-loader') */
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'img/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          /* config.module.rule('media').use('url-loader') */
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 4096,
              fallback: {
                loader: require.resolve('file-loader'),
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          /* config.module.rule('fonts').use('url-loader') */
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 4096,
              fallback: {
                loader: require.resolve('file-loader'),
                options: {
                  name: 'fonts/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: require.resolve('vue-style-loader'),
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
              {
                loader: require.resolve('css-loader'),
                options: {
                  sourceMap: false,
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                },
              },
            ],
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
              {
                loader: require.resolve('vue-style-loader'),
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              /* config.module.rule('css').oneOf('vue').use('css-loader') */
              {
                loader: require.resolve('css-loader'),
                options: {
                  sourceMap: false,
                  importLoaders: 1,
                },
              },
            ],
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: require.resolve('vue-style-loader'),
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
              {
                loader: require.resolve('css-loader'),
                options: {
                  sourceMap: false,
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                },
              },
            ],
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
              {
                loader: require.resolve('vue-style-loader'),
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              /* config.module.rule('css').oneOf('normal').use('css-loader') */
              {
                loader: require.resolve('css-loader'),
                options: {
                  sourceMap: false,
                  importLoaders: 1,
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('postcss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: require.resolve('vue-style-loader'),
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('css-loader') */
              {
                loader: require.resolve('css-loader'),
                options: {
                  sourceMap: false,
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                },
              },
            ],
          },
          /* config.module.rule('postcss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('postcss').oneOf('vue').use('vue-style-loader') */
              {
                loader: require.resolve('vue-style-loader'),
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              /* config.module.rule('postcss').oneOf('vue').use('css-loader') */
              {
                loader: require.resolve('css-loader'),
                options: {
                  sourceMap: false,
                  importLoaders: 1,
                },
              },
            ],
          },
          /* config.module.rule('postcss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('postcss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: require.resolve('vue-style-loader'),
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('css-loader') */
              {
                loader: require.resolve('css-loader'),
                options: {
                  sourceMap: false,
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                },
              },
            ],
          },
          /* config.module.rule('postcss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('postcss').oneOf('normal').use('vue-style-loader') */
              {
                loader: require.resolve('vue-style-loader'),
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              /* config.module.rule('postcss').oneOf('normal').use('css-loader') */
              {
                loader: require.resolve('css-loader'),
                options: {
                  sourceMap: false,
                  importLoaders: 1,
                },
              },
            ],
          },
        ],
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('less').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: require.resolve('vue-style-loader'),
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              /* config.module.rule('less').oneOf('vue-modules').use('css-loader') */
              {
                loader: require.resolve('css-loader'),
                options: {
                  sourceMap: false,
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                },
              },
              /* config.module.rule('less').oneOf('vue-modules').use('less-loader') */
              {
                loader: require.resolve('less-loader'),
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
          /* config.module.rule('less').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('less').oneOf('vue').use('vue-style-loader') */
              {
                loader: require.resolve('vue-style-loader'),
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              /* config.module.rule('less').oneOf('vue').use('css-loader') */
              {
                loader: require.resolve('css-loader'),
                options: {
                  sourceMap: false,
                  importLoaders: 1,
                },
              },
              /* config.module.rule('less').oneOf('vue').use('less-loader') */
              {
                loader: require.resolve('less-loader'),
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
          /* config.module.rule('less').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('less').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: require.resolve('vue-style-loader'),
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              /* config.module.rule('less').oneOf('normal-modules').use('css-loader') */
              {
                loader: require.resolve('css-loader'),
                options: {
                  sourceMap: false,
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]_[local]_[hash:base64:5]',
                },
              },
              /* config.module.rule('less').oneOf('normal-modules').use('less-loader') */
              {
                loader: require.resolve('less-loader'),
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              /* config.module.rule('less').oneOf('normal').use('vue-style-loader') */
              {
                loader: require.resolve('vue-style-loader'),
                options: {
                  sourceMap: false,
                  shadowMode: false,
                },
              },
              /* config.module.rule('less').oneOf('normal').use('css-loader') */
              {
                loader: require.resolve('css-loader'),
                options: {
                  sourceMap: false,
                  importLoaders: 1,
                },
              },
              /* config.module.rule('less').oneOf('normal').use('less-loader') */
              {
                loader: require.resolve('less-loader'),
                options: {
                  sourceMap: false,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
