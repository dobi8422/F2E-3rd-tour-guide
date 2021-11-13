<template>
  <div class="image w-screen h-screen flex justify-center items-start md:items-center">
    <div class="flex flex-col md:flex-row justify-around items-center px-10 text-lg py-20 lg:py-32 md:border-4 border-white rounded-3xl xl:w-full xl:mx-96">
      <router-link class="text-5xl text-center font-bold flex text-white flex-grow justify-center xl:w-48" to="/">
        台灣<br>旅遊網
      </router-link>
      <div class="flex flex-col mt-5 md:mt-0 w-screen p-10 sm:px-20 md:w-96 md:p-0">
        <div class="grid grid-cols-2 gap-10 font-bold sm:px-10">
          <button class="whitespace-nowrap hover:bg-white bg-green-700 text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-green-700 hover:text-green-700" @click="enter('view')"><i class="fas fa-mountain"/> 景點</button>
          <button class="whitespace-nowrap hover:bg-white bg-red-600 text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-red-600 hover:text-red-600" @click="enter('food')"><i class="fas fa-cocktail"/> 美食</button>
          <button class="whitespace-nowrap hover:bg-white bg-blue-600 text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-blue-600 hover:text-blue-600" @click="enter('room')"><i class="fas fa-home"/> 旅館</button>
          <button class="whitespace-nowrap hover:bg-white bg-yellow-600 text-white border-2 rounded-full px-2 py-1 ml-4 font-bold border-yellow-600 hover:text-yellow-600" @click="enter('active')"><i class="fas fa-gift"/> 活動</button>
        </div>
        <div
          class="rounded-full flex justify-between px-3 py-1 mt-4 sm:mt-6 lg:mt-10 border-2 h-10 md:w-72 md:self-center"
          :class="`border-${props.theme}-800 bg-${props.theme}-800 hover:bg-${props.theme}-700 hover:border-${props.theme}-700`"
        >
          <button class="text-red-500" @click="cancelSearch"><i class="far fa-times-circle"/></button>
          <input
            class="text-center outline-none bg-transparent w-28 placeholder-white"
            type="text"
            placeholder="關鍵字搜尋"
            v-model="keyword"
            @keyup.enter="search"
          >
          <div>
            <select
              class="cursor-pointer text-center rounded-full outline-none text-white mr-2 px-1"
              :class="`bg-${props.theme}-400`"
              v-model="county"
            >
              <option value="">選擇縣市</option>
              <option :value="item" v-for="item in countyList" :key="item">{{ item }}</option>
            </select>
            <button @click="search"><i class="fas fa-search text-white"/></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import district from '../db/county.json'

// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })
const store = useStore()

const county = ref('')
const keyword = ref('')

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

<style>
.image{
  background: url(../assets/pexels-timo-volz-6138797.jpg) center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
