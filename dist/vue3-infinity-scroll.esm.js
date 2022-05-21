import { defineComponent, ref, toRefs, onMounted, onBeforeUnmount, openBlock, createElementBlock, renderSlot, createCommentVNode, createElementVNode, pushScopeId, popScopeId } from 'vue';

var script = /*#__PURE__*/defineComponent({
  name: 'Vue3InfinityScroll',
  props: {
    isInitRequest: {
      type: Boolean,
      required: true
    },
    canLoad: {
      type: Boolean,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  events: ['on-load-more'],

  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const triggerElement = ref();
    const {
      isInitRequest,
      isLoading,
      canLoad
    } = toRefs(props);
    let observer = null;
    onMounted(() => {
      if (isInitRequest.value) {
        emit('on-load-more');
      }

      observer = new IntersectionObserver(_ref2 => {
        let [entry] = _ref2;
        const isCanEmit = entry && entry.isIntersecting && !isInitRequest.value && !isLoading.value && canLoad.value;

        if (isCanEmit) {
          emit('on-load-more');
        }
      }, {});

      if (triggerElement.value) {
        observer.observe(triggerElement.value);
      }
    });
    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect();
      }
    });
    return {
      triggerElement
    };
  }

});

const _withScopeId = n => (pushScopeId("data-v-bd950410"), n = n(), popScopeId(), n);

const _hoisted_1 = {
  class: "vue3-infinity-scroll"
};

const _hoisted_2 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/createElementVNode("div", {
  class: "vue3-infinity-scroll__loading"
}, "Loading...", -1));

const _hoisted_3 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/createElementVNode("div", {
  class: "vue3-infinity-scroll__no-more"
}, "No more", -1));

const _hoisted_4 = {
  ref: "triggerElement",
  class: "vue3-infinity-scroll__trigger-element"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [renderSlot(_ctx.$slots, "content"), _ctx.isLoading ? renderSlot(_ctx.$slots, "loading", {
    key: 0
  }, () => [_hoisted_2]) : createCommentVNode("", true), !_ctx.canLoad && !_ctx.isLoading ? renderSlot(_ctx.$slots, "no-more", {
    key: 1
  }, () => [_hoisted_3]) : createCommentVNode("", true), createElementVNode("div", _hoisted_4, null, 512)]);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.vue3-infinity-scroll[data-v-bd950410] {\n    display: block;\n    width: 100%;\n    max-width: 600px;\n    margin: 25px auto;\n    padding: 25px;\n    font-family: \"Open Sans\", Arial, sans-serif;\n}\n.vue3-infinity-scroll__trigger-element[data-v-bd950410] {\n    width: 100%;\n    height: 1px;\n}\n.vue3-infinity-scroll__loading[data-v-bd950410] {\n    padding: 16px 0;\n    text-align: center;\n}\n.vue3-infinity-scroll__no-more[data-v-bd950410] {\n    padding: 16px 0;\n    text-align: center;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-bd950410";

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Assign InstallableComponent type
  const installable = script; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.component('Vue3InfinityScroll', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
