import Vue from "vue";
import TimingDiagram from "./timing-diagram.vue";

const Components = {
  TimingDiagram
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components