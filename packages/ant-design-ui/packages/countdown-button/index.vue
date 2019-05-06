<template>
  <button
    class="xy-antd-button custom-button"
    :class="{disabled: isDisable}"
    @click="onClick"
    :disabled="isDisable"
  >
    <span>{{ btnText }}</span>
  </button>
</template>

<script>
export default {
  name: 'XyCountdownButton',
  props: {
    text: {
      type: [String, Number],
      default() {
        return '获取验证码';
      },
    },
    isSend: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      timer: null,
      btnText: this.text,
      isDisable: false,
      countdown: 60,
    };
  },
  watch: {
    isSend(val) {
      if (val) {
        this.setTimer();
      } else {
        this.resetTimer();
      }
    },
  },
  methods: {
    onClick() {
      if (this.isDisable) return;
      this.btnText = '发送中';
      this.$emit('click', true);
      this.isDisable = true;
    },
    setTimer() {
      clearInterval(this.timer);
      this.btnText = `${this.countdown}S后重新获取`;
      this.timer = setInterval(() => {
        if (this.countdown <= 1) {
          this.btnText = this.text;
          clearInterval(this.timer);
          this.$emit('update:isSend', false);
          this.isDisable = false;
        } else {
          this.btnText = `${(this.countdown -= 1)}S后重新获取`;
        }
      }, 1000);
    },
    resetTimer() {
      clearInterval(this.timer);
      this.countdown = 60;
      this.btnText = this.text;
      this.isDisable = false;
    },
  },
};
</script>
