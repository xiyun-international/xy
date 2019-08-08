<template>
  <div>
    <div class="card box-card">
      <div class="card-body">
        <div class="verify-title">
          <svg class="logo" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1276" width="40" height="40"><path d="M512.452 118.935a159.533 159.533 0 0 1-5.957 4.864C434.25 179.843 307.147 219.014 180 229.363V545.68c0 67.303 24.196 132.024 67.587 181.162l1.752 1.985 1.523 2.165c33.09 47.026 69.4 87.947 108.934 122.842 43.858 38.713 100.83 59.32 158.19 58.116 57.788-1.212 111.246-24.348 150.144-66.533l1.999-2.042c44.278-42.625 73.013-73.764 95.544-105.226l1.727-2.41 2.01-2.18c45.976-49.861 74.691-123.531 74.691-192.41v-312.39c-125.337-10.194-251.027-48.52-323.663-103.398a175.07 175.07 0 0 1-7.986-6.425z m20.464-46.387c5.976 5.902 11.462 10.74 16.457 14.514 69.582 52.57 195.867 87.22 311.058 94.767 4.226 0.277 9.668 0.553 16.325 0.829 8.571 0.354 15.345 7.733 15.345 16.715V541.15c0 81.28-33.485 166.473-87.403 224.947-27.983 39.074-63.757 75.737-101.28 111.859C604.234 985.52 435.93 985.06 328.032 889.82c-42.407-37.432-81.216-81.168-116.426-131.207C160.426 700.654 132 624.618 132 545.68V199.966c0-8.978 6.768-16.355 15.336-16.715 7.795-0.327 14.117-0.658 18.965-0.993 115.787-7.988 242.23-43.212 310.772-96.385 4.409-3.42 9.242-7.784 14.502-13.091 11.512-11.618 29.709-11.721 41.34-0.234zM479.09 639.352l248.04-248.038c6.248-6.249 16.379-6.249 22.627 0l17.93 17.929c6.248 6.248 6.248 16.379 0 22.627L479.09 720.465c-6.248 6.249-16.379 6.249-22.627 0l-171.15-171.15c-6.249-6.248-6.249-16.379 0-22.627l17.929-17.93c6.248-6.247 16.379-6.247 22.627 0l130.594 130.594c6.248 6.249 16.379 6.249 22.627 0z" fill="#409EFF" p-id="1277"></path></svg>
          <span class="title">安全验证</span>
        </div>
        <div class="box-tips">
          <p v-if="isSendCode">验证码短信已发送至：{{ telephone }}，请注意查收</p>
          <p v-else>为了保障账户安全，请进行安全验证，接收验证码手机号：{{ telephone }}</p>
        </div>
        <div class="t-MT30">
          <el-input
            class="verify-input"
            :maxlength="6"
            type="text"
            autocomplete="off"
            v-model="code"
          />
          <xy-countdown-button @click="sendCode" :is-send.sync="isSend"></xy-countdown-button>
        </div>
        <el-button
          class="verify-button"
          type="primary"
          @click="verifyCode"
          :disabled="code.length !== 6"
        >
          <span>确定</span>
        </el-button>
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
    width: 120px;
  }
  .verify-button {
    width: 300px;
    margin: 30px 0 238px 0;
  }
</style>
