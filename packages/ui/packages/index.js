import XyTitle from './title/index';
import XyTitleIcon from './title-icon/index';
import XyWrapper from './wrapper/index';
import XyTimeLine from './time-line/index';
import XyCountdownButton from './countdown-button/index';
import XySensText from './sens-text/index';
import XyVerification from './verification/index';

const components = [
  XyTitle,
  XyTitleIcon,
  XyWrapper,
  XyTimeLine,
  XyCountdownButton,
  XySensText,
  XyVerification,
];

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  // Vue.prototype.$XYUI = {
  //   size: opts.size || '',
  // };
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const API = {
  version: '1.0.0',
  install,
  XyTitle,
  XyTitleIcon,
  XyWrapper,
  XyTimeLine,
  XyCountdownButton,
  XySensText,
  XyVerification,
};

export default API;
