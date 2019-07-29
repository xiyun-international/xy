<template>
  <div class="xy-steps">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "XySteps",
    props: {
      current: Number,
    },
    data() {
      return {
        steps: [],
      }
    },
    watch: {
      steps(steps) {
        steps.forEach((child, index) => {
          child.index = index;
        })
      }
    }
  }
</script>

<style scoped>
.xy-steps {
  display: flex;
}
</style>
