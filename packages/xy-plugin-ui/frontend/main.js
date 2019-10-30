import Vue from 'vue';
import App from './App.vue';
import router from './router/index';

import './plugins/ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import './plugins/http';
import './plugins/global-varies';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
