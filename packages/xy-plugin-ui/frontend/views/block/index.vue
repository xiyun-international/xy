<template>
  <div class="home">
    <a-row class="p16 t-MT10">
      <a-col :span="23">
        <a-input placeholder="输入区块名称" class="search" v-model="query.keyword">
          <a-icon slot="prefix" type="appstore" />
        </a-input>
      </a-col>
      <a-col :span="1" class="lh32 t-LC">
        <a-icon type="search" class="lh32" @click="getBlocks" />
      </a-col>
      <a-col></a-col>
    </a-row>
    <!-- 目录类型 -->
    <!-- <a-card class="content-search" style="margin-top: 20px">
      <tag-select
        :default-values="query.categories"
        :options="categoryOptions"
        @confirm="changeCategory"
        mode="multiple"
      ></tag-select>
    </a-card>-->
    <a-tabs :defaultActiveKey="mainTypeOptions[0].value">
      <template slot="tabBarExtraContent">
        <a-radio-group v-model="query.libraryType">
          <a-radio-button
            :key="libraryType.value"
            :value="libraryType.value"
            v-for="libraryType in libraryTypeOptions"
          >{{ libraryType.label }}</a-radio-button>
        </a-radio-group>
        <!-- <a-radio-group class="t-MB16 t-ML16">
          <a-radio-button value="small">通用</a-radio-button>
          <a-radio-button value="default">布局</a-radio-button>
        </a-radio-group> -->
      </template>
      <a-tab-pane :key="mainType.value" v-for="mainType in mainTypeOptions">
        <span slot="tab">
          <a-icon :type="mainType.icon" />
          {{ mainType.label }}
        </span>
      </a-tab-pane>
    </a-tabs>
    <a-row class="P16">
      <a-col :span="8" v-for="(item,index) in blocks" :key="index">
        <div class="list-item">
          <img :src="item.screenshot" />
          <a href="#">
            <div class="mask">
              <a-row class="info">
                <a-col :span="12" class="t-LL">
                  <strong>{{ item.title }}</strong>
                </a-col>
                <a-col :span="12">
                  <a-button type="link" icon="download" @click="downloadBlock(item)">下载</a-button>
                  <a-button type="link" icon="ellipsis" @click="toGit(item.repository)">更多信息</a-button>
                </a-col>
              </a-row>
            </div>
          </a>
        </div>
      </a-col>
    </a-row>
    <a-pagination
      class="page"
      :page-size-options="['5','10','20']"
      :page-size.sync="pagination.pageSize"
      :total="pagination.total"
      showSizeChanger
      v-model="pagination.current"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span v-if="props.value!=='50'">{{props.value}}条/页</span>
        <span v-if="props.value==='50'">全部</span>
      </template>
    </a-pagination>
  </div>
</template>

<script>
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import io from 'socket.io-client';
import TagSelect from '@/components/_tag-select.vue';

export default {
  components: {
    TagSelect,
  },
  data() {
    return {
      // 数据集
      categoryOptions: [],
      mainTypeOptions: [],
      libraryTypeOptions: [],

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
    };
  },

  async created() {
    this.categoryOptions = [
      { value: '信息展示', label: '信息展示' },
      { value: '验证', label: '验证' },
      { value: '按钮', label: '按钮' },
    ];
    this.mainTypeOptions = [
      { value: 'common-block', label: '区块', icon: 'desktop' },
      // { value: 'weixinProgram', label: '小程序', icon: 'mobile' },
    ];
    this.libraryTypeOptions = [
      { value: 'antd', label: 'Antd' },
      { value: 'ele', label: 'Ele' },
    ];
  },

  computed: {
    params() {
      return {
        query: this.query,
        pagination: this.pagination,
      };
    },
  },

  watch: {
    params: {
      handler() {
        this.getBlocks();
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    // 获取所有区块
    // getBlocks() {
    //   this.$get('blocks', {
    //     params: this.params,
    //   }).then(({data}) => {
    //     this.blocks = data.data
    //     this.pagination.total = data.pagination.total
    //   })
    // },

    // 封装一个 graphql 请求的方法
    graphqlPost(path, params, resConfigStr) {
      // 格式化参数部分
      function getFormatParamsStr(obj) {
        let paramsStr = JSON.stringify(obj);
        paramsStr = paramsStr.replace(/"(\w*)":/g, `$1:`);
        paramsStr = paramsStr.slice(1, paramsStr.length - 1);
        return paramsStr;
      }

      // 暂时没用,但别删: 格式化响应数据
      function getFormatResponseStr(obj) {
        let responseStr = JSON.stringify(obj);
        const rpls = [[/\[/g, '{'], [/\]/g, '}'], [/[:"]/g, '']];
        rpls.forEach(rpl => {
          responseStr = responseStr.replace(rpl[0], rpl[1]);
        });

        responseStr = responseStr.slice(1, responseStr.length - 1);

        return responseStr;
      }

      const query = `
        {
          ${path} (
            ${getFormatParamsStr(params)}
          ) {
            ${resConfigStr}
          }
        }
      `;

      return this.$post(
        'graphql',
        JSON.stringify({
          query,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      ).then(res => {
        const data = res.data.data[path];

        if (data.code && data.msg) {
          const messageMethods = {
            200: 'success',
            500: 'error',
          };
          const messageMethod = messageMethods[data.code];
          this.$message[messageMethod](data.msg);
        }

        return res;
      });
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
      `;

      this.graphqlPost('blocks', this.params, resConfigStr).then(val => {
        const { data, pagination } = val.data.data.blocks;
        this.blocks = data;
        this.pagination.total = pagination.total;
      });
    },

    // 下载一个区块到本地
    downloadBlock(block) {
      const hide = this.$message.loading('正在下载区块', 0);
      this.isDownloadBlock = true;

      const resConfigStr = `
        code
        msg
      `;

      this.graphqlPost(
        'downloadBlock',
        _.pick(block, ['name', 'repository']),
        resConfigStr,
      ).finally(() => {
        this.isDownloadBlock = false;
        hide();
      });
    },

    changeCategory(categories) {
      this.query.categories = categories;
    },

    toGit(repository) {
      window.open(repository);  
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 26px
}
/deep/ .ant-input {
  border-radius: 30px;
  background: #d5dae647;
  border: 0px;
}
/deep/ .ant-input-affix-wrapper .ant-input-prefix,
.ant-input-affix-wrapper .ant-input-suffix {
  color: #c2c2c2;
}
/deep/ .ant-col-8 {
  padding: 8px;
}
.p16 {
  padding: 16px;
}
.t-MT10 {
  margin-top: 10px;
}
.t-MB16 {
  margin-bottom: 16px;
}
.t-ML16 {
  margin-left: 16px;
}
.t-LC {
  text-align: center;
}
.t-LL {
  text-align: left;
}
.lh32 {
  line-height: 32px;
}
/deep/ .ant-tabs-nav-scroll {
  text-align: left;
}
/deep/ .ant-tabs-nav {
  margin-left: 16px;
}
/deep/ .ant-tabs {
  padding: 0 16px;
}
.P16 {
  padding: 0 16px;
}
.list-item {
  position: relative;
  height: 350px;
  border: 1px solid #dcdee4;
  border-radius: 6px;
  transition: all 0.25s ease-out;
  text-align: center;
  overflow: hidden;
  & a:hover .mask {
    opacity: 1;
  }
  img {
    width: 100%;
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(101, 101, 101, 0.6);
    color: #ffffff;
    opacity: 0;
    .info {
      position: absolute;
      width: 100%;
      bottom: 0;
      background: #3f3854;
      padding: 14px 17px;
      strong {
        font-size: 20px;
      }
    }
  }
  .mask h3 {
    text-align: center;
  }
  .border-line {
    border-bottom: 1px solid #dcdee4;
  }
  .comp-name {
    font-size: 18px;
    font-family: CircularProBold;
    color: #414141;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 5px;
  }
}
.page {
  position: absolute;
  text-align: right;
  bottom: 88px;
  right: 48px;
}
</style>