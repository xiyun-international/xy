<template>
  <a-spin :spinning="isLoading" size="large">
    <iframe
      ref="iframe"
      :src="curUrl"
      :height="height"
      class="iframe"
      frameborder="0"
      scrolling="no"
      marginwidth="0"
      marginheight="0"
      leftmargin="0"
      topmargin="0"
    ></iframe>
  </a-spin>
</template>

<script>
function removeToken() {
  localStorage.removeItem("TOKEN");
}
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
        if (typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'isLoading')) {
          if (data.logout) {
            removeToken();
            window.location.href = '/#/login';
            window.location.reload();
          } 
          if (data.isLoading === false) {
            // 添加iframe最小高度 即menu高度
            let content = document.getElementsByClassName('ant-menu');
            let minHeight = content ? content[0].clientHeight : 0;
            this.isLoading = false;
            this.height = data.height > minHeight ? data.height : minHeight;
          }
        }
        if (data.redirectUrl && data.redirectUrl.indexOf('/#/') > -1) { 
          // 从iframe页面跳转到vue页面 add by yuyue
          window.location.href = data.redirectUrl;
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
    overflow: unset;
  }
</style>
