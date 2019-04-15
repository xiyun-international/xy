import 'element-ui/lib/theme-chalk/index.css';
import '../../theme/styles/index.scss';

import ElementUI from 'element-ui';
import XyUI from '../../packages/index.js';

export default ({Vue}) => {
  Vue.use(ElementUI);
  Vue.use(XyUI);
}
