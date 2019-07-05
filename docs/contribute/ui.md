# 添加公共组件

<blockquote class="green-tip">
<p>以添加 title 组件 到 Ant Design Vue 组件库为例，Element UI 组件开发流程与之类似。组件命名统一加前缀 “Xy”。</p>
</blockquote>

### 代码
---
在 `packages/ant-design/packages/` 目录下创建 `title` 文件夹，在该文件夹内创建：`index.js`、`index.vue`等，目录结构如下：

```
├── packages                   
│   ├── ant-design-ui          
│       ├── packages           
│           ├── title          
│               ├── index.js   
│               ├── index.vue  #组件实现代码
```
在`index.js` 中，导出组件的时候，需要给组件增加一个 install 方法，这样在存在子级组件的时候，可以方便地使用一个 `Vue.use()` 来代替多个 `Vue.component()`，例如：
```js
Vue.use(Input)
//vs
Vue.component(Input)
Vue.component(Input.Number)
```
具体代码如下：
```js
import XyTitle from './index.vue';

XyTitle.install = function (Vue) {
  Vue.component(XyTitle.name, XyTitle);
};

export default XyTitle;
```
### 代码配置
---
组件需在 `packages/ant-design/packages/index.js` 中引入并导出，具体如下：
```js {4,19}
import XyTitle from './title/index'; // 引入
...
const components = [
  XyTitle,
  ...
];
const install = (Vue) => { // 整体 install 方法
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export {
  version,
  install,
  XyTitle,
  ...
};
export default {
  version,
  install,
};
```

### 编辑 markdown 文件
---
找到项目目录中的 `docs/ant-design-ui` 文件夹，新建一个 `.md` 文件，并以组件名命名，例：`title.md`，它的基本组成：

```md
### title 穿梭框

#### 概述
这里简要描述组件功能 

#### 组件示例

#### 代码示例

#### API
这里说明属性、方法等 
```

### 配置
---
明确目标组件的类型是基础组件或是业务组件，这里我们以业务组件为例。<br>
将上面编辑好的 markdown 文件名 `title` 加到 `.vuepress/config.js` 以下位置：

```js{11}
sidebar: {
      ...
      
      '/ant-design/': [
       ...

        {
          title: '业务组件',
          collapsable: false,
          children: [
            'title',
          ],
        },
    }
```

### 构建 UI 组件

```shell
$ yarn build
```

### 发布 UI 组件

```shell
$ lerna publish
```
