### countdown 倒计时按钮

#### 概述

countdown 倒计时按钮组件用于提供一个可点击后进入倒计时状态的按钮，免去自己编写倒计时逻辑和样式。

#### 组件示例

<antd-xy-countdown-button style="margin-top:20px;" @click="onClick" :is-send.sync="isSend"></antd-xy-countdown-button>

<script>
export default {
  data() {
    return {
      isSend: false,
    }
  },
  methods: {
    onClick(val) {
      setTimeout(() => {
        this.isSend = true;
      }, 1000)
    }
  }
}
</script>

#### 代码示例

```html
<xy-countdown-button @click="onClick" :is-send.sync="isSend"></xy-countdown-button>
```

```javascript
export default {
  data() {
    return {
      isSend: false,
    }
  },
  methods: {
    onClick() {
      // 模拟接口请求
      setTimeout(() => {
        this.isSend = true;
      }, 1000)
      // 真实接口请求
      // this.$post('api', {phone: input}).then(res => {
      //   if (res) {
      //     this.isSend = true;
      //   } else {
      //     this.$message({
      //       message: res.message,
      //       type: 'error',
      //     });
      //     this.isSend = false;
      //   }
      // }).catch(() => {
      //   this.isSend = false;
      // })
    }
  }
}
```

#### API

| 属性 | 类型 | 说明 | 默认值 |
| ------| ------ | ------ | :------: |
| isSend | Boolean | 用于提供给倒计时按钮，控制开始倒计时的状态，如果为 true，则按钮开始倒计时，当执行一些错误逻辑后，需要还原成 false 状态，正常逻辑情况下无需改动 | false |
| click | Function | 按钮点击后触发的事件，你需要在正常逻辑情况下，手动把 isSend 状态修改为 true 来开始倒计时 | Function |
