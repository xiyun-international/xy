<template>
  <div>
    <el-row class="item">
      <el-col :span="columnSpan[0]" class="left-column pl16">
        <template v-if="isShowLv1Form">
          <el-button type="primary" size="mini" @click="addNode">新增子级</el-button>
        </template>
        <!--展示label-->
        <template v-else>
          <span @click.stop="handleClick" :class="isPointer" :style="computeMargin">
            <i v-if="!isLeaf" :class="iconClass"></i>
            <i v-else class="xy-white-place"></i>
            <span class="xy-no-select">{{getNodeLabel}}</span>
          </span>
        </template>
      </el-col>

      <!--操作项-->
      <el-col :span="columnSpan[1]" class="right-column pl16">
        <!--新添加节点时不展示操作按纽-->
        <template v-if="!isNoData">
          <el-button type="text" size="tiny"
                     :disabled="isMaxLevel"
                     @click="addNode"
          >新增子级
          </el-button>

          <!--第一级是否要显示重命名-->
          <template v-if="showLv1Form && isLevel1">
            <span class="split">|</span>
            <el-button type="text" size="tiny" @click="renameNode">重命名</el-button>
          </template>

          <template v-if="!isLevel1">
            <span class="split">|</span>
            <el-button type="text" size="tiny" @click="renameNode">重命名</el-button>

            <span class="split">|</span>
            <el-button type="text" size="tiny" @click="removeNode">删除</el-button>
          </template>
        </template>

      </el-col>

    </el-row>

    <!--满足条件时递归调用本身-->
    <div v-if="isRecursive" v-show="expanded">
      <node-list
        v-for="(item, index) in nodeData[props.children]"
        :key="index"
        :columnSpan="columnSpan"
        :treeData="item"
        :props="props"
        :maxLevel="maxLevel"
        :parentNode="nodeData"
        :on-add="onAdd"
        :onRename="onRename"
        :onDelete="onDelete"
        :is-lv1="false"
        :lv="level + 1"
      ></node-list>
    </div>

  </div>

</template>

<script>
import { isEmpty } from 'lodash';

export default {
  name: 'NodeList',
  props: {
    props: {
      type: Object,
      default() {
        return {
          label: 'label',
          id: 'id',
          children: 'children',
        };
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
    maxLevel: {
      type: Number,
      default() {
        return 3;
      },
    },
    parentNode: {
      type: Object,
      default() {
        return {};
      },
    },
    showLv1Form: {
      type: Boolean,
      default() {
        return false;
      },
    },
    onAdd: {
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
    isLv1: {
      type: Boolean,
      default() {
        return true
      },
    },
    lv: {
      type: Number,
      default() {
        return 1
      },
    },
  },
  data() {
    return {
      nodeData: {}, // 用于接收 treeData 数据
      childNodeRendered: true,
      expanded: true,
      level: this.lv,
      form: {
        curLabel: '',
      },
    };
  },
  computed: {
    /**
     * 判断组件是否需要递归
     */
    isRecursive() {
      return (
        this.childNodeRendered &&
        this.props.children in this.nodeData &&
        this.nodeData[this.props.children].length
      );
    },

    /**
     * 校验是否是第一级
     */
    isLevel1() {
      return isEmpty(this.parentNode);
    },

    /**
     * 校验是否达到了最大级别
     * @returns {boolean}
     */
    isMaxLevel() {
      return this.level >= this.maxLevel;
    },

    /**
     * 获取标签名称
     * @returns {*}
     */
    getNodeLabel() {
      if ('amount' in this.nodeData) {
        return `${this.nodeData[this.props.label]}（${this.nodeData.amount}）`
      }
      return this.nodeData[this.props.label];
    },

    /**
     * 计算每个子级的 margin
     * @returns {{marginLeft: string}}
     */
    computeMargin() {
      return { marginLeft: `${12 * (this.level - 1)}px` };
    },

    /**
     * 如果第一级展示重命名按纽，并且它还是空数据的话，就展示表单
     */
    isShowLv1Form() {
      return this.showLv1Form && this.isNoData;
    },

    /**
     * 校验是否有数据
     */
    isNoData() {
      return Object.keys(this.nodeData).length === 0;
    },
    /**
     * 切换icon
     */
    iconClass() {
      if (!this.expanded) {
        return 'el-icon-caret-right'
      }
      return 'el-icon-caret-bottom'
    },
    isLeaf() {
      if (this.props.children in this.nodeData) {
        return this.nodeData[this.props.children].length === 0;
      }
      return true;
    },
    isPointer() {
      return this.isLeaf ? 'xy-default' : 'xy-label-item';
    }
  },
  mounted() {
    this.nodeData = this.treeData;
  },
  watch: {
    treeData(data) {
      this.nodeData = data;
    },
    expanded(val) {
      if (val) {
        this.childNodeRendered = true;
      }
    }
  },
  methods: {
    handleClick() {
      const children = this.nodeData[this.props.children];
      if (children === undefined || children.length === 0) return;
      this.expanded = !this.expanded;
    },
    /**
     * 重命名节点
     */
    renameNode() {
      this.onRename(this.nodeData)
    },

    /**
     * 中新增一个子节点
     */
    addNode() {
      this.onAdd(this.nodeData)
    },

    /**
     * 删除节点
     */
    removeNode() {
      this.$confirm('您确定删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 如果还有子级就不允许删除
        if (
          this.props.children in this.nodeData &&
          this.nodeData[this.props.children].length
        ) {
          this.$message.error('请先删除节点下的子级！');
        } else {
          this.onDelete(this.nodeData);
        }
      }).catch(() => {

      });
    },
  },
};
</script>

<style scoped>
.pl16 {
  padding-left: 16px;
}
.item {
  /*height: 40px;*/
  line-height: 40px;
  border: 1px solid #dfe6ec;
  border-top: 0 none;
  color: #1f2d3d;
  font-size: 12px;
}
.xy-label-item {
  cursor: pointer;
}
.xy-default {
  cursor: default;
}
.right-column {
  border-left: 1px solid #dfe6ec;
  font-size: 12px;
}
.xy-no-select {
  user-select: none;
}
.xy-white-place {
  display: inline-block;
  width: 12px;
  height: 12px;
}
.split {
  color: #e4e4e4;
}

.right-column /deep/ .el-button,
.left-column /deep/ .el-button {
  font-size: 12px;
}
</style>
