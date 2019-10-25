<template>
  <div class="outside">
    <a-layout class="b-R5 layout">
      <a-layout-sider
        :trigger="null"
        class="bgColor"
        collapsible
        v-model="collapsed"
        >
        <img src="./logo.png" class="logo" />
        <xy-menu />
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import XyMenu from './part/menu.vue';
import XyFooter from './part/footer.vue';

export default {
  name: 'layout',
  components: {
    XyFooter,
    XyMenu,
  },
  data() {
    return {
      mode: process.env.VUE_APP_MODE,
      collapsed: false,
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@media (max-width: 767px) {
  .menu-show {
    display: inline-block;
  }
  .menu-hide {
    display: none;
  }
}
.ant-layout {
  background: #fff;
  .ant-layout-sider {
    background: #fff;
  }
}

.outside {
  background: #d5dae6;
  padding: 40px;
  .layout {
    height: calc(~'100vh' - 80px);
    border-radius: 5px;
    overflow: hidden;
    .logo {
      width: 60px;
      margin: 26px;
    }
    .bgColor {
      background: #3f3854;
    }
  }
}
.b-R5 {
  border-radius: 5px;
}
</style>
