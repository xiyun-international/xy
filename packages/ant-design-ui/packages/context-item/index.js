import XyContextItem from '../context/src/context-item.vue';

XyContextItem.install = function(Vue) {
  Vue.component(XyContextItem.name, XyContextItem);
};

export default XyContextItem;
