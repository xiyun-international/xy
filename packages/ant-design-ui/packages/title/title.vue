<template>
  <div class="xy-antd-title-wrapper">
    <div :class="titleClass">
      <slot></slot>
    </div>
    <div class="xy-antd-title-right">
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
      return this.isShowIcon ? 'xy-antd-title xy-antd-title-icon' : 'xy-antd-title';
    },
  },
};
</script>
