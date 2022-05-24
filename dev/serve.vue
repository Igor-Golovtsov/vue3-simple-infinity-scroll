<script lang="ts">
import {
  computed,
  defineComponent,
  ref
} from 'vue'
import Vue3SimpleInfinityScroll from '@/vue3-simple-infinity-scroll.vue'

interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default defineComponent({
  name: 'ServeDev',
  components: {
    Vue3SimpleInfinityScroll
  },
  setup() {
    const limit = ref(10)
    const page = ref(1)
    const totalPosts = ref(0)
    const posts = ref<IPost[]>([])
    const isLoading = ref(false)

    const totalPages = computed(() => Math.ceil(totalPosts.value / limit.value))

    const fetchPosts = () => {
      isLoading.value = true

      fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit.value}&_page=${page.value}`)
        .then((response) => {
          totalPosts.value = parseInt(response.headers.get('x-total-count') ?? '0')
          return response.json()
        })
        .then((data) => {
          posts.value = [...posts.value, ...data]
          page.value += 1
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          isLoading.value = false
        })
    }

    return {
      posts,
      page,
      isLoading,
      fetchPosts,
      totalPages
    }
  }
})
</script>

<template>
  <div id="app">
    <vue3-simple-infinity-scroll
      :isLoading="isLoading"
      :canLoad="page <= totalPages"
      :is-init-request="page === 1"
      @on-load-more="fetchPosts"
    >
      <template #content>
        <div
          v-for="post in posts"
          :key="post.id"
          class="post"
        >
          <div class="post__title">
            #{{ post.id }}. {{ post.title }}
          </div>
          <div class="post__body">
            {{ post.body }}
          </div>
        </div>
      </template>
    </vue3-simple-infinity-scroll>
  </div>
</template>

<style scoped>
  .post {
    padding: 4px 8px;
    border-radius: 4px;
    background: #fff;
    border: 1px solid #9cb3b5;
  }

  .post:not(:last-child) {
    margin-bottom: 8px;
  }

  .post__title {
    font-size: 18px;
    line-height: 24px;
  }
</style>
