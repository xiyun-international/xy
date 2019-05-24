import { version } from '../package.json';
import XyTitle from './title';
import XyWrapper from './wrapper';
import XyTimeline from './time-line';
import XyCountdownButton from './countdown-button';
import XySensText from './sens-text';
import XyVerification from './verification';
import XyTableTree from './table-tree';
import XyTransfer from './transfer';
import XyFrame from './frame';
import XySelectPanel from './select-panel';

const components = [
  XyTitle,
  XyWrapper,
  XyTimeline,
  XyCountdownButton,
  XySensText,
  XyVerification,
  XyTableTree,
  XyTransfer,
  XyFrame,
  XySelectPanel,
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
  XyTableTree,
  XyTransfer,
  XyFrame,
  XySelectPanel,
};

export default {
  version,
  install,
};
