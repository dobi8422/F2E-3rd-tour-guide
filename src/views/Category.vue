<template>
  <div class="p-20 rounded-t-3xl" :class="`bg-${props.theme}-400`">
    <div class="flex flex-col xl:flex-row justify-center">
      <Filter :theme=props.theme />
      <ul class="grid grid-cols gap-4">
        <li v-for="item in list" :key="item.ID">
          <div class="bg-white flex flex-col xl:flex-row p-5 rounded-3xl">
            <img class="w-80 h-64 rounded-3xl" :src="item.Picture.PictureUrl1" :alt="item.Name" v-if="item.Picture.PictureUrl1">
            <div class="w-80 h-64 rounded-3xl text-center py-24 text-5xl" :class="`bg-${props.theme}-400`" v-else>未提供照片</div>
            <div class="p-5 grid grid-cols-1">
              <h5 class="truncate text-4xl font-bold pb-4">{{ item.Name }}</h5>
              <div class="flex">
                <p class="truncate">{{ item.Description }}</p>
                <button class="ml-0" @click="detail(item.ID)"><i class="fas fa-angle-double-right"></i></button>
              </div>
              <p class="truncate border-t-2 border-gray-400 pt-3 mt-3 text-lg"><i class="fas fa-map-marker-alt px-2"></i>{{ item.Address }}</p>
              <p class="truncate text-lg"><i class="fas fa-clock px-1.5"></i>{{ item.OpenTime }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Pagination />
    <Type />
  </div>
</template>

<script setup>
import Filter from '../components/Filter.vue'
import Pagination from '../components/Pagination.vue'
import Type from '../components/Type.vue'

import { computed, onMounted } from 'vue'
import router from '../router.js'
import { useStore } from 'vuex'

const store = useStore()

// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })

const list = computed(() => {
  return store.getters.searchState
    ? store.getters.searchList
    : store.getters[`${store.getters.nowPage}List`]
})

const detail = (ID) => { router.push(`/detail/${ID}`) }

console.log(router)
onMounted(() => {
  store.dispatch('changePage', router.currentRoute.value.path)
})
</script>
