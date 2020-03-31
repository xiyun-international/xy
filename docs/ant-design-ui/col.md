### col 表格组件

#### 概述

详情页大量信息的展示需要使用到表格。

#### 组件示例
col 组件需与 col-item 组件配合使用：

<antd-xy-col :span="2" label-width="140px">
  <antd-xy-col-item label="产品方案名称">我是内容区</antd-xy-col-item>
  <antd-xy-col-item label="合作方式">我是内容区</antd-xy-col-item>
  <antd-xy-col-item label="团餐客户">我是内容区</antd-xy-col-item>
  <antd-xy-col-item label="所属学校">我是内容区</antd-xy-col-item>
  <antd-xy-col-item row label="签约客户">我是内容区</antd-xy-col-item>
  <antd-xy-col-item label="一级业态">我是内容区</antd-xy-col-item>
  <antd-xy-col-item label="二级业态">我是内容区</antd-xy-col-item>
</antd-xy-col>

#### 代码示例

```html
<xy-col :span="2" label-width="140px">
  <xy-col-item label="产品方案名称">我是内容区</xy-col-item>
  <xy-col-item label="合作方式">我是内容区</xy-col-item>
  <xy-col-item label="团餐客户">我是内容区</xy-col-item>
  <xy-col-item label="所属学校">我是内容区</xy-col-item>
  <xy-col-item row label="签约客户">我是内容区</xy-col-item>
  <xy-col-item label="一级业态">我是内容区</xy-col-item>
  <xy-col-item label="二级业态">我是内容区</xy-col-item>
</xy-col>
```


#### API - xy-col

| 属性 | 类型 | 说明 | 默认值 |
| --- | --- | --- | :-: |
| span | Number | 表格列数/2 | 2 |
| labelWidth | String | label宽度 | '140px' |

#### API - xy-col-item

| 属性 | 类型 | 说明 | 默认值 |
| --- | --- | --- | :-: |
| row | boolean | 信息展示整行 | false |
| label | String | label展示信息 | '' |
