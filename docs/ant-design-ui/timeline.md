### time-line 时间轴

#### 概述
time-line 组件可以使用在时间线和流程走向这一类的功能上。

#### 组件示例

#### 1、只需要展示右侧内容

<div style="margin-top: 10px;">
  <antd-xy-timeline>
    <span slot="right">我是右侧内容</span>
  </antd-xy-timeline>
  <antd-xy-timeline>
    <div slot="right">
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
    </div>
  </antd-xy-timeline>
</div>

#### 2、在左侧放置时间，同时设置不同icon颜色

<div style="margin-top: 10px;">
  <antd-xy-timeline leftWidth="100px">
    <span slot="left">2018-10-10 10:00</span>
    <span slot="right">我是右侧内容</span>
  </antd-xy-timeline>
  <antd-xy-timeline leftWidth="100px" status="success">
    <span slot="left">2018-10-10 10:00</span>
    <span slot="right">我是右侧内容</span>
  </antd-xy-timeline>
  <antd-xy-timeline leftWidth="100px" status="wait" :isShowLine="false">
    <span slot="left">2018-10-11 10:00</span>
    <div slot="right">
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
    </div>
  </antd-xy-timeline>
</div>

#### 代码示例

```html
<div style="margin-top: 10px;">
  <xy-timeline leftWidth="100px">
    <span slot="left">2018-10-10 10:00</span>
    <span slot="right">我是右侧内容</span>
  </xy-timeline>
  <xy-timeline leftWidth="100px" status="success">
    <span slot="left">2018-10-10 10:00</span>
    <span slot="right">我是右侧内容</span>
  </xy-timeline>
  <xy-timeline leftWidth="100px" status="wait" :isShowLine="false">
    <span slot="left">2018-10-11 10:00</span>
    <div slot="right">
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
    </div>
  </xy-timeline>
</div>
```

#### API

| 属性 | 类型 | 说明 | 默认值 |
| ------ | ------| ------ | :------: |
| leftWidth | Number, String | 左侧内容区的宽度 | 0 |
| status | String | 预设置默认提供的 icon 的颜色值，分别有四个：info、success、wait 和 warn | info |
| color | String | 设置默认提供的 icon 的颜色值，会覆盖掉status | '' |
| isShowLine | Boolean | 设置是否展示线条 | true |
| slot="left" | VNode | 左侧插槽内容 | 空 |
| slot="right" | VNode | 右侧插槽内容 | 空 |
| slot="icon" | VNode | icon 图标的插槽内容 | 蓝色空心圈圈 |

