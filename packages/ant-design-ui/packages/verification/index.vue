<template>
  <div>
    <div class="card box-card">
      <div class="card-body">
        <i class="logo xy-antd-v2-aq"></i>
        <p class="title">安全验证</p>

        <div class="box-tips">
          <p v-if="isSendCode">验证码短信已发送至：{{ telephone }}，请注意查收</p>
          <p v-else>为了保障账户安全，请进行安全验证，接收验证码手机号：{{ telephone }}</p>
        </div>

        <div class="t-MT28"></div>
        <div class="xy-antd-input verify-input">
          <input
            :maxlength="6"
            class="xy-antd-input__inner"
            type="text"
            autocomplete="off"
            v-model="code"
          />
        </div>
        <xy-antd-countdown-button @click="sendCode" :is-send.sync="isSend"></xy-antd-countdown-button>
        <div class="t-MT28"></div>
        <button
          class="xy-antd-button primary submit-button"
          style="width: 300px;"
          @click="verifyCode"
          :disabled="code.length !== 6"
        >
          <span>确定</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import XyCountdownButton from '../countdown-button';

export default {
  name: 'XyVerification',
  components: {
    XyCountdownButton,
  },
  props: {
    isSendCode: Boolean,
    telephone: [String, Number],
  },
  data() {
    return {
      code: '',
      isSend: false,
    };
  },
  watch: {
    isSendCode(val) {
      this.isSend = val;
    },
    isSend(val) {
      if (val === false) {
        this.$emit('update:isSendCode', false);
      }
    },
  },
  methods: {
    sendCode() {
      this.$emit('sendCode', true);
    },
    verifyCode() {
      this.$emit('verifyCode', this.code);
    },
  },
};
</script>

<style scoped>
  .card {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: 0.3s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .card .card-body {
    padding: 20px;
  }
  .card.box-card {
    margin: 20px auto 28px auto;
    text-align: center;
  }
  .logo {
    margin-top: 120px;
    font-size: 40px;
    color: #20a0ff;
  }
  .title {
    font-size: 16px;
    color: #303133;
    margin-top: 20px;
    margin-bottom: 28px;
  }
  .box-tips p {
    font-size: 12px;
    margin-top: 7px;
    color: #999;
  }
  .verify-input {
    width: 110px;
    padding-right: 12px;
  }
  .submit-button {
    width: 236px;
    margin-bottom: 123px;
  }
</style>
