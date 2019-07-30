<template>
  <div>
    <div class="card box-card">
      <div class="card-body">
        <div class="verify-title">
          <a-icon type="safety-certificate" class="logo" />
          <span class="title">安全验证</span>
        </div>

        <div class="box-tips">
          <p v-if="isSendCode">验证码短信已发送至：{{ telephone }}，请注意查收</p>
          <p v-else>为了保障账户安全，请进行安全验证，接收验证码手机号：{{ telephone }}</p>
        </div>

        <div class="t-MT30">
          <a-input
            class="verify-input"
            :maxlength="6"
            type="text"
            autocomplete="off"
            v-model="code"
          />
          <xy-countdown-button @click="sendCode" :is-send.sync="isSend"></xy-countdown-button>
        </div>

        <a-button
          type="primary"
          class="submit-button"
          @click="verifyCode"
          :disabled="code.length !== 6"
        >
          <span>确定</span>
        </a-button>
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
    value: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      code: '',
      isSend: false,
    };
  },
  mounted() {
    this.code = this.value;
  },
  watch: {
    code(val) {
      this.$emit('input', val);
    },
    value(val) {
      this.code = val;
    },
    isSendCode(val) {
      this.isSend = val;
    },
    isSend(val) {
      if (val === false) {
        this.$emit('update:isSendCode', false);
        this.code = '';
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
  .verify-title {
    margin-top: 120px;
  }
  .logo {
    vertical-align: middle;
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
    display: inline-block;
    width: 110px;
  }
  .submit-button {
    width: 260px;
    margin: 30px 0 238px 0;
  }
</style>
