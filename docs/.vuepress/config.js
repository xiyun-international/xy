module.exports = {
  dest: './dist',
  title: '禧云生态',
  description: '集合了 UI 组件，命令行和工具集',
  head: [
    ['link', {rel: 'icon', href: 'favicon.ico'}]
  ],
  markdown: {
    lineNumbers: true
  },
  theme: '@xiyun/vuepress-theme-xydocs',
  themeConfig: {
    // displayAllHeaders: true,
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '命令行工具', link: '/cli/' },
      { text: 'ElementUI组件', link: '/element-ui/' },
      { text: 'AntdUI组件', link: '/ant-design-ui/' },
      { text: 'GitHub', link: 'https://github.com/xiyun-international' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            '',
          ],
        }
      ],
      '/cli/': [
        {
          title: '命令行工具',
          collapsable: false,
          children: [
            '',
          ],
        }
      ],
      '/element-ui/': [
        {
          title: '介绍',
          collapsable: false,
          children: [
            '',
          ],
        },
        {
          title: '基础组件',
          collapsable: false,
          children: [
            'title',
            'wrapper',
          ],
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
          ],
        },
      ],
      '/ant-design-ui/': [
        {
          title: '介绍',
          collapsable: false,
          children: [
            '',
          ],
        },
        {
          title: '基础组件',
          collapsable: false,
          children: [
            'title',
            'wrapper',
          ],
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
        }
      ],
    }
  }
};

