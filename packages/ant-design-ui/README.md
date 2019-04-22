## 禧云 ant-design-ui 组件库

## 安装
```
npm install @xiyun/ant-design-ui
```

## 使用

```js
// 引用样式
import 'ant-design-vue/dist/antd.css';
import '@xiyun/ant-design-ui/lib/index.css';

// 引用 UI 组件库
import Vue from 'vue';
import Antd from 'ant-design-vue'
import XyUI from '@xiyun/ant-design-ui';

// 使用组件库
Vue.use(Antd)
Vue.use(XyUI)

new Vue().$mount('#app')
```

在 vue 项目中使用：

```html
<template>
  <xy-title>禧云标题组件</xy-title>
</template>
```
