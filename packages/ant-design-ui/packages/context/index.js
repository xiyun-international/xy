import XyContext from './index.vue';

XyContext.install = function (Vue) {
  Vue.component(XyContext.name, XyContext);
};

export default XyContext;
