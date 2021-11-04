<template>
  <div>
    <div class="border-2 border-red-500 m-10">
      <h2 class="text-center text-3xl">{{ store.getters.searchState ? '搜尋結果' : '所有景點'}}</h2>
      <ul>
        <li v-for="item in list" :key="item.ID">
          <div class="border-2 border-blue-500 flex mb-5">
            <img class="w-80" :src="item.Picture.PictureUrl1" :alt="item.Name">
            <div>
              <h5>{{ item.Name }}</h5>
              <p class="truncate w-40">{{ item.Description }}</p>
              <p>{{ item.Address }}</p>
              <p>{{ item.Phone }}</p>
              <p>{{ item.OpenTime }}</p>
              <p>{{ item.WebsiteUrl }}</p>
              <!-- <p>{{ item.Position }}</p> -->
              <p>{{ item.Class }}</p>
              <button @click="detail(item.ID)">詳細資訊</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Type />
    <Gotop />
  </div>
</template>

<script setup>
import Type from '../components/Type.vue'
import Gotop from '../components/GoTop.vue'

import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

store.commit('CHANGELIST', 'active')

const list = computed(() => {
  return store.getters.searchState
    ? store.getters.searchList
    : store.getters[`${store.getters.nowPage}List`]
})

const detail = (ID) => {
  store.dispatch('LookDetail', ID)
}

onMounted(() => {
  if (!store.activeList) {
    store.dispatch('GetData', 'active')
  }
})

</script>
