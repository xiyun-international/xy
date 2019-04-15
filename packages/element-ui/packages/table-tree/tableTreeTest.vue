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
      :props="props"
      :maxLevel="maxLevel"
      :showLv1Form="showLv1Form"
      :on-rename="onRename"
      :on-delete="onDelete"
      :on-add="onAdd"
    ></node-list>


    <el-dialog
      :title="getTitle"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleDialogClose"
      @close="resetData"
    >
      <el-form ref="dialogForm" :model="form" :rules="validator" label-width="80px">
        <el-form-item prop="name" :label="formLabel">
          <el-input v-model="form.name" :placeholder="inputPlaceholder"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetData">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NodeList from './nodeListTest.vue';

export default {
  name: 'XyTableTree',
  components: {
    NodeList,
  },
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
    formLabel: {
      type: String,
      default() {
        return '名称：'
      }
    },
    inputPlaceholder: {
      type: String,
      default() {
        return '请输入'
      }
    },
    addTitle: {
      type: String,
      default() {
        return '新增下级'
      }
    },
    editTitle: {
      type: String,
      default() {
        return '编辑'
      }
    },
    rules: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isAdd: true,
      dialogVisible: false,
      node: {},
      form: {
        name: '',
      },
      validator: {
        name: this.rules,
      }
    }
  },
  computed: {
    getTitle() {
      return this.isAdd ? this.addTitle : this.editTitle;
    },
  },
  methods: {
    resetData() {
      this.node = {};
      this.dialogVisible = false;
      // 移除错误提示
      this.$refs.dialogForm.resetFields();
      // 解决reset把赋值当成初始值的问题
      this.form.name = '';
    },
    handleOk() {
      if (this.isAdd) {
        this.onCreate();
      } else {
        this.onUpdate();
      }
    },
    handleDialogClose(done) {
      this.resetData();
      done();
    },
    onAdd(node) {
      this.isAdd = true;
      this.node = node;
      this.dialogVisible = true;
    },
    onCreate() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.$emit('on-create', this.node, this.form.name);
          this.resetData();
        }
      })
    },
    onRename(node) {
      this.isAdd = false;
      this.dialogVisible = true;
      this.node = node;
      this.form.name = node[this.props.label]
    },
    onUpdate() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.$emit('on-update', this.node, this.form.name);
          this.resetData();
        }
      })
    },
    onDelete(node) {
      this.$emit('on-delete', node);
      this.resetData();
    }
  }
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
