# 添加组件

<blockquote class="green-tip">
<p>以开发 ElementUI 组件为例，AntdUI 组件开发流程与之类似。</p>
</blockquote>

### 编辑markdown文件
---
首先编辑目标组件的markdown文档：<br>
找到项目目录中的 `docs/element-ui` 文件夹，新建一个 `.md` 文件，并以组件名命名，例：`transfer.md`，它的基本组成：

```md
### transfer 穿梭框

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
将上面编辑好的 markdown 文件名 `transfer` 加到 `.vuepress/config.js` 以下位置：

```js
sidebar: {
      ...
      
      '/element-ui/': [
       ...

        {
          title: '业务组件',
          collapsable: false,
          children: [
            'transfer',
          ],
        },
    }

```
### 代码
---
以 transfer 组件为例。需在 `packages/element-ui/packages/` 目录下创建 `transfer` 文件夹，在该文件夹内创建：`index.js`、`transfer.vue`等
### 代码配置
---
组件需在 `packages/element-ui/packages/index.js` 中引入并导出