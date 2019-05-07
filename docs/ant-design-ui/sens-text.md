### sens-text 敏感文字查看

#### 概述

sens-text 敏感文字查看组件，用于对手机号、身份证、银行卡号等敏感信息的隐藏和查看用。

#### 组件示例

<div style="margin-top: 20px;">
  <antd-xy-sens-text text="13800000831" type="mobile"></antd-xy-sens-text>
</div>

#### 代码示例

```html
<xy-sens-text text="13800000831" type="mobile"></xy-sens-text>
```

#### API

| 属性 | 类型 | 说明 | 默认值 |
| ------ | :------: | ------ | :------: |
| text | String | 用于处理的文本 | 空 |
| type | String | 用于处理的文本类型，可选值：mobile（代表手机号）, idCard（代表身份证） | mobile |
| eyeColor | String | 用来更改眼睛图标的颜色 | #20A0FF |
