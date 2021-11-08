<template>
  <div class="w-100 text-white">
    <button class="sider_button left-2 md:left-6" :class="`bg-${props.theme}-400`" @click="isFilter"><i class="fas fa-filter text-white"></i></button>
    <div class="flex flex-col items-start xl:justify-between xl:w-80 rounded-3xl p-6 mb-5 xl:mr-10" :class="`bg-${props.theme}-600`" v-if="filter">
      <button class="w-100 rounded-full p-1 cursor-default xl:w-60 font-bold" :class="`bg-${props.theme}-800`">{{ nowCounty ? '關鍵字搜尋' : '篩選條件' }}</button>
      <button class="mx-2 mt-4" @click="county = !county">縣市 <i class="fas fa-chevron-right transform duration-200" :class="{'rotate-90':county}" /></button>
      <div class="flex flex-wrap" v-if="county">
        <button class="filter_button"
          :class="[
            nowCounty
              ? nowCounty === item
                ? `bg-white border${props.theme}-900 text-${props.theme}-600 px-2.5`
                : `border-${props.theme}-900 text-${props.theme}-900 border-white border-2 px-2`
              : filterCounty.indexOf(item) === -1
                ? `border-white bg-${props.theme}-600 border-2 px-2`
                : `bg-white text-${props.theme}-600 px-2.5 py-0.5`]"
          v-for="item in countyList"
          :key="item"
          @click="addFilterCounty(item)"
        >{{ item }}</button>
      </div>
      <button class="mx-2 mt-4" :class="nowCounty ? `text-${props.theme}-900` : ''" @click="arem = !arem">地區 <i class="fas fa-chevron-right transform duration-200" :class="{'rotate-90': !nowCounty && arem}" /></button>
      <div class="flex flex-wrap" v-if="!nowCounty && arem">
        <button class="filter_button"
          :class="[
            filterArea.indexOf(item) === -1
              ? `border-white bg-${props.theme}-600 border-2 px-2`
              : `bg-white text-${props.theme}-600 px-2.5 py-0.5`]"
          v-for="item in aremList"
          :key="item"
          @click="addFilterArem(item)"
        >{{ item }}</button>
      </div>
      <button class="mx-2 mt-4" :class="nowCounty ? `text-${props.theme}-900` : ''" @click="itemClass = !itemClass">類型 <i class="fas fa-chevron-right transform duration-200" :class="{'rotate-90': !nowCounty && itemClass}" /></button>
      <div class="flex flex-wrap" v-if="!nowCounty && itemClass">
        <button class="filter_button">遊憩類</button>
        <button class="filter_button">其它類</button>
      </div>
      <div class="w-100 flex flex-col xl:flex-row justify-around xl:justify-between mt-5">
        <button class="rounded-full p-1 w-100 mb-5 xl:mb-0 font-bold xl:order-last" :class="nowCounty ? `bg-${props.theme}-800 text-${props.theme}-400` : `bg-white text-${props.theme}-500`" @click="sendFilter">送出查詢</button>
        <button class="rounded-full p-1 w-100 mr-2 font-bold" :class="nowCounty ? `bg-${props.theme}-800 text-${props.theme}-400` : `bg-${props.theme}-800`" @click="clearFilter">清除條件</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

import district from '../db/taiwan_sightseeing.json'

// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })
const store = useStore()

const filter = ref(true)
const county = ref(true)
const arem = ref(true)
const itemClass = ref(true)

const isFilter = () => {
  filter.value = !filter.value
  store.commit('FILTERPANEL')
}

const nowCounty = computed(() => store.getters.nowCounty)

const countyList = district.map(item => item.county)
const filterCounty = reactive([])
const addFilterCounty = county => {
  if (!nowCounty.value) {
    if (filterCounty.indexOf(county) === -1) {
      filterCounty.push(county)
      addCountyArem(county, 'add')
    } else {
      filterCounty.splice(filterCounty.indexOf(county), 1)
      addCountyArem(county, 'delete')
    }
  }
}

const aremList = reactive([])
const addCountyArem = (county, action) => {
  if (action === 'add') {
    district.filter(item => item.county === county)
      .forEach(item => {
        item.districts.forEach(ittem => aremList.push(ittem.arem))
      })
  } else {
    const deteDitrict = district.find(item => item.county === county)
    const deleteArem = deteDitrict.districts.map(item => item.arem)
    aremList.splice(aremList.indexOf(deleteArem[0]), deleteArem.length)
  }
  addFilterArem()
}

const filterArea = reactive([])
const addFilterArem = arem => {
  if (!nowCounty.value) {
    filterArea.indexOf(arem) === -1
      ? filterArea.push(arem)
      : filterArea.splice(filterArea.indexOf(arem), 1)
  }
}

// const filterItemclass = reactive([])
// const addFilterItemclass = () => {
//   console.log(addFilterItemclass)
// }

// eslint-disable-next-line no-undef
const emit = defineEmits({ filterCondition: Object })
// 傳入category.vue
const sendFilter = () => {
  const filterCondition = {
    filterCounty: filterCounty,
    filterArea: filterArea
  }
  emit('filterCondition', filterCondition)
}

// !!!!!! 當有nowCounty.value，則傳入資料頁為nowCounty.value 沒有則傳filterCounty

const clearFilter = () => {
  filterCounty.splice(0, filterCounty.length)
  aremList.splice(0, aremList.length)
  filterArea.splice(0, filterArea.length)
}
</script>

<style>
.w-100{
  width: 100%;
}
.h-100{
  height: 100%;
}
</style>
