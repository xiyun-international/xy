<template>
  <div class="xy-timeline">
    <div class="left" :style="{width: leftWidth}">
      <slot name="left"></slot>
    </div>
    <div class="middle">
      <slot name="icon">
        <svg viewBox="0 0 14 14">
          <circle cx="50%" cy="50%" r="6.5" :stroke="getColor" fill="white" />
          <circle cx="50%" cy="50%" r="3.5" :fill="getColor" />
        </svg>
      </slot>
      <div v-if="isShowLine" class="line"></div>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XyTimeline',
  props: {
    leftWidth: {
      default: '0',
    },
    iconColor: {
      default: '#20A0FF',
    },
    isShowLine: {
      default: true,
    },
    status: {
      default: 'info',
    },
    color: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      colors: {
        info: '#20A0FF',
        success: '#13CE66',
        wait: '#F7BA2A',
        warn: '#FF4949',
      },
    };
  },
  computed: {
    getColor() {
      if (this.color !== '') return this.color;
      switch (this.status) {
        case 'warn':
          return this.colors.warn;
        case 'success':
          return this.colors.success;
        case 'wait':
          return this.colors.wait;
        default:
          return this.colors.info;
      }
    },
  },
};
</script>
<style scoped lang="less">
  .xy-timeline {
    display: flex;
    height: 100%;
    font-size: 14px;
    p {
      margin: 0;
    }
    .left {
      text-align: right;
      margin-right: 10px;
      margin-bottom: 23px;
    }
    .middle {
      width: 14px;
      position: relative;
      .line {
        width: 0;
        border: 1px solid #e6e6e6;
        height: 100%;
        margin: -14px auto 0;
      }
    }
    .right {
      width: 100%;
      margin-left: 10px;
      margin-bottom: 23px;
    }
  }

</style>
