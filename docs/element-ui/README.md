# 快速上手

## 简介

禧云 element-ui 是基于 ElementUI 开发的一套业务级别的 UI 组件，
主要目的是为了解决日常开发过程中避免重复封装经常会用到的一些带有业务性质的组件，比如：带有样式的标题，带有业务逻辑的按钮等。
如果你的项目中有使用类似的组件，那么你可以使用我们精心封装过的组件来避免你做大量的重复性的工作。

## 安装
```
$ yarn add @xiyun/element-ui
```

## 使用

### 1、全局引入

```js
// 引入样式
import '@xiyun/element-ui/lib/index.css';
import Vue from 'vue';
import XyUI from '@xiyun/element-ui';

Vue.use(XyUI);
new Vue().$mount('#app')
```

### 2、按需引入

借助 [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```shell
$ yarn add -D babel-plugin-component
```

然后，将`.babelrc`修改为：

```json
{
  "plugins": [
    [
      "component",
      {
        "libDir": "packages",
        "libraryName": "@xiyun/element-ui",
        "style": false
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 XyTitle 那么需要在 main.js 中写入以下内容：

```js
// 引入样式
import '@xiyun/element-ui/lib/index.css';
import Vue from 'vue';
// 引入标题组件
import {XyTitle} from '@xiyun/element-ui';

Vue.use(XyTitle)
// 或
Vue.component(XyTitle)

new Vue().$mount('#app')
```

在 vue 项目中使用：

```html
<template>
  <xy-title>禧云标题组件</xy-title>
</template>
```
