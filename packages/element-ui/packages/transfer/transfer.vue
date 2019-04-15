<template>
  <div class="xy-transfer">
    <xy-transfer-panel
      type="source"
      ref="leftPanel"
      :title="titles[0] || '选取列表'"
      :data="sourceData"
      :isShowSearch="true"
      :treeProps="props"
      @checked-change="onSourceCheckedChange"
    />
    <div class="button-wrapper">
      <div class="button-item">
        <el-button
          @click="toRight"
          :disabled="toRightDisabled"
          type="primary"
          size="mini"
        >选取&gt;</el-button>
      </div>
      <div>
        <el-button
          @click="toLeft"
          :disabled="toLeftDisabled"
          type="default"
          size="mini"
        >&lt;取消</el-button>
      </div>
    </div>
    <xy-transfer-panel
      type="target"
      ref="rightPanel"
      :title="titles[1] || '目标列表'"
      :data="targetData"
      :targetType="targetType"
      :treeProps="props"
      @checked-change="onTargetCheckedChange"
    />
  </div>
</template>

<script>
import lodash from 'lodash';
import XyTransferPanel from './transferPanel.vue';

export default {
  name: 'XyTransfer',
  components: { XyTransferPanel },
  props: {
    // 左选框的数据源
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    // 右选框的数据源
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
    targetType: String,
    props: {
      type: Object,
      default() {
        return {
          key: 'key',
          label: 'label',
          children: 'children',
        };
      },
    },
  },
  data() {
    return {
      leftChecked: [],
      rightChecked: [],
      targetData: [],
      sourceData: [],
    };
  },
  mounted() {
    const translateValue = this.translateValue(this.data, this.value);
    const bySourceData = lodash.cloneDeep(this.data);
    this.sourceData = this.getFilterData(bySourceData, translateValue, 'source');
    const byTargetData = lodash.cloneDeep(this.data);
    this.targetData = this.getFilterData(byTargetData, translateValue, 'target');
  },
  watch: {
    data(val) {
      if (val) {
        const translateValue = this.translateValue(val, this.value);
        const bySourceData = lodash.cloneDeep(val);
        this.sourceData = this.getFilterData(bySourceData, translateValue, 'source');
        const byTargetData = lodash.cloneDeep(val);
        this.targetData = this.getFilterData(byTargetData, translateValue, 'target');
      }
    },
    value(val) {
      if (val) {
        const translateValue = this.translateValue(this.data, val);
        const bySourceData = lodash.cloneDeep(this.data);
        this.sourceData = this.getFilterData(bySourceData, translateValue, 'source');
        const byTargetData = lodash.cloneDeep(this.data);
        this.targetData = this.getFilterData(byTargetData, translateValue, 'target');
      }
    },
    targetData(val) {
      const nodeArr = [];
      this.getAllNodeData(val, nodeArr);
      // this.$emit('change', lodash.map(nodeArr, this.props.key));
      this.$emit('change', nodeArr);
    },
  },
  computed: {
    toLeftDisabled() {
      return this.rightChecked.length === 0;
    },
    toRightDisabled() {
      return this.leftChecked.length === 0;
    },
  },
  methods: {
    onSourceCheckedChange(val) {
      this.leftChecked = val;
      this.$emit('left-check-change', val);
    },
    onTargetCheckedChange(val) {
      this.rightChecked = val;
      this.$emit('right-check-change', val);
    },
    translateValue(data, value) {
      const newValue = [];
      this.translateValueData(data, value, newValue);
      return newValue;
    },
    // 转换 value [1,2,3] ==> [{key: 1}, {}...]
    translateValueData(inputData, value, outputData = []) {
      inputData.forEach((item) => {
        if (this.props.children in item) {
          this.translateValueData(item[this.props.children], value, outputData);
        } else {
          const isFind = lodash.findIndex(value, v => item[this.props.key] === v);
          if (isFind !== -1) {
            outputData.push(item);
          }
        }
      });
    },
    // 得到所有子节点的一个数组
    getAllNodeData(inputData, out = []) {
      inputData.forEach((item) => {
        if (this.props.children in item) {
          this.getAllNodeData(item[this.props.children], out);
        } else {
          out.push(item);
        }
      });
    },
    getFilterData(data, value, type = 'source') {
      const newData = [];
      data.forEach((item) => {
        if (this.props.children in item) {
          if (item[this.props.children].length) {
            const childrenItem = this.getFilterData(item[this.props.children], value, type);
            if (childrenItem.length) {
              item[this.props.children] = childrenItem;
              newData.push(item);
            }
          }
        } else {
          const isFind = lodash.findIndex(value, v => item[this.props.key] === v[this.props.key]);
          const filter = type === 'source' ? isFind === -1 : isFind !== -1;
          if (filter) {
            newData.push(item);
          }
        }
      });
      return newData;
    },
    toRight() {
      const bySourceData = lodash.cloneDeep(this.data);
      const curTargetArr = [];
      this.getAllNodeData(this.targetData, curTargetArr);
      const sourceData = this.getFilterData(bySourceData, this.leftChecked.concat(curTargetArr), 'source');

      const byTargetData = lodash.cloneDeep(this.data);
      const targetData = this.getFilterData(byTargetData, this.leftChecked.concat(curTargetArr), 'target');

      this.sourceData = sourceData;
      this.targetData = targetData;
    },
    toLeft() {
      let curTargetArr = [];
      this.getAllNodeData(this.targetData, curTargetArr);
      // 跟选中的节点做差集
      curTargetArr = lodash.differenceWith(curTargetArr, this.rightChecked);

      const bySourceData = lodash.cloneDeep(this.data);
      const sourceData = this.getFilterData(bySourceData, curTargetArr, 'source');

      const byTargetData = lodash.cloneDeep(this.data);
      const targetData = this.getFilterData(byTargetData, curTargetArr, 'target');
      this.sourceData = sourceData;
      this.targetData = targetData;
    },
  },
};
</script>

<style lang="scss" scoped>
  .xy-transfer {
    font-size: 14px;
    display: flex;
    align-items: center;
    .button-wrapper {
      margin: 0 10px;
      .button-item {
        margin: 10px 0;
      }
    }
  }
</style>
