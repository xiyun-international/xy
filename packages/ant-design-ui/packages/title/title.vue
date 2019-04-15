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
