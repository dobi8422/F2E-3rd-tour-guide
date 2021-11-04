<template>
  <div class="bg-gray-300">
    <div class="flex justify-center items-center p-2 text-lg h-80">
      <div class="text-7xl text-center flex">
      <img src="http://cdn.onlinewebfonts.com/svg/img_319419.png" width="85">
        台灣<br>旅遊網
      </div>
      <div class="ml-10">
        <div class="flex font-bold">
          <router-link class="hover:bg-green-700 hover:text-white border-2 rounded-full px-3 py-1 border-green-700 text-green-700" to="view"><i class="fas fa-mountain"></i> 景點</router-link>
          <router-link class="hover:bg-red-700 hover:text-white border-2 rounded-full px-3 py-1 ml-4 border-red-600 text-red-600" to="food"><i class="fas fa-cocktail"></i> 美食</router-link>
          <router-link class="hover:bg-blue-700 hover:text-white border-2 rounded-full px-3 py-1 ml-4 border-blue-600 text-blue-600" to="room"><i class="fas fa-home"></i> 住宿</router-link>
          <router-link class="hover:bg-yellow-700 hover:text-white border-2 rounded-full px-3 py-1 ml-4 border-yellow-600 text-yellow-600" to="active"><i class="fas fa-gift"></i> 活動</router-link>
        </div>
        <div class="bg-white rounded-full flex justify-between px-3 py-1 mt-4">
          <button @click="cancelSearch"><i class="far fa-times-circle"></i></button>
          <input class="text-center" type="text" placeholder="景點關鍵字搜尋" v-model="keyword" @keyup.enter="search">
          <button @click="search"><i class="fas fa-search"></i></button>
        </div>
      </div>
    </div>
    <div class="absolute right-0 top-72">
      <a class="mx-4" href="https://2021.thef2e.com/" target="_blank">F2E-3rd</a>
      <a class="mx-4" href="https://ptx.transportdata.tw/PTX/" target="_blank">TDX API</a>
      <a class="mx-4" href="https://github.com/dobi8422/F2E-3rd-tour-guide" target="_blank"><i class="fab fa-github"></i>&nbsp;dosss</a>
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
