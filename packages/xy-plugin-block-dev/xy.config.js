/**
 * block-dev 资源配置项
 * 基础资源：vue，lodash，moment
 * 默认 UI 资源：antd，element，vant
 * 说明：因为使用 cdn 引入 UI 组件的时候，vue 也需要是 cdn 引入的方式，所以把它与其它资源同等对待
 */
module.exports = {
  resources: [
    {
      importName: 'vue',
      globalVar: 'Vue',
      jsUrl: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
    },
    {
      importName: 'lodash',
      globalVar: '_',
      jsUrl: 'https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js',
    },
    {
      importName: 'moment',
      globalVar: 'moment',
      jsUrl: 'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
    },
  ],
  defaultUIResources: {
    antd: {
      importName: 'ant-design-vue',
      globalVar: 'antd',
      jsUrl:
        'https://cdn.jsdelivr.net/npm/ant-design-vue@1.4.0/dist/antd.min.js',
      cssUrl:
        'https://cdn.jsdelivr.net/npm/ant-design-vue@1.4.0/dist/antd.min.css',
    },
    element: {
      importName: 'element-ui',
      globalVar: 'Element',
      jsUrl: 'https://unpkg.com/element-ui/lib/index.js',
      cssUrl: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
    },
    vant: {
      importName: 'vant',
      globalVar: 'vant',
      jsUrl: 'https://cdn.jsdelivr.net/npm/vant@2.2/lib/vant.min.js',
      cssUrl: 'https://cdn.jsdelivr.net/npm/vant@2.2/lib/index.css',
    },
  },
};
