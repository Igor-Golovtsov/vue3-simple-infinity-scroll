import { Plugin } from 'vue';
import component from "./vue3-simple-infinity-scroll.vue";
declare type InstallableComponent = typeof component & {
    install: Exclude<Plugin['install'], undefined>;
};
declare const _default: InstallableComponent;
export default _default;
