### title 标题

#### 概述

title 标题组件可以用于页面中某块的标题，它包含两个样式，一个是普通的标题，一个是带有前缀 icon 的样式。

#### 代码示例

```html
<xy-title>我是标题组件</xy-title>

<xy-title isShowIcon>我是带有 icon 的标题组件</xy-title>

<xy-title class="customClass" style="font-size: 20px;color: blue;">可以自定义标题样式</xy-title>

<xy-title isShowIcon>可以自定义默认 icon 颜色</xy-title>
<style>
.xy-title-icon::before {
  background: blue;
}
</style>

<xy-title isShowIcon>
  可以设置标题右侧的内容
  <template v-slot:right>
    <button>按钮</button>
  </template>
</xy-title>
```

#### 效果

<ele-xy-title>我是标题组件</ele-xy-title>

<ele-xy-title isShowIcon>我是带有 icon 的标题组件</ele-xy-title>

#### API

| 属性 | 类型 | 说明 | 默认值 |
| ------ | :------: | ------ | :------: |
| isShowIcon | Boolean | 用于显示或隐藏前缀 icon | false |
| v-slot:right | VNode | 放置标题右侧插槽内容 | 无 |
