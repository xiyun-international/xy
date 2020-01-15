### context 内容包裹组件

#### 概述

组件附带了面包屑，标题和标签状态的样式，使用它可以无需编写这些重复性的内容。

#### 组件示例

使用 context 组件后，你只需要关心内容的展现，无需再写面包屑，标题等样式：

<div style="background: #EDF0F4; border: 1px solid #ccc;height: 800px;">
  <antd-xy-context
    :breadcrumb="[
      { name: '服务商中心'},
      { name: '协作费管理', path: ''}, 
      { name: '账单详情' }
    ]"
    title="账单详情"
    tag="审核中"
    :tag-status="5"
  >
    <p>我是内容区</p>
    <p>我是内容区</p>
    <p>我是内容区</p>
    <div slot="right">
      <a-button type="primary">打印账单</a-button>
    </div>
  </antd-xy-context>
</div>

context 组件分块展示：

<div style="background: #EDF0F4; border: 1px solid #ccc;height: 600px;">
  <antd-xy-context
    :breadcrumb="[
      { name: '服务商中心'},
      { name: '协作费管理', path: ''}, 
      { name: '账单详情' }
    ]"
    title="账单详情"
    tag="审核中"
    :tag-status="5"
  >
    <antd-xy-context-item title="概览图">
      概览图数据
    </antd-xy-context-item>
    <antd-xy-context-item title="项目验收信息">
      项目验收信息
    </antd-xy-context-item>
    <antd-xy-context-item title="操作日志">
      项目验收信息
    </antd-xy-context-item>
  </antd-xy-context>
</div>

#### 代码示例

```html
<xy-context
  :breadcrumb="[
    { name: '服务商中心', path: ''},
    { name: '协作费管理', path: ''}, 
    { name: '账单详情' }
  ]"
  title="账单详情"
  tag="审核中"
  :tag-status="5"
>
  <p>我是内容区</p>
  <p>我是内容区</p>
  <p>我是内容区</p>
  <p>我是内容区</p>
  <p>我是内容区</p>
  <p>我是内容区</p>
  <p>我是内容区</p>
  <p>我是内容区</p>
  <div slot="right">
    <a-button type="primary">打印账单</a-button>
  </div>
</xy-context>
```

#### 代码示例 - 使用 xy-context-item

```html
<xy-context
    :breadcrumb="[
      { name: '服务商中心'},
      { name: '协作费管理', path: ''},
      { name: '账单详情' }
    ]"
    title="账单详情"
    tag="审核中"
    :tag-status="5"
  >
    <xy-context-item title="概览图">
      概览图数据
    <xy-context-item>
    <xy-context-item title="项目验收信息">
      项目验收信息
    <xy-context-item>
    <xy-context-item title="操作日志">
      项目验收信息
    </xy-context-item>
</xy-context>
```

#### API

| 属性 | 类型 | 说明 | 默认值 |
| --- | --- | --- | :-: |
| breadcrumb | Array | 面包屑数据 | [] |
| title | String | 如果不提供 title，则默认会读取面包屑最后一项作为标题 | '' |
| tag | String | 出现在标题右侧的 tag | '' |
| tagStatus | Number | 表示 tag 状态，可选值有 2，3，5 | 0 |
| slot | VNode | 组件内容 | 无 |
| slot="right" | VNode | 标题右侧内容 | 无 |

#### API - xy-context-item

| 属性 | 类型 | 说明 | 默认值 |
| --- | --- | --- | :-: |
| title | String | 标题 | '' |
