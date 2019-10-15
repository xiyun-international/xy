import App from './App.vue';

Vue.component('async-component', () => import(process.env.ENTRY_FILE));

new Vue({
  render: h => h(App),
}).$mount('#app');
