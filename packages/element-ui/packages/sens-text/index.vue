<template>
  <div class="xy-sens-text-wrapper">
    <span>{{ showText }}</span>
    <i :class="switchClass" :style="{ color: eyeColor }" @click="switchOpen"></i>
  </div>
</template>

<script>
export default {
  name: 'XySensText',
  props: {
    text: String,
    eyeColor: {
      type: String,
      default: '#20A0FF',
    },
    type: {
      type: String,
      default: 'mobile',
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    switchClass() {
      return this.isOpen ? 'xy-v2-kq' : 'xy-v2-yc';
    },
    showText() {
      if (this.isOpen) return this.text;
      const { text } = this;
      switch (this.type) {
        case 'mobile':
          return text.replace(/(\d{3})\d{4}/, '$1****');
        case 'idCard':
          return text.replace(/(\d{3})\d{11}/, '$1***********');
        case 'email':
          return text.replace(/^(\w{2}).+?@.+?(\.\w{2,3})$/, (all, pre, aft) => {
            return `${pre}***@***${aft}`;
          });
        default:
          return text.replace(/(\w{3})\w{8}/, '$1********');
      }
    },
  },
  methods: {
    switchOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped lang="less">
.xy-sens-text-wrapper {
  user-select: none;
  i {
    cursor: pointer;
  }
}
</style>
