### time-line 时间轴

#### 概述
time-line 组件可以使用在时间线和流程走向这一类的功能上。

#### 组件示例

#### 1、只需要展示右侧内容

<div style="margin-top: 10px;">
  <xy-time-line>
    <span slot="right">我是右侧内容</span>
  </xy-time-line>
  <xy-time-line>
    <div slot="right">
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
    </div>
  </xy-time-line>
</div>

#### 2、在左侧放置时间，同时设置不同icon颜色

<div style="margin-top: 10px;">
  <xy-time-line leftWidth="100px">
    <span slot="left">2018-10-10 10:00</span>
    <span slot="right">我是右侧内容</span>
  </xy-time-line>
  <xy-time-line leftWidth="100px" status="success">
    <span slot="left">2018-10-10 10:00</span>
    <span slot="right">我是右侧内容</span>
  </xy-time-line>
  <xy-time-line leftWidth="100px" status="wait" :isShowLine="false">
    <span slot="left">2018-10-11 10:00</span>
    <div slot="right">
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
      <p>我是很多内容</p>
    </div>
  </xy-time-line>
</div>

#### 代码示例

```html
<xy-time-line leftWidth="100px">
  <span slot="left">2018-10-10 10:00</span>
  <span slot="right">我是右侧内容</span>
</xy-time-line>
<xy-time-line leftWidth="100px" status="success">
  <span slot="left">2018-10-11 10:00</span>
  <div slot="right">
    <p>我是很多内容</p>
    <p>我是很多内容</p>
    <p>我是很多内容</p>
    <p>我是很多内容</p>
    <p>我是很多内容</p>
  </div>
</xy-time-line>
```

#### API

| 属性 | 说明 | 默认值 |
| ------ | ------ | :------: |
| leftWidth | 左侧内容区的宽度 | 0 |
| status | 预设置默认提供的 icon 的颜色值，分别有四个：info、success、wait 和 warn | info |
| color | 设置默认提供的 icon 的颜色值，会覆盖掉status | '' |
| isShowLine | 设置是否展示线条 | true |
| slot="left" | 左侧插槽内容 | 空 |
| slot="right" | 右侧插槽内容 | 空 |
| slot="icon" | icon 图标的插槽内容 | 蓝色空心圈圈 |

