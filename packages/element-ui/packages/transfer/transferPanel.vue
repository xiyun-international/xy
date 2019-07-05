<template>
  <div class="xy-transfer-panel">
    <div class="xy-transfer-panel__header">
      <el-checkbox
        v-model="allChecked"
        @change="handleAllCheckedChange"
        :indeterminate="isIndeterminate"
        :true-label="1"
        :false-label="0"
        :disabled="allCheckboxDisabled"
      >
        {{ title }}
        <span>({{ checkedSummary }})</span>
      </el-checkbox>
    </div>
    <div class="xy-transfer-panel__body">
      <el-input
        v-if="isShowSearch"
        v-model="filterText"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        size="mini"
        class="xy-transfer-search"
      ></el-input>
      <template v-if="targetType === 'normal'">
        <el-checkbox-group @change="handleCheckboxChange" v-model="checked">
          <el-checkbox
            v-for="target in checkboxData"
            :label="target"
            :key="target[treeProps.key]"
          >
            {{target[treeProps.label]}}
          </el-checkbox>
        </el-checkbox-group>
      </template>
      <template v-else>
        <el-tree
          ref="tree"
          :data="data"
          show-checkbox
          :node-key="treeProps.key"
          default-expand-all
          :props="treeProps"
          @check="handleTreeCheckChange"
          :filter-node-method="filterNode"
        ></el-tree>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XyTransferPanel',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    targetType: {
      type: String,
      default() {
        return 'tree'
      }
    },
    title: String,
    isShowSearch: {
      type: Boolean,
      default() {
        return false;
      }
    },
    treeProps: {
      type: Object,
      default() {
        return {
          key: 'key',
          label: 'label',
          children: 'children'
        }
      }
    },
  },
  data() {
    return {
      checked: [],
      allChecked: false,
      filterText: '',
    }
  },
  watch: {
    checked(val) {
      this.$emit('checked-change', val);
    },
    treeData() {
      this.checked = [];
      this.allChecked = false;
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    treeData() {
      return this.data;
    },
    // 转换tree的数据格式到checkbox的格式
    checkboxData() {
      const checkboxData = []
      this.translateCheckBoxData(this.data, checkboxData)
      return checkboxData;
    },
    isIndeterminate() {
      const checkedLength = this.checked.length;
      return checkedLength > 0 && checkedLength < this.checkboxData.length;
    },
    checkedSummary() {
      return this.checked.length;
    },
    allCheckboxDisabled() {
      return this.data.length === 0;
    }
  },
  methods: {
    // 全选和取消全选
    handleAllCheckedChange(value) {
      if (this.targetType === 'tree') {
        if (value) {
          this.$refs.tree.setCheckedNodes(this.treeData);
          this.checked = this.$refs.tree.getCheckedNodes(true)
        } else {
          this.$refs.tree.setCheckedKeys([]);
          this.checked = [];
        }
      } else {
        if (value) {
          this.checked = this.checkboxData;
        } else {
          this.checked = [];
        }
      }
    },
    // 转换checkbox数据的方法
    translateCheckBoxData(inputData, outputData = []) {
      inputData.forEach(item => {
        if (this.treeProps.children in item) {
          this.translateCheckBoxData(item[this.treeProps.children], outputData)
        } else {
          outputData.push(item);
        }
      })
    },
    // checkbox 选项有改变时
    handleCheckboxChange(value) {
      this.allChecked = value.length === this.checkboxData.length;
    },
    // tree 选项有改变时
    handleTreeCheckChange() {
      this.checked = this.$refs.tree.getCheckedNodes(true);
      const allData = [];
      this.translateCheckBoxData(this.treeData, allData);
      this.allChecked = this.checked.length === allData.length;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data[this.treeProps.label].indexOf(value) !== -1;
    }
  }
}
</script>

<style lang="less" scoped>
  .xy-transfer-panel {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    display: inline-block;
    vertical-align: middle;
    width: 200px;
    max-height: 100%;
    box-sizing: border-box;
    position: relative;
    .xy-transfer-panel__header {
      height: 40px;
      line-height: 40px;
      background: #f5f7fa;
      margin: 0;
      padding-left: 10px;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
      color: #000;
    }
    .xy-transfer-panel__body {
      box-sizing: border-box;
      height: 280px;
      padding: 10px;
      overflow: scroll;
    }
    /deep/ .el-checkbox+.el-checkbox {
      margin-left: unset;
    }
    /deep/ .el-tree-node>.el-tree-node__children {
      overflow: unset;
    }
    /deep/ .el-checkbox-group .el-checkbox {
      display: table-row;
    }
  }
</style>
