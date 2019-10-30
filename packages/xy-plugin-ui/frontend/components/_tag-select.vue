<template>
  <div class="tag-select">
    <div 
      class="item" 
      v-for="(option, optionIndex) in options" 
      :key="optionIndex"
      @click="selectItem(option.value)"
    >
      <a-tag
        :color="selectedValues.indexOf(option.value) !== -1 ? tagColors.active : tagColors.normal"
      >{{option.label}}</a-tag>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    // 单选: single / 多选: multiple
    mode: {
      type: String,
      default: 'single',
    },

    /**
     * 全部可选项数组
     */
    options: {
      type: Array,
      default: () => ([]),
    },

    /**
     * 预置选中的项数组, 和totalList数据来源相同, 至少id是相同的
     */
    defaultValues: {
      type: Array,
      default: () => ([]),
    },
  },

  data() {
    return {
      selectedValues: [],
      tagColors: {
        normal: '',
        active: 'blue',
      }
    }
  },

  created() {
    this.selectedValues = _.cloneDeep(this.defaultValues)
  },

  methods: {
    selectItem(item) {
      switch (this.mode) {
        case 'multiple':
          if (this.selectedValues.indexOf(item) === -1) {
            this.selectedValues.push(item)
          } else {
            this.selectedValues.splice(this.selectedValues.indexOf(item), 1)
          }
          break;
      
        case 'single':
          this.selectedValues = []
          this.selectedValues.push(item)
          break;

        default:
          break;
      }

      this.confirm()
    },

    confirm() {
      /**
       * tip: 外面接收的时候, 最好是深拷贝该值!!!, 不然容易引起数据流的混乱
       */
      const output = this.mode === 'single' ?
        this.selectedValues[0] :
        this.selectedValues
      this.$emit('confirm', output)
    }
  },
}
</script>

<style lang="less" scoped>
.tag-select {
  display: flex;
  flex-wrap: wrap;
  .item {
    margin: 10px;
    // border: 1px solid black;
  }
}
</style>



