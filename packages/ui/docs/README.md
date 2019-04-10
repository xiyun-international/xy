---
home: false
---

## 安装
```
npm install @xy/ui
```

## 使用

```js
// 引用样式
import 'xy-vue-ui/lib/index.css';

// 引用 UI 组件库
import Vue from 'vue';
import XyVueUI from 'xy-vue-ui';

// 使用组件库
Vue.use(XyVueUI)

new Vue().$mount('#app')
```

在 vue 项目中使用：

```html
<template>
  <xy-title>禧云普通标题组件</xy-title>
</template>
```
