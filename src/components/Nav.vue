<template>
  <div class="flex justify-between items-center px-24 text-lg h-20">
    <div class="text-5xl text-center flex">
      <img src="http://cdn.onlinewebfonts.com/svg/img_319419.png" width="30">
      台灣旅遊網
    </div>
    <div class="flex font-bold">
      <router-link class="hover:bg-green-700 hover:text-white border-2 rounded-full px-3 py-1 ml-4 border-green-700 text-green-700" to="view"><i class="fas fa-mountain"></i> 景點</router-link>
      <router-link class="hover:bg-red-700 hover:text-white border-2 rounded-full px-3 py-1 ml-4 border-red-600 text-red-600" to="food"><i class="fas fa-cocktail"></i> 美食</router-link>
      <router-link class="hover:bg-blue-700 hover:text-white border-2 rounded-full px-3 py-1 ml-4 border-blue-600 text-blue-600" to="room"><i class="fas fa-home"></i> 住宿</router-link>
      <router-link class="hover:bg-yellow-700 hover:text-white border-2 rounded-full px-3 py-1 ml-4 border-yellow-600 text-yellow-600" to="active"><i class="fas fa-gift"></i> 活動</router-link>
    </div>
    <div class="bg-white rounded-full flex justify-between px-3 py-1">
      <button @click="cancelSearch"><i class="far fa-times-circle text-gray-400"></i></button>
      <input class="text-center outline-none" type="text" placeholder="景點關鍵字搜尋" v-model="keyword" @keyup.enter="search">
      <button @click="search"><i class="fas fa-search text-gray-400"></i></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const keyword = ref('')
const type = ref('桃園市')

const search = () => {
  if (keyword.value) {
    store.commit('SEARCHSTATE', true)
    store.dispatch('SearchList', {
      type: type.value,
      keyword: keyword.value
    })
  }
}

const cancelSearch = () => {
  store.commit('SEARCHSTATE', false)
  keyword.value = ''
}
</script>
