<template>
  <div>
    <el-row class="item">
      <el-col :span="columnSpan[0]" class="left-column pl16">

        <!--重命名表单-->
        <template v-if="isShowLv1Form || isRenaming">
          <el-input v-model="form.curLabel" placeholder="请输入内容" size="mini" style="width: 25%; margin-right: 10px;"></el-input>
          <el-button type="primary" size="mini" @click="rename">保存</el-button>
          <el-button size="mini" @click="cancel">取消</el-button>
        </template>

        <!--展示label-->
        <template v-if="!isRenaming">
          <span :style="computeMargin">
            {{getNodeLabel}}
          </span>
        </template>

      </el-col>

      <!--操作项-->
      <el-col :span="columnSpan[1]" class="right-column pl16">

        <!--新添加节点时不展示操作按纽-->
        <template v-if="!isNoData && !isRenaming">
          <el-button type="text" size="tiny"
                     :disabled="isMaxLevel"
                     @click="addNewNode"
          >新增子级
          </el-button>

          <!--第一级是否要显示重命名-->
          <template v-if="showLv1Form && isLevel1">
            <span class="split">|</span>
            <el-button type="text" size="tiny" @click="renameLabel">重命名</el-button>
          </template>

          <template v-if="!isLevel1">
            <span class="split">|</span>
            <el-button type="text" size="tiny" @click="renameLabel">重命名</el-button>

            <span class="split">|</span>
            <el-button type="text" size="tiny" @click="removeOldNode">删除</el-button>
          </template>
        </template>

      </el-col>

    </el-row>

    <!--满足条件时递归调用本身-->
    <template v-if="isRecursive">
      <node-list
        v-for="(item, index) in nodeData[mapFields.nodeChildren]"
        :key="index"
        :columnSpan="columnSpan"
        :treeData="item"
        :fieldsMapping="fieldsMapping"
        :maxLevel="maxLevel"
        :parentNode="nodeData"
        :onCreate="onCreate"
        :onRename="onRename"
        :onDelete="onDelete"
      ></node-list>
    </template>

  </div>

</template>

<script>
import lodash from 'lodash';

export default {
  name: 'NodeList',
  props: {
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
  data() {
    return {
      mapFields: {}, // 字段映射
      nodeData: {}, // 用于接收 treeData 数据
      form: {
        curLabel: '',
      },
      isRenaming: false, // 是否在重命名状态下
    };
  },
  computed: {
    /**
     * 判断组件是否需要递归
     */
    isRecursive() {
      return (
        this.mapFields.nodeChildren in this.nodeData &&
        this.nodeData[this.mapFields.nodeChildren].length
      );
    },

    /**
     * 校验是否是第一级
     */
    isLevel1() {
      return +this.nodeData[this.mapFields.nodeLevel] === 1;
    },

    /**
     * 校验是否达到了最大级别
     * @returns {boolean}
     */
    isMaxLevel() {
      return this.nodeData[this.mapFields.nodeLevel] >= this.maxLevel;
    },

    /**
     * 获取标签名称
     * @returns {*}
     */
    getNodeLabel() {
      if (this.nodeData[this.mapFields.nodeLevel] > 1)
        return `|—${this.nodeData[this.mapFields.nodeName]}`;
      return this.nodeData[this.mapFields.nodeName];
    },

    /**
     * 计算每个子级的 margin
     * @returns {{marginLeft: string}}
     */
    computeMargin() {
      return { marginLeft: `${20 * (this.nodeData[this.mapFields.nodeLevel] - 1)}px` };
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
  },
  created() {
    this.mapFields = {
      nodeName: this.fieldsMapping.nodeName || 'nodeName',
      nodeId: this.fieldsMapping.nodeId || 'nodeId',
      nodeLevel: this.fieldsMapping.nodeLevel || 'nodeLevel',
      nodeChildren: this.fieldsMapping.nodeChildren || 'nodeChildren',
    };

    this.nodeData = this.treeData;

    // 新增子级后，保持重命名状态
    if ('newNode' in this.nodeData) {
      this.isRenaming = true;
    }
  },
  watch: {
    treeData(data) {
      this.nodeData = data;
      this.isRenaming = false;
    },
  },
  methods: {
    /**
     * 展示重命名表单
     */
    renameLabel() {
      this.isRenaming = true;
      this.form.curLabel = this.nodeData[this.mapFields.nodeName];
    },

    /**
     * 重命名节点
     * 如果是新节点：
     *    向外部方法传递 父节点数据 和 新修改的节点名称
     * 如果是老节点：
     *    向外部方法传递 当前节点数据 和 新修改的节点名称
     */
    rename() {
      if ('newNode' in this.nodeData || (this.isShowLv1Form && this.isNoData)) {
        this.onCreate(this.parentNode, this.form.curLabel);
      } else {
        this.onRename(this.nodeData, this.form.curLabel);
      }
    },

    /**
     * 取消重命名的操作
     */
    cancel() {
      if ('newNode' in this.nodeData) {
        this.removeNewNode();
      }
      this.isRenaming = false;
    },

    /**
     * 执行移除新添加的节点操作
     */
    removeNewNode() {
      const children = this.parentNode[this.mapFields.nodeChildren];
      const index = children.findIndex(o => o.idx === this.nodeData.idx);
      this.parentNode[this.mapFields.nodeChildren].splice(index, 1);
    },

    /**
     * 在 dom 中新增一个子节点
     */
    addNewNode() {
      const node = lodash.cloneDeep(this.nodeData);

      const childNode = {
        [this.mapFields.nodeName]: '',
        [this.mapFields.nodeLevel]: +node[this.mapFields.nodeLevel] + 1,
        newNode: true,
      };

      // 新添加的子级，为了删除便利，特增加了一个索引
      // 如果要添加的子级的上级没有 children 属性
      if (!(this.mapFields.nodeChildren in node)) {
        childNode.idx = 0;
        node[this.mapFields.nodeChildren] = [childNode];
      } else {
        childNode.idx = node[this.mapFields.nodeChildren].length;
        node[this.mapFields.nodeChildren].push(childNode);
      }
      this.nodeData = node;
    },

    /**
     * 删除已存在的节点
     */
    removeOldNode() {
      this.$confirm('您确定删除该项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 如果还有子级就不允许删除
        if (
          this.mapFields.nodeChildren in this.nodeData &&
          this.nodeData[this.mapFields.nodeChildren].length
        ) {
          this.$message.error('请先删除节点下的子级！');
          // this.$alert('该节点下还有子级，请先删除它们！', '提示', {
          //   confirmButtonText: '确定',
          // });
        } else {
          this.onDelete(this.nodeData);
        }
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

.right-column {
  border-left: 1px solid #dfe6ec;
  font-size: 12px;
}

.split {
  color: #e4e4e4;
}

.right-column /deep/ .el-button,
.left-column /deep/ .el-button {
  font-size: 12px;
}
</style>
