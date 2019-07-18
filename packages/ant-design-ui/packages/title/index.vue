<template>
  <div class="xy-title-wrapper">
    <div :class="titleClass">
      <slot></slot>
    </div>
    <div class="xy-sub-title">
      <slot name="sub-title"></slot>
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
      position: relative;
      line-height: 20px;
      margin: 24px 0;
    }
    .xy-sub-title {
      display: inline-block;
      font-size: 13px;
      color: rgb(156, 156, 156);
      font-weight: 400;
      position: relative;
      line-height: 20px;
      margin: 24px 0 24px 10px;
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
        background: #20a0ff;
      }
    }
    .xy-title-right {
      float: right;
      margin: 30px 0;
    }
  }

</style>
