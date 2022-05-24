'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = /* #__PURE__ */vue.defineComponent({
  name: 'Vue3SimpleInfinityScroll',
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
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var triggerElement = vue.ref();

    var _toRefs = vue.toRefs(props),
        isInitRequest = _toRefs.isInitRequest,
        isLoading = _toRefs.isLoading,
        canLoad = _toRefs.canLoad;

    var observer = null;
    vue.onMounted(function () {
      if (isInitRequest.value) {
        emit('on-load-more');
      }

      observer = new IntersectionObserver(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            entry = _ref3[0];

        var isCanEmit = entry && entry.isIntersecting && !isInitRequest.value && !isLoading.value && canLoad.value;

        if (isCanEmit) {
          emit('on-load-more');
        }
      }, {});

      if (triggerElement.value) {
        observer.observe(triggerElement.value);
      }
    });
    vue.onBeforeUnmount(function () {
      if (observer) {
        observer.disconnect();
      }
    });
    return {
      triggerElement: triggerElement
    };
  }
});var _withScopeId = function _withScopeId(n) {
  return vue.pushScopeId("data-v-6f28c7e1"), n = n(), vue.popScopeId(), n;
};

var _hoisted_1 = {
  class: "vue3-simple-infinity-scroll"
};

var _hoisted_2 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/vue.createElementVNode("div", {
    class: "vue3-simple-infinity-scroll__loading"
  }, "Loading...", -1);
});

var _hoisted_3 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/vue.createElementVNode("div", {
    class: "vue3-simple-infinity-scroll__no-more"
  }, "No more", -1);
});

var _hoisted_4 = {
  ref: "triggerElement",
  class: "vue3-simple-infinity-scroll__trigger-element"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [vue.renderSlot(_ctx.$slots, "content"), _ctx.isLoading ? vue.renderSlot(_ctx.$slots, "loading", {
    key: 0
  }, function () {
    return [_hoisted_2];
  }) : vue.createCommentVNode("", true), !_ctx.canLoad && !_ctx.isLoading ? vue.renderSlot(_ctx.$slots, "no-more", {
    key: 1
  }, function () {
    return [_hoisted_3];
  }) : vue.createCommentVNode("", true), vue.createElementVNode("div", _hoisted_4, null, 512)]);
}function styleInject(css, ref) {
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
}var css_248z = "\n.vue3-simple-infinity-scroll[data-v-6f28c7e1] {\n    width: 100%;\n}\n.vue3-simple-infinity-scroll__trigger-element[data-v-6f28c7e1] {\n    width: 100%;\n    height: 3px;\n    background: red;\n}\n.vue3-simple-infinity-scroll__loading[data-v-6f28c7e1] {\n    padding: 16px 0;\n    text-align: center;\n}\n.vue3-simple-infinity-scroll__no-more[data-v-6f28c7e1] {\n    padding: 16px 0;\n    text-align: center;\n}\n";
styleInject(css_248z);script.render = render;
script.__scopeId = "data-v-6f28c7e1";// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /* #__PURE__ */(function () {
  // Assign InstallableComponent type
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('Vue3InfinityScroll', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo'
// export const RollupDemoDirective = directive
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;