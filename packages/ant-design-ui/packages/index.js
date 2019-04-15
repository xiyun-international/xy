import { version } from '../package.json';
import XyTitle from './title/index';
import XyWrapper from './wrapper/index';
import XyTimeline from './time-line/index';
import XyCountdownButton from './countdown-button/index';
import XySensText from './sens-text/index';
import XyVerification from './verification/index';

const components = [
  XyTitle,
  XyWrapper,
  XyTimeline,
  XyCountdownButton,
  XySensText,
  XyVerification,
];

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  version,
  install,
  XyTitle,
  XyWrapper,
  XyTimeline,
  XyCountdownButton,
  XySensText,
  XyVerification,
};

export default {
  version,
  install,
};