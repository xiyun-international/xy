<template>
  <div :class="{'xy-title-icon': true, 'mt-30': !this.isFist}">
    <div class="prefix-icon"></div>
    <div class="context">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'xyTitleIcon',
  props: ['isFist'],
};
</script>

<style lang="scss" scoped>
.xy-title-icon {
  margin-bottom: 20px;
  font-size: 18px;
  .prefix-icon {
    width: 6px;
    height: 16px;
    display: block;
    float: left;
    background: #5ca0fc;
    margin-right: 10px;
    margin-top: 1px;
  }
  .context {
    display: block;
  }
}
</style>
