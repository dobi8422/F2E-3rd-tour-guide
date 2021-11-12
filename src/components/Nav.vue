<template>
  <div class="bg-white flex flex-col md:flex-row justify-around lg:justify-between items-center px-10 text-lg h-64 md:h-32 lg:h-20">
    <router-link class="text-5xl text-center font-bold flex" :class="`text-${props.theme}-400`" to="/">
      <!-- <img class="w-10" src="http://cdn.onlinewebfonts.com/svg/img_319419.png"> -->
      台灣<br class="lg:hidden">旅遊網
    </router-link>
    <div class="flex flex-col lg:flex-grow lg:flex-row lg:justify-around">
      <div class="hidden lg:inline"></div>
      <div class="flex font-bold">
        <button class="whitespace-nowrap hover:bg-green-700 hover:text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-green-700 text-green-700" @click="enter('view')"><i class="fas fa-mountain"/> 景點</button>
        <button class="whitespace-nowrap hover:bg-red-600 hover:text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-red-600 text-red-600" @click="enter('food')"><i class="fas fa-cocktail"/> 美食</button>
        <button class="whitespace-nowrap hover:bg-blue-600 hover:text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-blue-600 text-blue-600" @click="enter('room')"><i class="fas fa-home"/> 旅館</button>
        <button class="whitespace-nowrap hover:bg-yellow-600 hover:text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-yellow-600 text-yellow-600" @click="enter('active')"><i class="fas fa-gift"/> 活動</button>
      </div>
      <div
        class="rounded-full flex justify-between px-3 py-1 mt-4 lg:mt-0 border-2"
        :class="searchPage
          ? `border-${props.theme}-800 bg-${props.theme}-800 text-white`
          : `border-${props.theme}-400 text-gray-400 hover:bg-${props.theme}-100`"
      >
        <button :class="searchPage ? 'text-red-500' : ''" @click="cancelSearch"><i class="far fa-times-circle"/></button>
        <input
          class="text-center outline-none bg-transparent w-auto lg:w-28 xl:w-auto"
          :class="searchPage ? 'placeholder-white': ''"
          type="text"
          :placeholder="searchPage ? keyword : '關鍵字搜尋'"
          v-model="keyword"
          @keyup.enter="search"
          :disabled="searchPage ? searchPage : false"
        >
        <div>
          <select
            class="cursor-pointer text-center rounded-full outline-none text-white mr-2 px-1"
            :class="`bg-${props.theme}-400`"
            v-model="county"
            :disabled="searchPage ? searchPage : false"
          >
            <option value="">選擇縣市</option>
            <option :value="item" v-for="item in countyList" :key="item">{{ item }}</option>
          </select>
          <button @click="search"><i class="fas fa-search" :class="searchPage ? `text-white`: `text-gray-400`"/></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import district from '../db/county.json'

// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })
const store = useStore()

const county = ref('')
const keyword = ref('')

const searchPage = computed(() => store.getters.searchPage)

const countyList = district.map(item => item.county)

const enter = category => {
  store.dispatch('changePage', category)
}

const search = () => {
  store.commit('SEARCHPAGE', store.getters.nowPage)
  store.commit('SEARCHCOUNTY', county.value)
  store.dispatch('SearchList', {
    county: county.value,
    keyword: keyword.value
  })
}

const cancelSearch = () => {
  store.commit('SEARCHPAGE', '')
  store.commit('SEARCHCOUNTY', '')
  county.value = ''
  keyword.value = ''
}

</script>
