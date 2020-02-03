<template>
  <div class="xy-title-wrapper" :class="noTopMarginClass">
    <div class="xy-title" :class="[iconClass, sizeClass]">
      <slot></slot>
      <span v-if="isHasSubTitle" class="xy-sub-title">{{subTitle}}</span>
      <div v-else class="xy-sub-title">
        <slot name="sub-title"></slot>
      </div>
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
    top: {
      type: Boolean,
      default: false,
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
      return this.noTopMargin || this.top ? 'no-top-margin' : '';
    },
    isHasSubTitle() {
      return this.subTitle !== '';
    }
  },
};
</script>
<style scoped lang="less">
  .xy-title-wrapper {
    margin: 20px 0;
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
      display: inline;
      font-size: 12px;
      font-weight: 400;
      margin-left: 8px;
    }
    .xy-title-icon {
      padding-left: 8px;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 100%;
        background: #20A0FF;
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
