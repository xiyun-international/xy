// import 'ant-design-vue/dist/antd.css';
// import '../../packages/ant-design-ui/theme/styles/index.less';
// import '../../packages/element-ui/theme/styles/index.scss';

// import Antd from 'ant-design-vue'
// import XyUI from '../../packages/ant-design-ui/packages/index.js';


import 'element-ui/lib/theme-chalk/index.css';
import '@xiyun/xy-element-ui/lib/index.css';

import ElementUI from 'element-ui';
import XyElementUI from '@xiyun/xy-element-ui';


export default ({Vue}) => {
  // Vue.use(Antd);
  Vue.use(ElementUI);
  Vue.use(XyElementUI);
}
