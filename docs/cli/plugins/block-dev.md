# block-dev

## 简介

禧云区块开发服务工具是为了方便开发独立 Vue 组件使用的，运行该命令后，会开启一个开发环境服务，并渲染你提供的组件，非常方便。

本环境默认提供了以下这些资源，你可以在组件中使用：
- ant-design-vue 全局 UI 组件，你无需额外引入即可使用。
- lodash 
- moment
- less

## 使用方法
```bash
$ xy block-dev [options] <vue-file>
```

## 选项参考

- `--port <8080>` 端口配置，默认 8080
- `--config <config-file>` 指定资源配置文件，优先级最高
- `--antd` 使用 ant-design-vue 组件资源，不定期维护版本
- `--element` 使用 element-ui 组件资源，不定期维护版本
- `--vant` 使用 vant-ui 组件资源，不定期维护版本

## 使用示例

```bash
$ xy block-dev demo.vue --vant
$ xy block-dev --port 8000 demo.vue
```

## 配置文件

如果你想要使用没有默认提供的资源，你可以使用配置文件的方式来引入。

首先，在执行命令的当前目录下创建一个名为`xy.config.js`的文件，我们将在这个文件里面写入资源配置项：

假设我们要引入`element-ui`和`echarts`：
```js
// xy.config.js 文件内容：
module.exports = {
  resources: [
    {
      // 在项目中使用 import 时的名称
      importName: 'element-ui',
      // 暴露出来的全局变量名
      globalVar: 'Element',
      // js
      jsUrl: 'https://unpkg.com/element-ui/lib/index.js',
      // css
      cssUrl: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
    },
    {
      importName: 'echarts',
      globalVar: 'echarts',
      jsUrl: 'https://cdn.bootcss.com/echarts/4.3.0/echarts.js',
    }
  ]
}
```

我们也提供了`package.json`文件的配置项支持：
```json
// package.json 文件内容：
"resources": [
    {
      "importName": "vant",
      "globalVar": "vant",
      "jsUrl": "https://cdn.jsdelivr.net/npm/vant@2.2/lib/vant.min.js",
      "cssUrl": "https://cdn.jsdelivr.net/npm/vant@2.2/lib/index.css"
    }
  ]
```

## 资源配置项的优先顺序
`--config <config-file>` > `xy.config.js` > `package.json` > `默认命令行选项：--element 等`
