---
home: false
---

## 安装
```
npm install @xiyun/element-ui
```

## 使用

```js
// 引用样式
import 'element-ui/lib/theme-chalk/index.css';
import '@xiyun/element-ui/lib/index.css';

// 引用 UI 组件库
import Vue from 'vue';
import ElementUI from 'element-ui';
import XyUI from '@xiyun/element-ui';

// 使用组件库
Vue.use(ElementUI)
Vue.use(XyUI)

new Vue().$mount('#app')
```

在 vue 项目中使用：

```html
<template>
  <xy-title>禧云标题组件</xy-title>
</template>
```
