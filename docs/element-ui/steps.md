### Steps 步骤条 

#### 概述

引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

#### 组件示例

<xy-steps :current="2" style="margin-top: 10px;">
 <xy-step></xy-step>
 <xy-step title="审核通过"></xy-step>
 <xy-step title="审核中"><i class="el-icon-time" slot="icon" style="color: #e6a23c;"></i></xy-step>
 <xy-step></xy-step>
</xy-steps>

#### 代码示例

```html
<xy-steps :current="2">
 <xy-step></xy-step>
 <xy-step title="审核通过"></xy-step>
 <xy-step title="审核中"><i class="el-icon-time" slot="icon" style="color: #e6a23c;"></i></xy-step>
 <xy-step></xy-step>
</xy-steps>
```

#### API

#### steps
| 属性 | 类型 | 说明 | 默认值 |
| ------| ------ | ------ | :------: |
| current | Number | 指定当前步骤的进度，从数字 0 开始，代表第一步 | 无 |

#### step
| 属性 | 类型 | 说明 | 默认值 |
| ------| ------ | ------ | :------: |
| title | String | 自定义步骤的标题，如未提供，则会展示步骤序号 | 步骤序号 |
| icon slot | VNode | 自定义步骤的 icon，如未提供，已完成的步骤会展示“√”的图标，未完成的会展示步骤序号 | 步骤序号或“√”图标 |
