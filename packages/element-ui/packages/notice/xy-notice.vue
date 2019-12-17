<template>
  <div class="noticeTitle" v-show="isNoticeShow">
    {{ title }}
    <span class="noticeClose" @click="closeNotice" v-show="isClose">×</span>
  </div>
</template>

<script>
export default {
  name: 'XyNotice',
  props: {
      title: {
          type: String,
          default() {
              return '';
          },
      },

    isNoticeShow: {
        type: Boolean,
        default() {
            return false;
        },
    },

    isClose: {
        type: Boolean,
        default() {
            return false;
        },
    },
  },
  methods: {
    /**
     *  关闭公告栏
     */
    closeNotice() {
      this.isNoticeShow = false;
    },
  },
};
</script>

<style scoped>
.noticeTitle {
  width: 100%;
  color: #f68b7a;
  background: #fffecc;
  text-align: center;
  height: 40px;
  line-height: 40px;
}

.noticeClose {
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 23px;
}
</style>
