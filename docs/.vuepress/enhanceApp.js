import 'ant-design-vue/dist/antd.css';
import '../../packages/ant-design-ui/theme/styles/index.less';
import '../../packages/element-ui/theme/styles/index.scss';
import '../common.less'

import Antd from 'ant-design-vue'

import {
  XyTitle as AntdXyTitle,
  XyWrapper as AntdXyWrapper,
  XyTimeline as AntdXyTimeline,
  XyCountdownButton as AntdXyCountdownButton,
  XySensText as AntdXySensText,
  XyVerification as AntdXyVerification,
  XyContext as AntdXyContext,
  XyFrame as AntdXyFrame,
} from '../../packages/ant-design-ui/packages/index';

export default ({Vue}) => {
  Vue.use(Antd);

  Vue.component('AntdXyTitle', AntdXyTitle);
  Vue.component('AntdXyWrapper', AntdXyWrapper);
  Vue.component('AntdXyTimeline', AntdXyTimeline);
  Vue.component('AntdXyCountdownButton', AntdXyCountdownButton);
  Vue.component('AntdXySensText', AntdXySensText);
  Vue.component('AntdXyVerification', AntdXyVerification);
  Vue.component('AntdXyContext', AntdXyContext);
  Vue.component('AntdXyFrame', AntdXyFrame);
}
