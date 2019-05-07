import XyWrapper from './index.vue';

XyWrapper.install = function (Vue) {
  Vue.component(XyWrapper.name, XyWrapper);
};

export default XyWrapper;
