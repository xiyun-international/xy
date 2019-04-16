import 'ant-design-vue/dist/antd.css';
import '../../theme/styles/index.less';

import Antd from 'ant-design-vue'
import XyUI from '../../packages/index.js';

export default ({Vue}) => {
  Vue.use(Antd);
  Vue.use(XyUI);
}
