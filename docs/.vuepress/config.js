module.exports = {
  base: '/xy/',
  dest: './dist',
  title: '禧云前端生态',
  description: '让禧云的 ISV 合作伙伴只需专注于业务',
  head: [['link', { rel: 'icon', href: 'favicon.ico' }]],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      {
        text: '生态系统',
        items: [
          { text: '@xiyun/cli', link: '/cli/' },
          { text: '@xiyun/utils', link: '/utils/' },
          { text: '底层样式', link: '/style/' },
          { text: 'Element UI 组件', link: '/element-ui/' },
          { text: 'Ant Design UI 组件', link: '/ant-design-ui/' },
        ],
      },
      { text: '参与贡献', link: '/contribute/' },
      { text: 'GitHub', link: 'https://github.com/xiyun-international' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [''],
        },
      ],
      '/cli/': [
        {
          title: '命令行',
          collapsable: false,
          children: [''],
        },
        {
          title: '插件',
          collapsable: false,
          children: [
            'plugins/add',
            'plugins/block',
            'plugins/router',
            'plugins/test',
            'plugins/generator',
            'plugins/init',
          ],
        },
      ],
      '/element-ui/': [
        {
          title: '开发指南',
          collapsable: false,
          children: [''],
        },
        {
          title: '基础组件',
          collapsable: false,
          children: ['title', 'wrapper'],
        },
        {
          title: '业务组件',
          collapsable: false,
          children: [
            'transfer',
            'frame',
            'timeline',
            'table-tree',
            'countdown',
            'sens-text',
            'verification',
            'steps',
          ],
        },
      ],
      '/ant-design-ui/': [
        {
          title: '开发指南',
          collapsable: false,
          children: [''],
        },
        {
          title: '基础组件',
          collapsable: false,
          children: ['title', 'wrapper'],
        },
        {
          title: '业务组件',
          collapsable: false,
          children: [
            'context',
            'frame',
            'timeline',
            'countdown',
            'sens-text',
            'verification',
          ],
        },
      ],
      '/contribute/': [
        {
          title: '参与贡献',
          collapsable: false,
          children: ['', 'ui', 'cli', 'plugin', 'utils'],
        },
      ],
      '/style/': [
        {
          title: '底层样式',
          collapsable: false,
          children: [''],
        },
      ],
      '/utils/': [
        {
          title: '简介',
          collapsable: false,
          children: [''],
        },
        {
          title: 'API',
          collapsable: false,
          children: [
            'api/http',
            // 'api/post',
            // 'api/get',
          ],
        },
        {
          title: '指令',
          collapsable: false,
          children: ['directive/clickoutside'],
        },
        {
          title: '过滤',
          collapsable: false,
          children: [
            // 'filter/filters',
            'filter/hidePhoneNumber',
            'filter/hideIDMiddle',
            'filter/hideMailMiddle',
          ],
        },
        {
          title: '表单验证',
          collapsable: false,
          children: ['validate/validFormInfo', 'validate/validForm'],
        },
        {
          title: 'iframe 相关',
          collapsable: false,
          children: [
            'iframe/notifyHeightChange',
            'iframe/receiveHeightChange',
            'iframe/notifyLogout',
          ],
        },
      ],
    },
  },
};
