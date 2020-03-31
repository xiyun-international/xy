<template>
  <span :class="['xy-table-item', getColumnsSpan]">
    <td
      class="ant-col-12"
      :style="{
        width: table.labelWidth,
      }"
    >
      <div>
        {{ label }}
      </div>
    </td>
    <td
      class="ant-col-12"
      :style="{
        width: `calc(100% - ${table.labelWidth})`,
      }"
    >
      <div>
        <slot />
      </div>
    </td>
  </span>
</template>

<script>
export default {
  name: 'xy-col-item',
  inject: ['table'],
  props: {
    label: {
      type: String,
      default() {
        return '';
      },
    },
    row: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  computed: {
    getColumnsSpan() {
      if (this.row) {
        return `ant-col-24`;
      }
      return `ant-col-${24 / this.table.columns}`;
    },
  },
};
</script>

<style lang="less" scoped>
.xy-table-item {
  td {
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
    display: table-cell;
    border: 1px solid #e8e8e8;
    div {
      padding: 10px;
    }
  }
}
</style>
