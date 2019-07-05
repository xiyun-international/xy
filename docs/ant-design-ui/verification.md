### verification 短信安全验证组件

#### 概述

verification 短信安全验证组件，用于在查看敏感信息前，需要让用户进行手机短信验证，成功后方可查看。

#### 组件示例

<div style="margin-top: 10px;">
  <antd-xy-verification
    v-model="code"
    telephone="13800000831"
    @sendCode="sendCode"
    :is-send-code.sync="isSendCode"
    @verifyCode="verifyCode"
  />
</div>

<script>
export default {
  data() {
    return {
      isSendCode: false,
      code: '',
    }
  },
  methods: {
    // 发送验证码
    sendCode() {
      setTimeout(() => {
        this.isSendCode = true;
      }, 1000)
    },
    // 校验验证码
    verifyCode(code) {
      // 校验成功后，你可能需要把状态重置
      this.isSendCode = false;
      // 如果需要在特定的时候清空验证码表单，那么需要手动设置
      this.code = '';
    }
  }
}
</script>

#### 代码示例

```html
<xy-verification
  v-model="code"
  telephone="13800000831"
  @sendCode="sendCode"
  :is-send-code.sync="isSendCode"
  @verifyCode="verifyCode"
/>
```

```javascript
export default {
  data() {
    return {
      isSendCode: false,
      // 如果需要在特定的时候清空验证码表单，那么需要为它设定一个 v-model 以便能够清空它
      code: '',
    }
  },
  methods: {
    // 发送验证码
    sendCode() {
      setTimeout(() => {
        this.isSendCode = true;
      }, 1000)
    },
    // 校验验证码
    verifyCode(code) {
      // post('api', {code}).then(res => {
      //   ...
      // 校验成功后，你可能需要重置状态
         this.isSendCode = false;
      // 如果需要在特定的时候清空验证码表单，那么需要手动设置该值
      // this.code = '';
      // })
    }
  }
}
```

#### API

| 属性 | 类型 | 说明 | 默认值 |
| ------ | :------: | ------ | :------: |
| v-model | String | 验证码表单值，用于设置默认值或清空表单，可选 | 无 |
| telephone | String | 手机号 | 空 |
| isSendCode | Boolean | 用于提供给倒计时按钮，控制开始倒计时的状态，如果为 true，则按钮开始倒计时，当执行一些错误逻辑后，需要还原成 false 状态，正常逻辑情况下无需改动 | false |
| sendCode | Function | 发送短信的方法 | Function |
| verifyCode | Function | 验证短信验证码的方法 | Function |
