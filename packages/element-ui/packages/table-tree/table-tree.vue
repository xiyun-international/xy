<template>
  <div>
    <el-row class="title">
      <el-col :span="columnSpan[0]" class="left-column pl16">
        <span>{{columnName}}</span>
      </el-col>
      <el-col :span="columnSpan[1]" class="right-column pl16">
        <span>操作</span>
      </el-col>
    </el-row>
    <node-list
      :columnSpan="columnSpan"
      :treeData="treeData"
      :fieldsMapping="fieldsMapping"
      :maxLevel="maxLevel"
      :showLv1Form="showLv1Form"
      :on-create="onCreate"
      :on-rename="onRename"
      :on-delete="onDelete"
    ></node-list>
  </div>
</template>

<script>
import NodeList from './nodeList.vue';

export default {
  name: 'XyTableTree',
  components: {
    NodeList,
  },
  props: {
    columnName: {
      type: String,
      default() {
        return '';
      },
    },
    columnSpan: {
      type: Array,
      default() {
        return [18, 6];
      },
    },
    treeData: {
      type: Object,
      default() {
        return {};
      },
    },
    fieldsMapping: {
      type: Object,
      default() {
        return {
          nodeName: 'nodeName',
          nodeId: 'nodeId',
          nodeLevel: 'nodeLevel',
          nodeChildren: 'nodeChildren',
        };
      },
    },
    maxLevel: {
      type: Number,
      default() {
        return 3;
      },
    },
    showLv1Form: {
      type: Boolean,
      default() {
        return false;
      },
    },
    onCreate: {
      type: Function,
      default() {
        return {};
      },
    },
    onRename: {
      type: Function,
      default() {
        return {};
      },
    },
    onDelete: {
      type: Function,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.pl16 {
  padding-left: 16px;
}
.title {
  border: 1px solid #dfe6ec;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  font-weight: bold;
  /*color: #1f2d3d;*/
  /*background: #eef1f6;*/
  color: #909399;
  border-bottom: 1px solid #ebeef5;
}
.title .right-column {
  border-left: 1px solid #dfe6ec;
}
</style>
