<template>
  <a-layout>
    <a-layout-sider theme="light">
      <a-menu
        :defaultSelectedKeys="menuDefaultSelectedKeys"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item 
          v-for="(route, routeIndex) in childrenRoutes"
          :key="routeIndex"
          @click="$router.push(route.name)"
        >
        {{ route.meta.title }}</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script>
import childrenRoutes from '@/router/routes/departments/children'

export default {
  data() {
    return {
      childrenRoutes: [],    
    }
  },

  created() {
    this.childrenRoutes = _.reject(childrenRoutes, ['name', 'departments'])
  },

  computed: {
    menuDefaultSelectedKeys() {
      const routeIndex = childrenRoutes.findIndex((childrenRoute) => {
        return childrenRoute.name === this.$route.name
      })
      return [routeIndex]
    },
  },

  methods: {
    
  },
}
</script>

<style scoped>

</style>