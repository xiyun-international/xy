import Vue from 'vue';
import App from './App.vue';
import './plugins/ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.component('async-component', () => import(process.env.ENTRY_FILE));

new Vue({
  render: h => h(App),
}).$mount('#app');
