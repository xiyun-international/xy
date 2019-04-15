<template>
  <div v-loading="isLoading">
    <iframe
      id="iframe"
      ref="iframe"
      :src="curUrl"
      height="600"
      frameborder="0"
      scrolling="no"
      marginwidth="0"
      marginheight="0"
      leftmargin="0"
      topmargin="0"
      bgcolor="#000000"
    ></iframe>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'xy-frame',
  props: ['url'],
  data() {
    return {
      isLoading: true,
      timer: null,
      curUrl: '',
    };
  },
  watch: {
    url(url) {
      this.curUrl = '';
      this.curUrl = url;
    },
  },
  mounted() {
    // 传递给智云膳高度
    this.listenerBodyEvent();
    // 接受改变的 iframe 高度
    this.listenerPostMessageEvent();
  },
  methods: {
    /**
       * 监听滚动屏幕
       */
    listenerBodyEvent() {
      document.body.onscroll = _.debounce(() => {
        const top = document.documentElement.scrollTop;
        window.frames[0].postMessage(
          {
            top,
          },
          '*',
        );
      }, 150);
    },
    /**
       * 监听子页面的 message 消息
       */
    listenerPostMessageEvent() {
      // 接收消息
      window.addEventListener(
        'message',
        (event) => {
          const { data } = event;
          if (data !== '' && data.isLoading === false) {
            this.isLoading = data.isLoading;

            if (!data.height) {
              return false;
            }

            // 兼容老Bug
            if (data.height === 0) {
              return false;
            }

            // 设置高度
            if (this.$refs.iframe.height) {
              this.$refs.iframe.height = data.height;
            }

            // 高度设置完后取页面高度
            this.$nextTick(() => {
              const node = document.getElementsByClassName('main-container');
              if (node.length === 0) {
                return false;
              }

              const height = node[0].clientHeight;
              if (data.height < height) {
                this.$refs.iframe.height = height;
              }
              return true;
            });
            return true;
          }
          return false;
        },
        false,
      );
    },
  },
  destroyed() {
    this.isLoading = false;
    document.body.onscroll = undefined;
  },
};
</script>

<style>
  #iframe {
    width: 100%;
    border: 0;
    overflow: hidden;
    display: block;
  }
</style>
