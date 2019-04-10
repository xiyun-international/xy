<template>
  <div class="xy-wrapper">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'xy-wrapper',
};
</script>
<style lang="scss" scoped>
.xy-wrapper {
  box-sizing: border-box;
  padding: 24px 28px;
  background: #fff;
  border-radius: 2px;
}
</style>
