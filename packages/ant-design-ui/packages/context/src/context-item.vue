<template>
  <div class="xy-context-item">
    <Title top show-icon v-if="title && title.length > 0">{{ title }}</Title>
    <slot />
  </div>
</template>

<script>
import Title from '../../title/index';

export default {
  name: 'XyContextItem',
  components: {
    Title,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="less" scoped>
.xy-context-item {
  margin: 24px 24px 0 24px;
  background: #fff;
  padding: 20px 24px 24px 24px;
}
</style>
