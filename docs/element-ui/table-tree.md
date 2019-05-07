### tableTree 树形表格

#### 概述
具有表格样式的树形选项组件，可用于添加、修改和展示组织架构、会员分类等信息。

#### 组件示例

<div style="margin-top: 10px;">
<ele-xy-table-tree
  v-loading.body="loading"
  columnName="机构名称"
  formLabel="架构名称"
  inputPlaceholder="请输入16个字以内的会员组织架构名称"
  addTitle="新增下级"
  editTitle="修改"
  :rules="rules"
  :columnSpan="[18, 6]"
  :treeData="treeData"
  :props="fieldsMapping"
  :maxLevel="4"
  :showLv1Form="false"
  @on-create="handleCreate"
  @on-update="handleUpdate"
  @on-delete="handleDelete"
/>
</div>

<script>
export default {
  data () {
    return {
      loading: false,
      fieldsMapping: {
        label: 'orgName',
        id: 'orgId',
        children: 'children',
      },
      treeData: {
        orgId: '256',
        orgName: '一级-1',
        level: '1',
        children: [
          {
            orgId: '261',
            orgName: '二级-2-1',
            level: '2',
            children: [],
          },
          {
            orgId: '262',
            orgName: '二级-2-2',
            level: '2',
            children: [
              {
                orgId: '265',
                orgName: '三级-3-1',
                level: '3',
                children: [
                  {
                    orgId: '266',
                    orgName: '四级-4-1',
                    level: '4',
                    children: [],
                  }
                ],
              },
            ],
          },
          {
            orgId: '263',
            orgName: '二级-2-3',
            level: '2',
            children: [
              {
                orgId: '264',
                orgName: '三级-3-1',
                level: '3',
                children: [],
              }
            ],
          },
        ],
      },
      rules: [
        {
          required: true, trigger: 'change',
          validator: (rules, value, callback) => {
            if (value === '') {
              callback(new Error('请输入架构名称'));
            } else if (value === 'test') {
              callback(new Error('该架构名称已存在'));
            } else {
              callback();
            }
          }
        }
      ]
    }
  },
  methods: {
    /**
     * 处理新增组织架构
     *
     * @param parentNode
     * @param newNodeName
     */
    handleCreate(parentNode, newNodeName) {
      console.log(parentNode, newNodeName)
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000)
    },
    handleUpdate(curNode, newNodeName) {
      console.log(curNode, newNodeName)
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000)
    },
    handleDelete(curNode) {
      console.log(curNode)
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000)
    },
  }
};
</script>

#### 代码示例

```html
<xy-table-tree
  v-loading.body="loading"
  columnName="机构名称"
  formLabel="架构名称"
  inputPlaceholder="请输入16个字以内的会员组织架构名称"
  addTitle="新增下级"
  editTitle="修改"
  :rules="rules"
  :columnSpan="[18, 6]"
  :treeData="treeData"
  :props="fieldsMapping"
  :maxLevel="5"
  :showLv1Form="false"
  @on-create="handleCreate"
  @on-update="handleUpdate"
  @on-delete="handleDelete"
/>
```

```js
data () {
  return {
    loading: false,
    fieldsMapping: {
      label: 'orgName',
      id: 'orgId',
      children: 'children',
    },
    treeData: {
      orgId: '256',
      orgName: '武汉大学',
      level: '1',
      children: [
        {
          orgId: '261',
          orgName: '外国语学院',
          level: '2',
          children: [],
        },
      ],
    },
    rules: [
      {
        required: true, trigger: 'change',
        validator: (rules, value, callback) => {
          if (value === '') {
            callback(new Error('请输入架构名称'));
          } else if (value === 'test') {
            callback(new Error('该架构名称已存在'));
          } else {
            callback();
          }
        }
      }
    ]
  }
},
methods: {
  /**
   * 处理新增组织架构
   *
   * @param parentNode
   * @param newNodeName
   */
  handleCreate(parentNode, newNodeName) {
    console.log(parentNode, newNodeName)
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000)
    // this.loading = true;
    // this.post('/v1/org/create', {
    //   orgName: newNodeName,
    //   parentId: parentNode.orgId,
    // })
    //   .then(() => {
    //     this.$message.success('添加成功');
    //     // 再次请求最新数据
    //     this.requestOrgList();
    //   })
    //   .catch(() => {
    //     this.loading = false;
    //   });
  },

  /**
   * 处理重命名组织架构
   *
   * @param curNode
   * @param newNodeName
   */
  handleUpdate(curNode, newNodeName) {
    console.log(curNode, newNodeName)
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000)
    // this.loading = true;
    // this.post('/v1/org/update', {
    //   orgName: newNodeName,
    //   orgId: curNode.orgId,
    // })
    //   .then(res => {
    //     if (+res.bizContent.result === 1) {
    //       this.$message.success('重命名成功');
    //       // 再次请求最新数据
    //       this.requestOrgList();
    //     } else {
    //       this.$message.error('重命名失败');
    //       this.loading = false;
    //     }
    //   })
    //   .catch(() => {
    //     this.loading = false;
    //   });
  },

  /**
   * 处理删除组织架构
   *
   * @param curNode
   */
  handleDelete(curNode) {
    console.log(curNode)
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000)
    // this.loading = true;
    // this.post('/v1/org/remove', {
    //   orgId: curNode.orgId,
    // })
    //   .then(res => {
    //     if (+res.bizContent.result === 1) {
    //       this.$message.success('删除成功');
    //       // 再次请求最新数据
    //       this.requestOrgList();
    //     } else {
    //       this.$message.error('删除失败');
    //       this.loading = false;
    //     }
    //   })
    //   .catch(() => {
    //     this.loading = false;
    //   });
  },
}
```

#### API

| 属性 | 说明 | 默认值 |
| ------ | ------ | :------: |
| v-loading.body | 为组件加上loading状态效果 | false |
| columnName | 表头列的名称 | 空 |
| columnSpan | 用于设置主体列和操作列的宽度 | [18, 6] |
| formLabel | 弹窗的表单label名称 | 名称： |
| inputPlaceholder | 弹窗的表单 input 的 placeholder | 请输入 |
| addTitle | 添加操作弹窗的标题 | 添加下级 |
| editTitle | 修改操作弹窗的标题 | 编辑 |
| :rules | 自定义表单的校验规则 | 无校验规则 |
| treeData | 主要数据源，一组具有children结构的数据，可参考示例 | {} |
| props | 数据源字段映射 | {label:'label',id:'id',children:'children'} |
| maxLevel | 设置最大级别 | 8 |
| showLv1Form | 没有数据时，第一级是否展示输入框 | false |
| onCreate | 创建节点方法 | func |
| onRename | 重命名节点方法 | func |
| onDelete | 删除节点方法 | func |



