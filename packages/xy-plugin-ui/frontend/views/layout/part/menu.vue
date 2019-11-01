<template>
  <div>
    <a-menu
      @click="handleClick"
      
      v-model="selectedKeys"
      :openKeys.sync="openKeys"
      theme="dark"
      mode="inline"
    >
      <template v-for="item in menu">
        <a-menu-item  :key="item.url">
          <router-link :to="item.url">
              <a-icon :type="item.icon" />
              <span>{{ item.name }}</span>
          </router-link>
        </a-menu-item >
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'MenuNav',
  data() {
    return {
      selectedKeys: [],
      rootSubmenuKeys: [],
      openKeys: [],
      menu: [
        {
          name: '业务组件',
          icon: 'appstore',
          url: './block',
        },
        // {
        //   name: '依赖',
        //   icon: 'profile',
        //   url: './guide',
        // },
      ],
      collapsed: false,
      selectedKeys: ['./block'],
    };
  },
  created() {
    this.$router.push('./block');
  },
  methods: {
    handleClick(e) {
      console.log('click', e);
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .ant-menu {
  text-align: left;
  padding: 0 15%;
}
/deep/ .ant-layout-sider .ant-menu.ant-menu-dark .ant-menu-sub .ant-menu-item {
  padding-left: 53px !important;
}
.icon-img {
  filter: invert(100%);
}

/deep/ .ant-menu-submenu .ant-menu-submenu-title {
  overflow: visible;
}
/deep/ .ant-menu-dark, .ant-menu-dark .ant-menu-sub {
  background: #3f3854;
}
/deep/ .ant-menu.ant-menu-dark .ant-menu-item-selected, 
.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
  background: #3f3854;
}
/deep/ .ant-menu-dark .ant-menu-item-selected > a, 
.ant-menu-dark .ant-menu-item-selected > a:hover {
  color: #1890ff;
}
</style>
