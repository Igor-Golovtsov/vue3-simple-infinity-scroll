<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  ref,
  toRefs
} from 'vue'

export default /* #__PURE__ */defineComponent({
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
  setup(props, { emit }) {
    const triggerElement = ref<HTMLDivElement>()
    const { isInitRequest, isLoading, canLoad } = toRefs(props)
    let observer: IntersectionObserver | null = null

    onMounted(() => {
      if (isInitRequest.value) {
        emit('on-load-more')
      }

      observer = new IntersectionObserver(([entry]) => {
        const isCanEmit = entry
          && entry.isIntersecting
          && !isInitRequest.value
          && !isLoading.value
          && canLoad.value

        if (isCanEmit) {
          emit('on-load-more')
        }
      }, {})

      if (triggerElement.value) {
        observer.observe(triggerElement.value)
      }
    })

    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect()
      }
    })

    return {
      triggerElement
    }
  }
})
</script>

<template>
  <div class="vue3-simple-infinity-scroll">
    <slot
      name="content"
    />
    <slot
      v-if="isLoading"
      name="loading"
    >
      <div class="vue3-simple-infinity-scroll__loading">Loading...</div>
    </slot>
    <slot
      v-if="!canLoad && !isLoading"
      name="no-more"
    >
      <div class="vue3-simple-infinity-scroll__no-more">No more</div>
    </slot>
    <div
      ref="triggerElement"
      class="vue3-simple-infinity-scroll__trigger-element" />
  </div>
</template>

<style scoped>
  .vue3-simple-infinity-scroll {
    width: 100%;
  }

  .vue3-simple-infinity-scroll__trigger-element {
    width: 100%;
    height: 1px;
  }

  .vue3-simple-infinity-scroll__loading {
    padding: 16px 0;
    text-align: center;
  }

  .vue3-simple-infinity-scroll__no-more {
    padding: 16px 0;
    text-align: center;
  }
</style>
