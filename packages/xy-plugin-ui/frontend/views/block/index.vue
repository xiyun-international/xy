<template>
  <div class="xy-block">
    <div class="block-content">
      <!-- 主类型 -->
      <a-tabs :defaultActiveKey="mainTypeOptions[0].value">
        <a-tab-pane
          :key="mainType.value"
          :tab="mainType.label"
          v-for="(mainType, mainTypeIndex) in mainTypeOptions"
        ></a-tab-pane>
      </a-tabs>

      <!-- 组件库类别 -->
      <a-radio-group v-model="query.libraryType">
        <a-radio-button
          :key="libraryType.value"
          :value="libraryType.value"
          v-for="(libraryType, libraryTypeIndex) in libraryTypeOptions"
        >{{ libraryType.label }}</a-radio-button>
      </a-radio-group>

      <!-- 关键字搜索 -->
      <a-input-search
        class="header-search"
        placeholder="输入区块名称"
        style="margin-top: 20px"
        v-model="query.keyword"
      />

      <!-- 目录类型 -->
      <a-card
        class="content-search"
        style="margin-top: 20px"
      >
        <tag-select
          :default-values="query.categories"
          :options="categoryOptions"
          @confirm="changeCategory"
          mode="multiple"
        ></tag-select>
      </a-card>

      <div class="content-list">
        <div
          :key="blockIndex"
          class="content-list__item"
          v-for="(block, blockIndex) in blocks"
        >
          <a-card
            class="content-list__item__inner"
            hoverable
          >
            <img
              :src="block.screenshot"
              alt="example"
              slot="cover"
            />
            <a-card-meta slot="actions">
              <template slot="description">
                <div>{{ block.name }}</div>
                <div>{{ block.title }}</div>
                <a @click="downloadBlock(block)">-下载-</a>
              </template>
            </a-card-meta>
          </a-card>
        </div>
      </div>

      <a-pagination
        :page-size-options="['5','10','20']"
        :page-size.sync="pagination.pageSize"
        :total="pagination.total"
        showSizeChanger
        v-model="pagination.current"
      />

      <div
        ref="xterm"
        style="margin-top:20px"
      ></div>
    </div>
  </div>
</template>

<script>
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import io from 'socket.io-client';
import TagSelect from '@/components/_tag-select.vue'

export default {
  components: {
    TagSelect,
  },
  data() {
    return {
      // 数据集
      categoryOptions:[],
      mainTypeOptions:[],
      libraryTypeOptions:[],

      // 参数
      query: {
        mainType: 'common-block',
        libraryType: 'antd',
        categories: ['信息展示'],
        keyword: '',
      },
      // 分页
      pagination: {
        current: 1,
        total: 20,
        pageSize: 5,
      },
      blocks: [],

      isDownloadBlock: false,

      term: null,
      socket: null,
    }
  },

  async created() {
    this.categoryOptions = [
      {value: "信息展示", label: "信息展示"},
      {value: "验证", label: "验证"},
      {value: "按钮", label: "按钮"},
    ]
    this.mainTypeOptions = [
      {value: 'common-block', label: '区块'},
      // {value: 'weixinProgram', label: '小程序'},
    ]
    this.libraryTypeOptions = [
      {value: 'antd', label: 'ant-design-vue'},
      {value: 'ele', label: 'element-ui'},
    ]
  },

  mounted() {
    this.initSocket()
    this.initXterm()
  },

  computed: {
    params() {
      return {
        query: this.query,
        pagination: this.pagination,
      }
    }
  },

  watch: {
    params: {
      handler() {
        this.getBlocks()
      },
      immediate: true,
      deep: true,
    }
  },

  methods: {
    // 获取所有区块
    getBlocks() {
      this.$get('blocks', {
        params: this.params,
      }).then(({data}) => {
        this.blocks = data.data
        this.pagination.total = data.pagination.total
      })
    },

    // 封装一个 graphql 请求的方法
    graphqlPost(path, params, resConfigStr) {
      // 格式化参数部分
      function getFormatParamsStr(obj) {
        let paramsStr = JSON.stringify(obj)
        paramsStr = paramsStr.replace(/"(\w*)":/g, `$1:`)
        paramsStr = paramsStr.slice(1, paramsStr.length-1)
        return paramsStr
      }

      // 暂时没用,但别删: 格式化响应数据
      function getFormatResponseStr(obj) {
        let responseStr = JSON.stringify(obj)
        const rpls = [
          [/\[/g,"{"],
          [/\]/g,"}"],
          [/[:"]/g, ''],
        ]
        rpls.forEach((rpl) => {
          responseStr = responseStr.replace(rpl[0],rpl[1])
        })

        responseStr = responseStr.slice(1, responseStr.length-1)

        return responseStr
      }

      const query = `
        {
          ${path} (
            ${getFormatParamsStr(params)}
          ) {
            ${resConfigStr}
          }
        }
      `

      return this.$post(
        'graphql',
        JSON.stringify({
          query,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            "Accept": 'application/json',
          },
        }
      ).then((res) => {
        const data = res.data.data[path]

        if (data.code && data.msg) {
          const messageMethods = {
            200: 'success',
            500: 'error',
          }
          const messageMethod = messageMethods[data.code]
          this.$message[messageMethod](data.msg)
        }

        return res
      })
    },

    // 获取区块列表
    getBlocks() {
      const resConfigStr = `
        data {
          name,
          title,
          categories,
          screenshot,
          version,
          repository,
        },
        pagination {
          total,
        }
      `
      
      this.graphqlPost('blocks',
        this.params,
        resConfigStr
      ).then(val => {
        const { data, pagination } = val.data.data.blocks
        this.blocks = data
        this.pagination.total = pagination.total
      })
    },

    // 下载一个区块到本地
    downloadBlock(block) {
      const hide = this.$message.loading('正在下载区块', 0);
      this.isDownloadBlock = true


      const resConfigStr = `
        code
        msg
      `

      this.graphqlPost("downloadBlock",
        _.pick(block, ['name', 'repository']),
        resConfigStr
      ).finally(() => {
        this.isDownloadBlock = false   
        hide() 
      })
    },

    changeCategory(categories) {
      this.query.categories = categories
    },

    initSocket() {
      this.socket = io.connect("http://localhost:3001")

      this.socket.on("task-info",(data) => {
        this.writeTerm(data)
      })
      this.socket.on("task-finish",(data) => {
        this.writeTerm(data)
        this.startTermNewPart()
      })
    },

    initXterm() {
      this.term = new Terminal({ cols: 100, rows: 10 })
      this.term.open(this.$refs.xterm)
      this.startTermNewPart()
    },

    startTermNewPart() {
      this.writeTerm('---- user $')
    },

    writeTerm(rawStr) {
      const strs = rawStr.split(/\n\r|\n/)
      strs.forEach((str) => {
        this.term.writeln(str)
      })
    },

  },
}
</script>

<style lang="less" scoped>
.xy-block {
  .block-content {
    padding: 40px;
    .content-search {
    }
    .content-list {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      .content-list__item {
        width: 25%;
        padding: 10px;
        box-sizing: border-box;
        .content-list__item__inner {
        }
      }
    }
  }
}
</style>