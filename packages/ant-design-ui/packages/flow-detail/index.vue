<template>
  <div>
    <a-card v-for="(block,bIndex) in data" :key="bIndex">
      <template v-if="block.info">
        <template slot="title" v-if="block.info.examin">
          <span :style="getExaminStyle(block.info.examin.status)">
            <a-icon :type="getExaminIcon(block.info.examin.status)" />
            {{ block.info.examin.text }}
          </span>
          <span class="sub-title">备注：{{ block.info.examin.message }}</span>
        </template>
        <template slot="title" v-if="block.info.title">
            {{ block.info.title }}
            <span class="sub-title">{{ block.info.subTitle }}</span>
        </template>
      </template>
      <div v-for="patch in block.patchs" :key="patch.tilte">
        <xy-title isShowIcon v-if="patch.title">{{ patch.title }}</xy-title>
        <div :class="!patch.title ? 't-MT24' : ''"></div>
        <component :is="getFieldType(patch.type)" :data="patch.fields"></component>
      </div>
    </a-card>
  </div>
</template>
<script>
import FlowTable from './table.vue';
import FlowTabs from './tabs.vue';
import XyTitle from '../title'

export default {
  name: 'XyFlowDetail',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    FlowTable,
    FlowTabs,
    XyTitle,
  },

  methods: {
    getFieldType(type) {
      return type === 'table' ? 'flow-table' : 'flow-tabs';
    },
    getExaminIcon(status) {
      switch (status) {
        case 0:
          return 'exclamation-circle';
        case 3:
          return 'check-circle';
        case 1:
          return 'exclamation-circle';
        case 2:
          return 'close-circle';
        default:
          return 'exclamation-circle';
      }
    },
    getExaminStyle(status) { // 0-待审批，1-审批中，2-审批驳回，3-审批通过
      switch (status) {
        case 0:
          return {
            color: '#faad14',
          };
        case 3:
          return {
            color: '#13ce66',
          };
        case 1:
          return {
            color: '#faad14',
          };
        case 2:
          return {
            color: '#ff4949',
          };
        default:
          return {
            color: '#faad14',
          };
      }
    },
  },
};
</script>
<style lang="less" scoped>
.ant-card-body >div:first-child>.xy-title-wrapper:first-child {
    margin-top: 0;
}
.sub-title {
  color: rgba(0, 0, 0, 0.65);
  font-weight: unset;
  float: right;
}
</style>

<style>
.viewer-open {
    overflow: scroll !important;
}
</style>

