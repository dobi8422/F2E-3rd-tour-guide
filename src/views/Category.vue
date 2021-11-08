<template>
  <div class="p-4 lg:p-20 rounded-t-3xl" :class="`bg-${props.theme}-400`">
    <div class="items-center xl:items-start xl:flex-row xl:justify-center" :class="filterPanel ? 'flex flex-col' : ''">
      <Filter :theme=props.theme @filterCondition=filterCondition />
      <h4 class="text-3xl">{{ list[0] ? '' : '無資料符合'}}</h4>
      <ul
        class="grid grid-cols-1 gap-4"
        :class="listMode
          ? 'md:grid-cols-1'
          : filterPanel
            ? 'md:grid-cols-2 lg:grid-flow-row 2xl:grid-cols-3'
            : 'md:grid-cols-2 lg:grid-flow-row xl:grid-cols-3 2xl:grid-cols-4'"
      >
        <li
          class="cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5"
          :class="`hover:text-${props.theme}-800`"
          v-for="item in list"
          :key="item.ID"
          @click="detail(item)"
        >
          <div class="bg-white flex flex-col p-5 rounded-3xl" :class="listMode ? 'md:flex-row' : 'md:flex-col'">
            <img class="h-64 rounded-3xl" :class="{'md:w-80':listMode}" :src="item.Picture.PictureUrl1" :alt="item.Name" v-if="item.Picture.PictureUrl1">
            <img class="h-64 rounded-3xl" :class="{'md:w-80':listMode}" src="../assets/NoImageFound.png" alt="not found image" v-else>
            <div class="p-5 grid grid-cols-1">
              <h5 class="truncate text-4xl font-bold pb-4">{{ item.Name }}</h5>
              <p class="truncate mr-1">{{ item.Description ? item.Description : item.DescriptionDetail ? item.DescriptionDetail : '未提供內容描述' }}</p>
              <p class="truncate border-t-2 border-gray-400 pt-3 mt-3 text-lg"><i class="fas fa-map-marker-alt px-2"></i>{{ item.Address }}</p>
              <p class="truncate text-lg"><i class="fas fa-clock px-1.5"></i>{{ item.OpenTime ? item.OpenTime : '未提供營業時間'}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Pagination />
    <Type :theme=props.theme />
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
const listMode = computed(() => store.getters.listMode)
const filterPanel = computed(() => store.getters.filterPanel)

const list = computed(() => {
  return store.getters.searchPage === store.getters.nowPage
    ? store.getters.searchList
    : store.getters.nowPage
      ? store.getters[`${store.getters.nowPage}List`]
      : []
})

const filterList = []
const filterCondition = filterCondition => {
  const originList = list.value
  const loaction = originList.map(item => item.Address.slice(/[^0-9]/g))
    .map(item => {
      return {
        county: item.slice(0, 3),
        arem: item.slice(6, 9)
      }
    })
  console.log(filterCondition, loaction)
  console.log(loaction[0].county, filterCondition.filterCounty[0])
  const arr = originList.filter(item => {
    return item.county === filterCondition.filterCounty[0]
  })
  console.log(arr)
  // console.log(originList[0].Address.slice(/[^0-9]/g).slice(6, 9), filterCondition.filterArea.map(item => item))
  // const arr2 = originList.forEach(item => {
  //   console.log(item.Address.slice(/[^0-9]/g).slice(6, 9))
  // })
  // console.log(arr2)
  // loaction.push()
}

const detail = item => {
  router.push(`/detail/${item.ID}`)
  store.commit('DETAILDATA', item)
}

onMounted(() => {
  store.dispatch('changePage', router.currentRoute.value.path)
})
</script>
