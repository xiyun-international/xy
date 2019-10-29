import Vue from 'vue';
import Router from 'vue-router';
import layout from '@/views/layout.vue';
import children from './children';

// 解决vue-router3.1+重复路由报错的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children,
    },
  ],
});
