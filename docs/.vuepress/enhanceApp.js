import 'ant-design-vue/dist/antd.css';
import '../common.less';
import '../../packages/ant-design-ui/theme/styles/index.less';
import '../../packages/element-ui/theme/styles/index.less';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';

import Antd from 'ant-design-vue';
import Ele from 'element-ui';

import Vue from 'vue';
// 设置 http 请求方法
Vue.prototype.$post = axios.post;

import {
  XyTitle as AntdXyTitle,
  XyWrapper as AntdXyWrapper,
  XyTimeline as AntdXyTimeline,
  XyCountdownButton as AntdXyCountdownButton,
  XySensText as AntdXySensText,
  XyVerification as AntdXyVerification,
  XyContext as AntdXyContext,
  XyContextItem as AntdXyContextItem,
  XyFrame as AntdXyFrame,
  XySelectCity as AntdXySelectCity,
  XyFlowDetail as AntdXyFlowDetail,
  XyPicUpload as AntdXyPicUpload,
  XyCol as AntdXyCol,
  XyColItem as AntdXyColItem,
} from '../../packages/ant-design-ui/packages/index';
import {
  XyTitle as EleXyTitle,
  XyWrapper as EleXyWrapper,
  XyTimeline as EleXyTimeline,
  XyCountdownButton as EleXyCountdownButton,
  XySensText as EleXySensText,
  XyVerification as EleXyVerification,
  XySelectPanel as EleXySelectPanel,
  XyTableTree as EleXyTableTree,
  XyTransfer as EleXyTransfer,
  XyFrame as EleXyFrame,
  XySteps,
} from '../../packages/element-ui/packages/index';

export default ({ Vue }) => {
  Vue.use(Antd);
  Vue.use(Ele);

  Vue.component('AntdXyTitle', AntdXyTitle);
  Vue.component('AntdXyWrapper', AntdXyWrapper);
  Vue.component('AntdXyTimeline', AntdXyTimeline);
  Vue.component('AntdXyCountdownButton', AntdXyCountdownButton);
  Vue.component('AntdXySensText', AntdXySensText);
  Vue.component('AntdXyVerification', AntdXyVerification);
  Vue.component('AntdXyContext', AntdXyContext);
  Vue.component('AntdXyContextItem', AntdXyContextItem);
  Vue.component('AntdXyFrame', AntdXyFrame);
  Vue.component('AntdXySelectCity', AntdXySelectCity);
  Vue.component('AntdXyFlowDetail', AntdXyFlowDetail);
  Vue.component('AntdXyPicUpload', AntdXyPicUpload);
  Vue.component('AntdXyCol', AntdXyCol);
  Vue.component('AntdXyColItem', AntdXyColItem);

  Vue.component('EleXyTitle', EleXyTitle);
  Vue.component('EleXyWrapper', EleXyWrapper);
  Vue.component('EleXyTimeline', EleXyTimeline);
  Vue.component('EleXyCountdownButton', EleXyCountdownButton);
  Vue.component('EleXySensText', EleXySensText);
  Vue.component('EleXyVerification', EleXyVerification);
  Vue.component('EleXySelectPanel', EleXySelectPanel);
  Vue.component('EleXyFrame', EleXyFrame);
  Vue.component('EleXyTableTree', EleXyTableTree);
  Vue.component('EleXyTransfer', EleXyTransfer);
  Vue.use(XySteps);
};
