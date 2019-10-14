<template>
  <div class="wrapper">
    <my-component />
  </div>
</template>
<script>
import MyComponent from "../src/index.vue";

export default {
  components: { MyComponent }
};
</script>
<style scoped>
.wrapper {
  width: 600px;
  height: 300px;
  border: 1px dashed silver;
  margin: 0 auto;
  padding: 10px;
}
</style>