/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-xy-clickoutside="handleClose">
 * ```
 */
const nodeList = [];
const ctx = 'xyClickoutsideContext';
let seed = 0;

const on = (function() {
    if (document.addEventListener) {
      return function(element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false);
        }
      };
    }
  })();

on(document, 'click', e => {
  nodeList.forEach(node => node[ctx].__xyClickOutside__(e));
});

function createDocumentHandler(el, binding, vnode) {
  return function(e = {}) {
      if(!vnode ||
        !vnode.context ||
        !e.target ||
        el.contains(e.target)||
        el === e.target
      ) {
          return;
      }
      // 判断指令是否绑定了函数，绑定则调用
      if(binding.expression){
          binding.value&&binding.value(e)
      }
  }
}  

const xyClickoutside = {
    bind: function(el,binding,vnode) {
        nodeList.push(el);
        el[ctx] = {
            id:seed,
            __xyClickOutside__ : createDocumentHandler(el, binding, vnode)
        }
    },
    update(el, binding, vnode) {
        el[ctx].__xyClickOutside__ = createDocumentHandler(el, binding, vnode)
    },
    unbind:function(el){
        const len = nodeList.length;

        for (let i = 0; i < len; i++) {
            if (nodeList[i][ctx].id === el[ctx].id) {
                nodeList.splice(i, 1);
                break;
            }
        }
        delete el[ctx].__xyClickOutside__;
    }
};
export default xyClickoutside;