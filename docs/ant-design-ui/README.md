
# 快速上手

## 简介

禧云 ant-design-ui 是基于 Ant Design Vue 开发的一套业务级别的 UI 组件，
主要目的是为了解决日常开发过程中避免重复封装经常会用到的一些带有业务性质的组件，比如：带有样式的标题，带有业务逻辑的按钮等。
如果你的项目中有使用类似的组件，那么你可以使用我们精心封装过的组件来避免你做大量的重复性的工作。

## 安装
```
yarn add @xiyun/ant-design-ui
或
npm install @xiyun/ant-design-ui
```

## 使用

```js
// 引用组件样式
import '@xiyun/ant-design-ui/lib/index.css';

import Vue from 'vue';

// 示例1：全部引入使用 //
import XyUI from '@xiyun/ant-design-ui';
Vue.use(XyUI);
// -------------- //

// 示例2：部分引入 //
import {XyTitle} from '@xiyun/ant-design-ui';
Vue.use(XyTitle)
// 或
Vue.component(XyTitle)
// -------------- //


new Vue().$mount('#app')
```

在 vue 项目中使用：

```html
<template>
  <xy-title>禧云标题组件</xy-title>
</template>
```
