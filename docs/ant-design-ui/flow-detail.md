### flow-detail 审批流详情组件

#### 概述

审批流详情组件是根据一定的数据自动生成当前审批节点详情页的一个组件。

#### 组件示例

<div style="margin-top: 20px;">
  <antd-xy-flow-detail></antd-xy-flow-detail>
</div>

#### 数据结构说明

#### 整体结构概览

> 我们将数据分为大块和小块，每一个大块包含一组完整的审批数据，里面的小块是审批数据的细项内容。

```
[
  大块数据 {
    小块数据 [
      {每个小块内容},
      {每个小块内容},
    ],
  },
  大块数据 {
    小块数据 [
      {每个小块内容},
      {每个小块内容},
    ],
  },
]
```

#### 详细数据结构示例

```js
[
  {
    // 定义大块本身的信息
    info: {
      title: '标题',
      subTitle: '子标题',
      // 审批状态
      examin: {
        // 状态码
        // 需要根据业务定义出所有全状态码
        // 0-待审批，1-审批中，2-审批驳回，3-审批通过
        status: 2,
        text: '当前状态：审批驳回',
        // 依附于审批状态的额外信息
        message: '营业执照照片不符合要求'
      },
    },
    // 小块数据
    patchs: [
      {
        // 标题
        title: '小块标题',
        // 类型
        type: 'table',
        // 字段
        fields: {
          // 有 head 就是普通表格，没有 head，就只渲染 body
          head: [
            {},{},{},
            {
              title: '标题1',
              options: {
                colspan: 1,
              },
            },
          ],
          body: [
            [{},{},{},{}],
            // 定义表格数据结构
            [
              {
                // 类型为普通文本的字段
                type: 'text',
                value: '标题',
                // 选项
                options: {
                  colspan: 1,
                  style: {
                    fontWeight: 'bold',
                  }
                }
              },
              {
                // 类型为指定组件的字段
                type: 'components',
                components: 'sensitive',
                value: '15010992073',
                options: {
                  colspan: 3,
                }
              },
              {
                // 类型为图片预览的组件
                type: 'components',
                components: 'v-viewer',
                value: [
                  {
                    name: 'xiyun.jpg',
                    src: './images/23984sdfiuwoer.jpg',
                    desc: '上传时间：2019-01-23',
                  }
                ],
              },
              {
                // 类型为下载的组件
                type: 'components',
                components: 'download',
                value: [
                  {
                    name: 'xiyun.zip',
                    src: './files/23984sdfiuwoer.zip',
                  }
                ],
              }
            ],
            [{},{},{},{}],
          ],
        }
      },

      {
        type: 'tap',
        title: 'tap多页',
        fields: [
          // 每一个 tap 页的数据
          {},{},{},
          {
            // 某个 tap 页本身的信息
            info: {
              // tap 页名称
              name: '阿迪达斯',
              // tap 唯一 key
              key: '1',
            },
            // 小块数据
            patchs: [
              {},{}
            ]
          },
        ]
      }
    ]
  },
]
```