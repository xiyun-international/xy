// 结构参考来源：https://github.com/vue-generators/vue-form-generator
// 表格结构参考来源：https://ant.design/components/table-cn/

let chunks = [
  // 大块内容
  {
    // 定义大块信息
    info: {
      title: '邯郸二中 ',
      subTitle: '项目编号：201906186844',
      // 审批状态
      examin: {
        title: '当前状态：待审批',
        status: 'waiting',
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
                value: '业务线',
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
                value: '中学事业部',
                options: {
                  colspan: 3,
                },
              },
            ],
            [
              {
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
                value: '232323hj-223	',
                options: {
                  colspan: 1,
                  extra: {
                    type: 'components',
                    components: 'sensitive',
                  },
                },
              },
              {
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
                value: '18219872083',
                options: {
                  colspan: 1,
                  extra: {
                    type: 'components',
                    components: 'sensitive',
                  },
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
                value: '设备',
                // 选项
                options: {
                  colspan: 1,
                },
              },
              {
                // 字段
                value: 'D : 3',
                options: {
                  colspan: 1,
                },
              },
              {
                // 字段
                value: 'D : 5',
                options: {
                  colspan: 1,
                },
              },
              {
                // 字段
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
              name: '阿迪达斯',
              key: 'first',
            },
            patchs: [
              {
                title: 'adidas',
                type: 'table',
                fields: {
                  body: [
                    // 定义表格数据结构
                    [
                      {
                        value: '业务线',
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
                        value: '中学事业部',
                        options: {
                          colspan: 3,
                        },
                      },
                    ],
                    [
                      {
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
                        value: '232323hj-223	',
                        options: {
                          colspan: 1,
                          extra: {
                            type: 'components',
                            components: 'sensitive',
                          },
                        },
                      },
                      {
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
                        value: '18219872083',
                        options: {
                          colspan: 1,
                          extra: {
                            type: 'components',
                            components: 'sensitive',
                          },
                        },
                      },
                    ],
                  ],
                },
              },
              // {}
            ],
          },
          {
            info: {
              name: 'nike',
              key: 'second',
            },
            patchs: [
              {
                title: 'nike',
                type: 'table',
                fields: {
                  body: [
                    // 定义表格数据结构
                    [
                      {
                        value: '业务线',
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
                        value: '中学事业部',
                        options: {
                          colspan: 3,
                        },
                      },
                    ],
                    [
                      {
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
                        value: '232323hj-223	',
                        options: {
                          colspan: 1,
                          extra: {
                            type: 'components',
                            components: 'sensitive',
                          },
                        },
                      },
                      {
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
                        value: '18219872083',
                        options: {
                          colspan: 1,
                          extra: {
                            type: 'components',
                            components: 'sensitive',
                          },
                        },
                      },
                    ],
                  ],
                },
              },
              // {}
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
            // 定义表格数据结构
            [
              {
                value: '业务线',
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
                value: '中学事业部',
                options: {
                  colspan: 3,
                },
              },
            ],
            [
              {
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
                value: [
                  {
                    type: 'picWall',
                    name: 'xiyun.jpg',
                    src: 'http://www.baidu.com/img/baidu_resultlogo@2.png',
                    desc: '2019-01-23',
                  },
                ],
              },
              {
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
                value: [
                  {
                    type: 'download',
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
];
export default chunks;
