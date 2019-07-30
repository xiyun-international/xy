<template>
  <a-spin :spinning="isLoading" size="large">
    <iframe
      ref="iframe"
      :src="curUrl"
      :height="height"
      class="iframe"
    ></iframe>
  </a-spin>
</template>

<script>
import { removeToken } from '@xiyun/utils';

export default {
  name: 'XyFrame',
  props: ['url'],
  data() {
    return {
      isLoading: true,
      height: 550,
      curUrl: '',
    };
  },
  watch: {
    url(url) {
      this.curUrl = url;
    },
  },
  mounted() {
    this.curUrl = this.url;
    this.listenerPostMessageEvent();
  },
  methods: {
    // 监听子页面的 message 消息
    listenerPostMessageEvent() {
      window.addEventListener('message', event => {
        const { data } = event;
        if (typeof data !== 'object') return false;

        if (data.logout) {
          removeToken();
          this.$message.error('账号已过期，请重新登录');
          window.location.href = '/#/login';
        } else if (data.isLoading === false) {
          this.isLoading = false;
          this.height = data.height;
        }
      });
    },
  },
  destroyed() {
    this.isLoading = false;
  },
};
</script>

<style scoped>
  .iframe {
    width: 100%;
    border: unset;
    overflow-scrolling: unset;
  }
</style>
