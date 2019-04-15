### transfer 穿梭框

#### 概述
transfer 组件可以用于业务复杂且数据量和层级都较深的数据选择场景下

#### 组件示例

#### 1、目标选框为树型结构

<div style="margin-top: 10px;">
 <xy-transfer
   :data="[{ id: 1, label: '一级 1', children: [
                { id: 2, label: '二级 1-1', children:
                    [
                      { id: 3, label: '三级 1-1-1' },
                      { id: 4, label: '三级 1-1-2' },
                      { id: 5, label: '三级 1-1-3' },
                      { id: 10, label: '三级 1-1-3', disabled: true },
                    ]
                },
                { id: 6, label: '四级 1-1', children:
                    [
                      { id: 7, label: '五级 1-1-1' },
                      { id: 8, label: '五级 1-1-2' },
                      { id: 9, label: '五级 1-1-3' },
                    ]
                }
                ]
            }]"
   targetType="tree"
   :props="{ children: 'children', label: 'label', key: 'id' }"></xy-transfer>
</div>


#### 2、目标选框为多选项组结构

<div style="margin-top: 10px;">
  <xy-transfer
    :data="[{ id: 1, label: '一级 1', children: [
                 { id: 2, label: '二级 1-1', children:
                     [
                       { id: 3, label: '三级 1-1-1' },
                       { id: 4, label: '三级 1-1-2' },
                       { id: 5, label: '三级 1-1-3' },
                       { id: 10, label: '三级 1-1-3', disabled: true },
                     ]
                 },
                 { id: 6, label: '四级 1-1', children:
                     [
                       { id: 7, label: '五级 1-1-1' },
                       { id: 8, label: '五级 1-1-2' },
                       { id: 9, label: '五级 1-1-3' },
                     ]
                 }
                 ]
             }]"
    targetType="normal"
    :props="{ children: 'children', label: 'label', key: 'id' }"></xy-transfer>
</div>

#### 代码示例

```html
<template>
<xy-transfer
  v-model="demoValue"
  :data="demoData"
  targetType="tree"
  :props="props"
  @change="handleChange"></xy-transfer>
</template>
```

```js
module.exports = {
    data () {
      return {
        demoData: [
          { id: 1, label: '一级 1', children: [
              { id: 2, label: '二级 1-1', children:
                  [
                    { id: 3, label: '三级 1-1-1' },
                    { id: 4, label: '三级 1-1-2' },
                    { id: 5, label: '三级 1-1-3' },
                    { id: 10, label: '三级 1-1-3', disabled: true },
                  ]
              },
              { id: 6, label: '四级 1-1', children:
                  [
                    { id: 7, label: '五级 1-1-1' },
                    { id: 8, label: '五级 1-1-2' },
                    { id: 9, label: '五级 1-1-3' },
                  ]
              }
              ]
          }],
        demoValue: [4,7,8],
        props: { children: 'children', label: 'label', key: 'id' },
      }
    },
    methods: {
      handleChange(val) {
        console.log('选项变动：', val)
      }
    }
  }
```

#### API

| 属性 | 说明 | 默认值 |
| ------ | ------ | :------: |
| data | 提供给穿梭框的源数据 | [] |
| v-model | 需要选中的数据id（需要与源数据相关） | [] |
| targetType | 目标选框的展示类型，提供树形类型和多选框组类型，可取值有：normal 和 tree | normal |
| props | 源数据与穿梭框的字段映射 | {children: 'children', label: 'label', key: 'id'} |
| titles | 设置左右选框的标题，数组格式：['左选框', '右选框'] | ['选取列表', '目标列表'] |
| change | 目标选框的 change 事件，返回目标选框中当前数据的 id 数组 | function |
| left-check-change | 左选框的 change 事件，返回左选框中当前选择的数据 | function |
| right-check-change | 右选框的 change 事件，返回右选框中当前选择的数据 | function |
