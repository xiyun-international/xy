### title 标题

#### 概述

title 标题组件可以用于页面中某块的标题，它包含两个样式，一个是普通的标题，一个是带有前缀 icon 的样式。

#### 代码示例

```html
<xy-title large>大号标题</xy-title>
<xy-title no-top-margin>小号标题</xy-title>
<xy-title no-top-margin>小号标题<span slot="sub-title">slot副标题</span></xy-title>
<xy-title no-top-margin show-icon large sub-title="副标题">
  拥有右侧内容的大号标题
  <template slot="right">
    <a-button type="primary">按钮</a-button>
  </template>
</xy-title>
<xy-title no-top-margin show-icon sub-title="副标题">
  拥有右侧内容的小号标题
  <template slot="right">
    <a-button type="primary">按钮</a-button>
  </template>
</xy-title>
```

#### 效果

<antd-xy-title large sub-title="副标题">大号标题</antd-xy-title>
<antd-xy-title large>大号标题<span slot="sub-title" style="color: #a7a7a7">slot副标题</span></antd-xy-title>
<antd-xy-title no-top-margin>小号标题</antd-xy-title>
<antd-xy-title no-top-margin show-icon large sub-title="副标题">拥有右侧内容的大号标题<template slot="right"><a-button type="primary">按钮</a-button></template></antd-xy-title>
<antd-xy-title no-top-margin show-icon sub-title="副标题">拥有右侧内容的小号标题<template slot="right"><a-button type="primary">按钮</a-button></template></antd-xy-title>

#### API

| 属性 | 类型 | 说明 | 默认值 |
| ------ | :------: | ------ | :------: |
| show-icon | Boolean | 用于显示或隐藏前缀 icon | false |
| slot="right" | slot | 放置标题右侧插槽内容 | 无 |
| sub-title | String|slot | 跟随在主标题右边的副标题 | 无 |
| no-top-margin | Boolean | 去掉标题的 margin-top 属性 | false |
| large | Boolean | 指定标题为大号标题，否则为小号标题 | false |
