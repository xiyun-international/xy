import XyContext from './src/context.vue';

XyContext.install = function(Vue) {
  Vue.component(XyContext.name, XyContext);
};

export default XyContext;
