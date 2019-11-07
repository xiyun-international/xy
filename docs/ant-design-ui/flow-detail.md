### flow-detail 审批流详情组件

#### 概述

审批流详情组件是根据一定的数据自动生成当前审批节点详情页的一个组件。

#### 组件示例

<antd-xy-flow-detail :data="data" />
<script>
export default {
  data() {
    return {
      data: [
        // 大块内容
        {
            // 定义大块信息
            info: {
            title: '邯郸二中 ',
            subTitle: '项目编号：201906186844',
            // 审批状态
            examin: {
                text: '当前状态：待审批',
                status: 0,
                message: '营业执照照片不符合要求',
            },
            },
            // 小块内容
            patchs: [
            {
                // 标题
                title: '项目基本信息',
                // 内容
                type: 'table', // 定义小块类型
                fields: {
                body: [
                    // 定义表格数据结构
                    [
                    {
                        type: 'text',
                        value: '业务线<br/>业务线',
                        // 选项
                        options: {
                        colspan: 1,
                        style: {
                            fontWeight: 'bold',
                        },
                        },
                    },
                    {
                        // 字段
                        type: 'text',
                        value: '中学事业部',
                        options: {
                        colspan: 3,
                        },
                    },
                    ],
                    [
                    {
                        type: 'text',
                        value: '餐饮中心名称',
                        // 选项
                        options: {
                        colspan: 1,
                        style: {
                            fontWeight: 'bold',
                        },
                        },
                    },
                    {
                        // 字段
                        type: 'text',
                        value: '232323hj-223	',
                        options: {
                        colspan: 1,
                        },
                    },
                    {
                        type: 'text',
                        value: '联系人手机号',
                        // 选项
                        options: {
                        colspan: 1,
                        style: {
                            fontWeight: 'bold',
                        },
                        },
                    },
                    {
                        // 字段
                        type: 'components',
                        components: 'sensitive',
                        value: '18219872083',
                        options: {
                        colspan: 1,
                        },
                    },
                    ],
                     [
                    {
                        type: 'text',
                        value: '餐饮中心名称',
                        // 选项
                        options: {
                        colspan: 1,
                        style: {
                            fontWeight: 'bold',
                        },
                        },
                    },
                    {
                        // 字段
                        type: 'text',
                        value: '232323hj	',
                        options: {
                        colspan: 1,
                        },
                    },
                    {
                        type: 'text',
                        value: '联系人手机号',
                        // 选项
                        options: {
                        colspan: 1,
                        style: {
                            fontWeight: 'bold',
                        },
                        },
                    },
                    {
                        // 字段
                        type: 'components',
                        components: 'sensitive',
                        value: '18337623288',
                        options: {
                        colspan: 1,
                        },
                    },
                    ],
                ],
                },
            },
            {
                // 标题
                title: '变更汇总表',
                // 内容
                type: 'table', // 定义小块类型
                fields: {
                // 有 head 就是普通表格，没有 head，就只渲染 body
                head: [
                    {
                    title: '设备及配件',
                    options: {
                        colspan: 1,
                    },
                    },
                    {
                    title: '变更前',
                    options: {
                        colspan: 1,
                    },
                    },
                    {
                    title: '变更后',
                    options: {
                        colspan: 1,
                    },
                    },
                    {
                    title: '本次变更内容',
                    options: {
                        colspan: 1,
                    },
                    },
                ],
                body: [
                    // 定义表格数据结构
                    [
                    {
                        type: 'text',
                        value: '设备1',
                        // 选项
                        options: {
                        colspan: 1,
                        },
                    },
                    {
                        // 字段
                        type: 'text',
                        value: 'D : 3',
                        options: {
                        colspan: 1,
                        },
                    },
                    {
                        // 字段
                        type: 'text',
                        value: 'D : 5',
                        options: {
                        colspan: 1,
                        },
                    },
                    {
                        // 字段
                        type: 'text',
                        value: 'D : +2',
                        options: {
                        colspan: 1,
                        },
                    },
                    ],
                    [
                    {
                        type: 'text',
                        value: '设备2',
                        // 选项
                        options: {
                        colspan: 1,
                        },
                    },
                    {
                        // 字段
                        type: 'text',
                        value: 'D : 3',
                        options: {
                        colspan: 1,
                        },
                    },
                    {
                        // 字段
                        type: 'text',
                        value: 'D : 5',
                        options: {
                        colspan: 1,
                        },
                    },
                    {
                        // 字段
                        type: 'text',
                        value: 'D : +2',
                        options: {
                        colspan: 1,
                        },
                    },
                    ],
                ],
                },
            },
            {
                title: 'tap多页',
                type: 'multiTaps',
                fields: [
                {
                    info: {
                    name: 'tab1',
                    key: 'first',
                    },
                    patchs: [
                    {
                        title: 'tab11',
                        type: 'table',
                        fields: {
                        body: [],
                        },
                    },
                    ],
                },
                {
                    info: {
                    name: 'tab2',
                    key: 'second',
                    },
                    patchs: [
                    {
                        title: 'tib22',
                        type: 'table',
                        fields: {
                        body: [],
                        },
                    },
                    ],
                },
                ],
            },
            ],
        },
        {
            // 定义大块信息
            info: {
            title: '邯郸三中 ',
            subTitle: '项目编号：201906186844',
            },
            // 小块内容
            patchs: [
            {
                // 标题
                title: '项目基本信息',
                // 内容
                type: 'table', // 定义小块类型
                fields: {
                body: [
                    [
                    {
                        type: 'text',
                        value: '资质证书照片',
                        // 选项
                        options: {
                        colspan: 1,
                        style: {
                            fontWeight: 'bold',
                        },
                        },
                    },
                    {
                        type: 'components',
                        components: 'v-viewer',
                        value: [
                        {
                            name: 'xiyun.jpg',
                            src: 'http://www.baidu.com/img/baidu_resultlogo@2.png',
                            desc: '2019-01-23',
                        },
                        ],
                    },
                    {
                        type: 'text',
                        value: '附件',
                        // 选项
                        options: {
                        colspan: 1,
                        style: {
                            fontWeight: 'bold',
                        },
                        },
                    },
                    {
                        // 类型为下载的组件
                        type: 'components',
                        components: 'download',
                        value: [
                        {
                            name: 'xiyun1.jpg',
                            src: 'http://www.baidu.com/img/baidu_resultlogo@2.png',
                            desc: '2019-01-23',
                        },
                        ],
                    },
                    ],
                ],
                },
            },
            ],
        },
      ],
    }
  },
}
</script>
#### 代码示例
```html
<xy-flow-detail :data="data" /> // data为详情数据
```
#### 数据结构说明

#### 整体结构概览

> 我们将数据分为大块和小块，每一个大块包含一组完整的审批数据，里面的小块是审批数据的细项内容。

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
