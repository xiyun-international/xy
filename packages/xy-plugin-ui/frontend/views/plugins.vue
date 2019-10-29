<template>
  <div class="home">
    <a-row class="p16 t-MT10">
      <a-col :span="23">
        <a-input placeholder="组件名称" class="search" v-model="compName">
          <a-icon slot="prefix" type="appstore" />
        </a-input>
      </a-col>
      <a-col :span="1" class="lh32">
        <a-icon type="search" class="lh32" @click="search" />
      </a-col>
      <a-col></a-col>
    </a-row>
    <a-tabs :defaultActiveKey="0">
      <template slot="tabBarExtraContent">
        <a-radio-group class="t-MB16">
          <a-radio-button value="small">AntD</a-radio-button>
          <a-radio-button value="default">Ele</a-radio-button>
        </a-radio-group>
        <a-radio-group class="t-MB16 t-ML16">
          <a-radio-button value="small">通用</a-radio-button>
          <a-radio-button value="default">布局</a-radio-button>
        </a-radio-group>
      </template>
      <a-tab-pane :key="index" v-for="(tab,index) in tabList">
        <span slot="tab">
          <a-icon :type="tab.icon" />
          {{ tab.name }}
        </span>
        <a-row>
          <a-col :span="8" v-for="(item,index) in data" :key="index">
            <div class="list-item">
              <img :src="item.picUrl" />
              <a href="#">
                <div class="mask">
                  <a-row class="info">
                    <a-col :span="5">
                      <strong>{{ item.title }}</strong>
                    </a-col>
                    <a-col :span="6"></a-col>
                    <a-col :span="13">
                      <a-button type="link" icon="download">下载</a-button>
                      <a-button type="link" icon="ellipsis">更多信息</a-button>
                    </a-col>
                  </a-row>
                </div>
              </a>
            </div>
             <!-- <div>{{ item.name }}</div> -->
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
    <a-pagination
      class="page"
      :pageSizeOptions="pageSizeOptions"
      :total="total"
      showSizeChanger
      :pageSize="pageSize"
      v-model="current"
      @showSizeChange="onShowSizeChange"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span v-if="props.value!=='50'">{{props.value}}条/页</span>
        <span v-if="props.value==='50'">全部</span>
      </template>
    </a-pagination>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'plugins',
  components: {
    HelloWorld,
  },
  data() {
    return {
      compName: '',
      tabList: [
        {
          name: '区块',
          icon: 'desktop',
        },
        {
          name: '小程序',
          icon: 'wechat',
        },
      ],
      data: [
        {
          picUrl:
            'https://screenshots.imgix.net/primefaces/primereact/tooltip/3.1.8/5d42e64160fbc6001439e70d/0cef694d-4e56-4141-924f-b34954036079.png?w=300&h=200&fit=fillmax&fm=webp',
          title: 'xy-list',
          name: '列表区块',
          btn: {
            test: true,
            set: true,
          },
        },
        {
          picUrl:
            'https://screenshots.imgix.net/primefaces/primereact/tooltip/3.1.8/5d42e64160fbc6001439e70d/0cef694d-4e56-4141-924f-b34954036079.png?w=300&h=200&fit=fillmax&fm=webp',
          title: 'xy-detail',
          name: '工作流详情',
          btn: {
            test: true,
            set: true,
          },
        },
        {
          picUrl:
            'https://screenshots.imgix.net/primefaces/primereact/tooltip/3.1.8/5d42e64160fbc6001439e70d/0cef694d-4e56-4141-924f-b34954036079.png?w=300&h=200&fit=fillmax&fm=webp',
          title: 'xy-detail',
          name: '工作流详情',
          btn: {
            test: true,
            set: true,
          },
        },
        {
          picUrl:
            'https://screenshots.imgix.net/primefaces/primereact/tooltip/3.1.8/5d42e64160fbc6001439e70d/0cef694d-4e56-4141-924f-b34954036079.png?w=300&h=200&fit=fillmax&fm=webp',
          title: 'xy-detail',
          name: '工作流详情',
          btn: {
            test: true,
            set: true,
          },
        },
      ],
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      current: 1,
      pageSize: 10,
      total: 50,
    };
  },
  methods: {
    search() {},
    onShowSizeChange() {},
  },
};
</script>
<style lang="less" scoped>
/deep/ .ant-input {
  border-radius: 30px;
  background: #d5dae647;
  border: 0px;
}
/deep/ .ant-input-affix-wrapper .ant-input-prefix,
.ant-input-affix-wrapper .ant-input-suffix {
  color: #c2c2c2;
}
/deep/ .ant-tabs  {
  .ant-col-8 {
    padding-right: 16px;
    margin-bottom: 16px;
    &:nth-child( 3n ) {
      padding-right: 0px;
    }
  }
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
.list-item {
  position: relative;
  border: 1px solid #dcdee4;
  border-radius: 6px;
  transition: all 0.25s ease-out;
  text-align: center;
  overflow: hidden;
  & a:hover .mask {
    opacity: 1;
  }
  img {
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
  bottom: 68px;
  right: 48px;
}
</style>
