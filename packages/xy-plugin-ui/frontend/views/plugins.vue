<template>
  <div class="home">
    <a-row class="p16">
      <a-col :span="11">
        <a-input placeholder="组件名称" class="search" v-model="compName">
          <a-icon slot="prefix" type="appstore" />
        </a-input>
      </a-col>
      <a-col :span="1">
        <a-icon type="search" class="lh32" @click="search" />
      </a-col>
      <a-col>
      </a-col>
    </a-row>
    <a-tabs :defaultActiveKey="0">
      <a-tab-pane :key="index" v-for="(tab,index) in tabList">
        <span slot="tab">
          <a-icon :type="tab.icon" />
          {{ tab.name }}
        </span>
        Tab 1
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'plugins',
  components: {
    HelloWorld
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
    }
  },
  methods: {
    search() {

    },
  },
}
</script>
<style lang="less" scoped>
  /deep/ .ant-input {
    border-radius: 30px;
    background: #d5dae647;
    border: 0px;
  }
  /deep/ .ant-input-affix-wrapper .ant-input-prefix, .ant-input-affix-wrapper .ant-input-suffix {
    color: #c2c2c2;
  }
  .p16 {
    padding: 16px;
  }
  .lh32 {
    line-height: 32px;
  }
  /deep/ .ant-tabs-nav-scroll {
    text-align: left;
  }
</style>
