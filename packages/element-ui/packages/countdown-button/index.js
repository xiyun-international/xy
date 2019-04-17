import CountdownButton from './index.vue';

CountdownButton.install = function (Vue) {
  Vue.component(CountdownButton.name, CountdownButton);
};

export default CountdownButton;
