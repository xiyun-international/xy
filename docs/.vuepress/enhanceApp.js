import 'ant-design-vue/dist/antd.css';
import '../../packages/ant-design-ui/theme/styles/index.less';
import '../../packages/element-ui/theme/styles/index.scss';
import '../common.less'

import Antd from 'ant-design-vue'
import XyUI from '../../packages/ant-design-ui/packages/index.js';

export default ({Vue}) => {
  Vue.use(Antd);
  Vue.use(XyUI);
}
