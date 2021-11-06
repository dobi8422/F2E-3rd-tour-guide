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
      <div class="bg-white rounded-full flex justify-between px-3 py-1 border-2 mt-4 xl:mt-0" :class="`border-${props.theme}-400`">
        <button @click="cancelSearch"><i class="far fa-times-circle text-gray-400"/></button>
        <input class="text-center outline-none w-32" type="text" placeholder="關鍵字搜尋" v-model="keyword" @keyup.enter="search">
        <div>
          <select class="text-center rounded-full outline-none text-white mr-2 px-1" :class="`bg-${props.theme}-400`" v-model="county">
            <option value="">選擇縣市</option>
            <option value="Taipei">臺北市</option>
            <option value="NewTaipei">新北市</option>
            <option value="Keelung">基隆市</option>
            <option value="YilanCounty">宜蘭縣</option>
            <option value="Hsinchu">新竹市</option>
            <option value="HsinchuCounty">新竹縣</option>
            <option value="Taoyuan">桃園市</option>
            <option value="MiaoliCounty">苗栗縣</option>
            <option value="Taichung">臺中市</option>
            <option value="ChanghuaCounty">彰化縣</option>
            <option value="NantouCounty">南投縣</option>
            <option value="YunlinCounty">雲林縣</option>
            <option value="ChiayiCounty">嘉義縣</option>
            <option value="Chiayi">嘉義市</option>
            <option value="Tainan">臺南市</option>
            <option value="Kaohsiung">高雄市</option>
            <option value="PingtungCounty">屏東縣</option>
            <option value="TaitungCounty">臺東縣</option>
            <option value="HualienCounty">花蓮縣</option>
            <option value="PenghuCounty">澎湖縣</option>
            <option value="KinmenCounty">金門縣</option>
            <option value="LienchiangCounty">連江縣</option>
          </select>
          <button @click="search"><i class="fas fa-search text-gray-400"/></button>
        </div>
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

const county = ref('')
const keyword = ref('')

const enter = category => {
  store.dispatch('changePage', category)
}

const search = () => {
  if (keyword.value) {
    store.commit('SEARCHPAHE', store.getters.nowPage)
    store.dispatch('SearchList', {
      county: county.value,
      keyword: keyword.value
    })
  }
}

const cancelSearch = () => {
  store.commit('SEARCHPAHE', '')
  county.value = ''
  keyword.value = ''
}

</script>
