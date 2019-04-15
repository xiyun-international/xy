module.exports = {
  dest: './dist',
  title: '禧云 UI 组件库',
  description: '禧云组件库',
  head: [
    ['link', {rel: 'icon', href: 'favicon.ico'}]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    displayAllHeaders: true,
    sidebar: [
      ['/', '安装和使用'],
      {
        title: '基础组件',
        collapsable: false,
        children: getComponentsPath([
          'title',
          'wrapper',
        ])
      },
      {
        title: '业务组件',
        collapsable: false,
        children: getComponentsPath([
          'transfer',
          'frame',
          'timeline',
          'table-tree',
          'countdown',
          'sens-text',
          'verification',
        ])
      }
    ],
  }
}

function getComponentsPath(components = []) {
  return components.map(item => {
    return '/pages/' + item;
  });
}
