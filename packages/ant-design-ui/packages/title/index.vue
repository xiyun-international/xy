<template>
  <div class="xy-title-wrapper">
    <div :class="titleClass">
      <slot></slot>
    </div>
    <div class="xy-title-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XyTitle',
  props: {
    isShowIcon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    titleClass() {
      return this.isShowIcon ? 'xy-title xy-title-icon' : 'xy-title';
    },
  },
};
</script>
<style scoped lang="less">
  .xy-title-wrapper {
    .xy-title {
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
      position: relative;
      line-height: 20px;
      margin: 24px 0;
    }
    .xy-title-icon {
      padding-left: 15px;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 5px;
        height: 100%;
        background: #108ee9;
      }
    }
    .xy-title-right {
      float: right;
      margin: 30px 0;
    }
  }

</style>
