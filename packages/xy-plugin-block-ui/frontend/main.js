import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import _ from 'lodash';

import './plugins/ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

window._ = _;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
