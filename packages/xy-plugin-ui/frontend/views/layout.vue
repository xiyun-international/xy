<template>
  <a-layout class="xy-layout">
    <a-layout-header class="layout-header">
      <div class="header-logo">业务组件平台</div>
      <div class="header-right">
        <a-menu
          theme="dark"
          mode="horizontal"
          :defaultSelectedKeys="menuDefaultSelectedKeys"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item 
            v-for="(route, routeIndex) in childrenRoutes"
            :key="routeIndex"
            @click="navigate(route)"
          >
          {{ route.meta.title }}</a-menu-item>
        </a-menu>
      </div>
    </a-layout-header>
    
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      Xy 物料平台
    </a-layout-footer>
  </a-layout>
</template>

<script>
import childrenRoutes from '@/router/children'

export default {
  data() {
    return {
      childrenRoutes,
    }
  },

  async created() {
    // console.log(this.childrenRoutes,'this.childrenRoutes')
  },

  computed: {
    menuDefaultSelectedKeys() {
      const routeIndex = this.childrenRoutes.findIndex((childrenRoute) => {
        return childrenRoute.name === this.$route.name
      })
      return [routeIndex]
    },
  },

  methods: {
    navigate(route) {
      let routeName = ''
      if (route.children) {
        routeName = route.children[0].name
      } else {
        routeName = route.name
      }
      this.$router.push(routeName)
    }
  },
}
</script>


<style lang="less" scoped>
.xy-layout {
  .layout-header {
    display: flex;
    justify-content: space-between;
    .header-logo {
      width: 120px;
      height: 30px;
      margin: 15px 0;
      line-height: 30px;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
    .header-right {
      display: flex;
      .header-search {
        width: 200px;
        border-radius: 5px;
        margin: 15px 30px
      }
    }
  }
}
</style>

