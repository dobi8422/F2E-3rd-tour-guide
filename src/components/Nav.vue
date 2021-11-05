<template>
  <div class="flex justify-between items-center px-24 text-lg h-20">
    <router-link class="text-5xl text-center flex" :class="`text-${props.theme}-400`" to="/">
      <img src="http://cdn.onlinewebfonts.com/svg/img_319419.png" width="30">
      台灣旅遊網
    </router-link>
    <div class="flex font-bold">
      <button class="hover:bg-green-700 hover:text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-green-700 text-green-700" @click="enter('view')"><i class="fas fa-mountain"/> 景點</button>
      <button class="hover:bg-red-700 hover:text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-red-600 text-red-600" @click="enter('food')"><i class="fas fa-cocktail"/> 美食</button>
      <button class="hover:bg-blue-700 hover:text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-blue-600 text-blue-600" @click="enter('room')"><i class="fas fa-cocktail"/> 旅館</button>
      <button class="hover:bg-yellow-700 hover:text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-yellow-600 text-yellow-600" @click="enter('active')"><i class="fas fa-cocktail"/> 活動</button>
    </div>
    <div class="flex">
      <select class="rounded-full outline-none text-white pl-1 mr-5" :class="`bg-${props.theme}-400`">
        <option value="">選擇縣市</option>
        <option value="台北市">台北市</option>
        <option value="桃園市">桃園市</option>
        <option value="新竹市">新竹市</option>
        <option value="宜蘭縣">宜蘭縣</option>
      </select>
      <div class="bg-white rounded-full flex justify-between px-3 py-1 border-2" :class="`border-${props.theme}-400`">
        <button @click="cancelSearch"><i class="far fa-times-circle text-gray-400"/></button>
        <input class="text-center outline-none" type="text" placeholder="景點關鍵字搜尋" v-model="keyword" @keyup.enter="search">
        <button @click="search"><i class="fas fa-search text-gray-400"/></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })
const store = useStore()

const keyword = ref('')
const type = ref('桃園市')

const enter = category => {
  store.dispatch('changePage', category)
}

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
