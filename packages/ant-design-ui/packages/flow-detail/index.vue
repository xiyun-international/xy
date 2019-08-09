<template>
  <div class="t-MT10">
    <a-card v-for="(block,bIndex) in data" :key="bIndex" class="t-MB20 xy-card">
      <template slot="title" v-if="block.info.examin">
        <span :style="getExaminStyle(block.info.examin.status)">
          <a-icon :type="getExaminIcon(block.info.examin.status)" />
          {{ block.info.examin.title }}
        </span>
      </template>
      <template slot="title" v-else>
          {{ block.info.title }}
      </template>
      <div v-for="patch in block.patchs" :key="patch.tilte">
        <xy-title isShowIcon>{{ patch.title }}</xy-title>
        <component :is="getFieldType(patch.type)" :data="patch.fields"></component>
      </div>
    </a-card>
  </div>
</template>
<script>
import FlowTable from './table.vue';
import FlowTabs from './tabs.vue';
import data from './data';

export default {
  data() {
    return {
      data,
    };
  },
  components: {
    FlowTable,
    FlowTabs,
  },
  methods: {
    getFieldType(type) {
      return type === 'table' ? 'flow-table' : 'flow-tabs';
    },
    getExaminIcon(status) {
      switch (status) {
        case 'waiting':
          return 'exclamation-circle';
          break;
        case 'pass':
          break;
        case 'check-circle':
          break;
        default:
          return;
      }
    },
    getExaminStyle(status) {
      switch (status) {
        case 'waiting':
          return {
            color: '#ec9926',
          };
          break;
        case 'pass':
          return {
            color: '#60B660',
          };
          break;
        case 'exclamation-circle':
          break;
        default:
          return;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.xy-card {
  width: 90%;
  margin-left: 5%;
}
.ant-card-body >div:first-child>.xy-title-wrapper:first-child {
    margin-top: 0;
}
</style>

