import XySteps from './steps.vue';
import XyStep from './step.vue';

XySteps.install = function(Vue) {
  Vue.component(XySteps.name, XySteps);
  Vue.component(XyStep.name, XyStep);
};

export default XySteps;
