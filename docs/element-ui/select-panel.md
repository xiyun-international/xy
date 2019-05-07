### select-panel 下拉框面板

#### 概述

select-panel 下拉框面板组件用于为下拉框提供一个公用的面板，你可以在这个面板里面放置自定义的选择组件。
比如放置一个树形选择组件，但是选择的逻辑需要自己添加。

#### 组件示例

<ele-xy-select-panel v-model="currentSelect" :value="currentSelect" style="width: 100%;margin-top: 20px;">
  <el-tree
    :highlight-current="true"
    :data="data"
    :props="defaultProps"
    accordion
    @node-click="handleNodeClick">
  </el-tree>
</ele-xy-select-panel>

<script>
export default {
  data() {
    return {
      currentSelect: '',
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(val) {
      console.log(val.label);
      this.currentSelect = val.label;
    }
  }
}
</script>

#### 代码示例

```html
<xy-select-panel v-model="currentSelect" style="width:100%">
  <el-tree
    :data="data"
    :props="defaultProps"
    accordion
    @node-click="handleNodeClick">
  </el-tree>
</xy-select-panel>
```

```javascript
export default {
  data() {
    return {
      currentSelect: '',
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(val) {
      console.log(val);
      this.currentSelect = val.label;
    }
  }
}
```

#### API

| 属性 | 类型 | 说明 | 默认值 |
| ------| ------ | ------ | :------: |
| value 或 v-model | String,Number | 提供给 select 展示的值 | 无 |
| slot | VNode | 下拉框面板插槽 | 无 |
