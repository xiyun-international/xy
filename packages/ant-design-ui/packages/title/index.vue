<template>
  <div class="xy-title-wrapper" :class="noTopMarginClass">
    <div class="xy-title" :class="[iconClass, sizeClass]">
      <slot></slot>
      <span v-if="isHasSubTitle" class="xy-sub-title">{{subTitle}}</span>
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
    showIcon: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#000',
    },
    iconColor: {
      type: String,
      default: '#20a0ff',
    },
    noTopMargin: {
      type: Boolean,
      default: false,
    },
    subTitle: {
      type: String,
      default: '',
    }
  },
  computed: {
    iconClass() {
      return this.isShowIcon || this.showIcon ? 'xy-title-icon' : '';
    },
    sizeClass() {
      return this.large ? 'large-title' : 'small-title';
    },
    noTopMarginClass() {
      return this.noTopMargin ? 'no-top-margin' : '';
    },
    isHasSubTitle() {
      return this.subTitle !== '';
    }
  },
};
</script>
<style scoped lang="less">
  .xy-title-wrapper {
    margin: 24px 0;
    overflow: hidden;
    .xy-title {
      display: inline-block;
      position: relative;
      line-height: 1.3;
    }
    .large-title {
      font-size: 20px;
      vertical-align: text-top;
    }
    .small-title {
      font-size: 16px;
      vertical-align: sub;
    }
    .xy-sub-title {
      font-size: 12px;
      color: rgb(156, 156, 156);
      font-weight: 400;
      margin-left: 8px;
    }
    .xy-title-icon {
      padding-left: 13px;
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
    }
  }
  .no-top-margin {
    margin-top: unset;
  }
</style>
