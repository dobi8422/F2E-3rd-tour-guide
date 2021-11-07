<template>
  <div class="flex flex-col md:flex-row justify-around xl:justify-between items-center px-24 text-lg h-64 md:h-32 xl:h-20">
    <router-link class="text-5xl text-center flex" :class="`text-${props.theme}-400`" to="/">
      <!-- <img class="w-10" src="http://cdn.onlinewebfonts.com/svg/img_319419.png"> -->
      台灣<br class="xl:hidden">旅遊網
    </router-link>
    <div class="flex flex-col xl:flex-grow xl:flex-row xl:justify-around">
      <div class="flex font-bold">
        <button class="whitespace-nowrap hover:bg-green-700 hover:text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-green-700 text-green-700" @click="enter('view')"><i class="fas fa-mountain"/> 景點</button>
        <button class="whitespace-nowrap hover:bg-red-700 hover:text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-red-600 text-red-600" @click="enter('food')"><i class="fas fa-cocktail"/> 美食</button>
        <button class="whitespace-nowrap hover:bg-blue-700 hover:text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-blue-600 text-blue-600" @click="enter('room')"><i class="fas fa-home"/> 旅館</button>
        <button class="whitespace-nowrap hover:bg-yellow-700 hover:text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-yellow-600 text-yellow-600" @click="enter('active')"><i class="fas fa-gift"/> 活動</button>
      </div>
      <div class="rounded-full flex justify-between px-3 py-1 border-2 mt-4 xl:mt-0" :class="nowCounty ? `bg-${props.theme}-800 text-white`: `border-${props.theme}-400 text-gray-400`">
        <button :class="nowCounty ? 'text-red-500' : ''" @click="cancelSearch"><i class="far fa-times-circle"/></button>
        <input class="text-center outline-none w-32" :class="nowCounty ? `bg-${props.theme}-800 placeholder-white`: ''" type="text" :placeholder="nowCounty ? keyword : '景點關鍵字'" v-model="keyword" @keyup.enter="search">
        <div>
          <select class="text-center rounded-full outline-none text-white mr-2 px-1" :class="`bg-${props.theme}-400`" v-model="county">
            <option value="">選擇縣市</option>
            <option :value="item" v-for="item in countyList" :key="item">{{ item }}</option>
          </select>
          <button @click="search"><i class="fas fa-search" :class="nowCounty ? `text-white`: `text-gray-400`"/></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import district from '../db/taiwan_sightseeing.json'

// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })
const store = useStore()

const county = ref('')
const keyword = ref('')

const nowCounty = computed(() => store.getters.nowCounty)

const countyList = district.map(item => item.county)

const enter = category => {
  store.dispatch('changePage', category)
}

const search = () => {
  if (keyword.value) {
    store.commit('SEARCHPAHE', store.getters.nowPage)
    store.commit('SEARCHCOUNTY', county.value)
    store.dispatch('SearchList', {
      county: county.value,
      keyword: keyword.value
    })
  } else if (county.value) {
    store.commit('SEARCHCOUNTY', county.value)
    store.dispatch('changePage', 'view')
  }
}

const cancelSearch = () => {
  store.commit('SEARCHPAHE', '')
  store.commit('SEARCHCOUNTY', '')
  county.value = ''
  keyword.value = ''
}

</script>
