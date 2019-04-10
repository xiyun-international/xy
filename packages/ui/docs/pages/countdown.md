### countdown 倒计时按钮

#### 概述

countdown 倒计时按钮组件用于提供一个可点击后进入倒计时状态的按钮，免去自己编写倒计时逻辑和样式。

#### 组件示例

<div style="margin-top: 10px;">
  <el-row :gutter="10">
   <el-col :span="6">
     <el-input v-model="input" placeholder="placeholder"></el-input>
   </el-col>
   <el-col :span="6">
     <xy-countdown-button @click="onClick" :is-send.sync="isSend"></xy-countdown-button>
   </el-col>
  </el-row>
</div>

<script>
export default {
  data() {
    return {
      input: '',
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
<el-row :gutter="10">
 <el-col :span="6">
   <el-input v-model="input" placeholder="placeholder"></el-input>
 </el-col>
 <el-col :span="6">
   <xy-countdown-button @click="onClick" :is-send.sync="isSend"></xy-countdown-button>
 </el-col>
</el-row>
```

```javascript
export default {
  data() {
    return {
      input: '',
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
      // this.post('api', {phone: input}).then(res => {
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

| 属性 | 说明 | 默认值 |
| ------ | ------ | :------: |
| isSend | 用于提供给倒计时按钮，控制开始倒计时的状态，如果为 true，则按钮开始倒计时，当执行一些错误逻辑后，需要还原成 false 状态，正常逻辑情况下无需改动 | false |
| click | 按钮点击后触发的事件，你需要在正常逻辑情况下，手动把 isSend 状态修改为 true 来开始倒计时 | Function |
