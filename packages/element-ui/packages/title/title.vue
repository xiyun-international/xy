<template>
  <div :class="{'xy-title': true, 'first': this.first, 'no-first': !this.first}">
    <section :class="sectionClass"></section>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "XyTitle",
  props: {
    first: {
      type: Boolean,
      default: false
    },
    section: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sectionClass() {
      return this.section ? "section show-section" : "section hide-section";
    },
    titleClass() {
      return this.first ? "xy-title first" : "xy-title no-first";
    }
  }
};
</script>

<style lang="scss" scoped>
.xy-title {
  font-size: 18px;
  height: 25px;
  line-height: 25px;
  color: #000;
  margin-bottom: 20px;
  section {
    color: #303133;
    background-color: #20a0ff;
    margin-right: 20px;
    width: 4px;
    height: 18px;
    vertical-align: middle;
  }
  .hide-section {
    display: none;
  }
  .show-section {
    display: inline-block;
  }
}
.first {
  margin-top: 0;
}
.no-first {
  margin-top: 24px;
}
</style>
