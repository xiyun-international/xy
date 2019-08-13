<template>
  <a-tabs :defaultActiveKey="0" @change="callback">
    <a-tab-pane v-for="(tab,index) in data" :key="index" :tab="tab.info.name">
      <div v-for="(patch,patchIndex) in tab.patchs" :key="patchIndex">
        <xy-title isShowIcon>{{ patch.title }}</xy-title>
        <component :is="getFieldType(patch.type)" :data="patch.fields"></component>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import XySensText from '../sens-text';
import FlowTable from './table.vue';
import XyTitle from '../title'

export default {
  name: 'flow-tabs',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    XySensText,
    FlowTable,
    XyTitle,
  },
  methods: {
    getComponent(name) {
      return name === 'sensitive' ? 'XySensText' : '';
    },
    callback() {},
    getFieldType(type) {
      return type === 'table' ? 'flow-table' : 'flow-tabs';
    },
  },
};
</script>
<style lang="less">
</style>


