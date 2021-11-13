<template>
  <div class="p-4 lg:p-20 pt-0 lg:pt-0 rounded-t-3xl" :class="`bg-${props.theme}-400`">
    <h4 class="text-4xl text-center py-10">{{ isFilter ? ` ${filterList.length} 筆資料` : searchPage ? `共 ${list.length} 筆資料` : ''}}</h4>
    <div class="flex flex-col xl:justify-start" :class="filterPanel ? 'xl:flex-row' : ''">
      <Filter :theme=props.theme @filterCondition=filterCondition @cancelFilter=cancelFilter />
      <ul
        class="grid grid-cols-1 gap-4"
        :class="listMode
          ? 'md:grid-cols-1'
          : filterPanel
            ? 'md:grid-cols-2 lg:grid-flow-row 2xl:grid-cols-3'
            : 'md:grid-cols-2 lg:grid-flow-row xl:grid-cols-3 2xl:grid-cols-4'"
        v-if="!isFilter"
      >
        <li
          class="cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5"
          :class="`hover:text-${props.theme}-800`"
          v-for="item in nowList"
          :key="item.ID"
          @click="detail(item)"
        >
          <div class="bg-white flex flex-col p-5 rounded-3xl" :class="listMode ? 'md:flex-row' : 'md:flex-col'">
            <img class="h-64 rounded-3xl" :class="{'md:w-80':listMode}" :src="item.Picture.PictureUrl1" :alt="item.Name" v-if="item.Picture.PictureUrl1">
            <img class="h-64 rounded-3xl" :class="{'md:w-80':listMode}" src="../assets/NoImageFound.png" alt="not found image" v-else>
            <div class="p-5 grid grid-cols-1">
              <h5 class="truncate text-4xl font-bold pb-4">{{ item.Name }}</h5>
              <p class="truncate mr-1">{{ item.Description ? item.Description : item.DescriptionDetail ? item.DescriptionDetail : '未提供內容描述' }}</p>
              <p class="truncate border-t-2 border-gray-400 pt-3 mt-3 text-lg"><i class="fas fa-map-marker-alt px-2"></i>{{ item.Address ? item.Address : item.City }}</p>
              <p class="truncate text-lg w-64"><i class="fas fa-clock px-1.5"></i>{{ item.OpenTime ? item.OpenTime : '未提供營業時間'}}</p>
            </div>
          </div>
        </li>
      </ul>
      <ul
        class="grid grid-cols-1 gap-4"
        :class="listMode
          ? 'md:grid-cols-1'
          : filterPanel
            ? 'md:grid-cols-2 lg:grid-flow-row 2xl:grid-cols-3'
            : 'md:grid-cols-2 lg:grid-flow-row xl:grid-cols-3 2xl:grid-cols-4'"
        v-else
      >
        <li
          class="cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5"
          :class="`hover:text-${props.theme}-800`"
          v-for="item in filterList"
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
              <p class="truncate text-lg w-64"><i class="fas fa-clock px-1.5"></i>{{ item.OpenTime ? item.OpenTime : '未提供營業時間'}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Type :theme=props.theme />
    <Gotop :theme=props.theme v-if="isGotop" />
  </div>
</template>

<script setup>
import Filter from '../components/Filter.vue'
import Type from '../components/Type.vue'
import Gotop from '../components/GoTop.vue'

import { computed, onMounted, ref, watch } from 'vue'
import router from '../router.js'
import { useStore } from 'vuex'

const store = useStore()

// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })
const listMode = computed(() => store.getters.listMode)
const filterPanel = computed(() => store.getters.filterPanel)
const searchPage = computed(() => store.getters.searchPage)

const nowList = computed(() => store.getters.nowList)

const list = computed(() => {
  return store.getters.searchPage === store.getters.nowPage
    ? store.getters.searchList
    : store.getters.nowPage
      ? store.getters[`${store.getters.nowPage}List`]
      : []
})

const filterList = ref([])
const isFilter = ref(false)
const filterCondition = filterCondition => {
  isFilter.value = true
  const County = filterCondition.filterCounty
  const Area = filterCondition.filterArea
  const ItemClass = filterCondition.filterClass
  const arr = []
  if (!Area[0]) {
    list.value.forEach(item => {
      if (County.indexOf(item.Address.replace(/[0-9]/g, '').slice(0, 3)) !== -1) arr.push(item)
    })
  } else {
    list.value.forEach(item => {
      if (Area.indexOf(item.Address.replace(/[0-9]/g, '').slice(3, 6)) !== -1) arr.push(item)
    })
  }
  const arr2 = []
  if (ItemClass[0]) {
    if (store.getters.nowPage === 'view') {
      arr.forEach(item => {
        if (ItemClass.indexOf(item.Class1) !== -1 ||
          ItemClass.indexOf(item.Class2) !== -1 ||
          ItemClass.indexOf(item.Class3) !== -1) arr2.push(item)
      })
    } else {
      arr.forEach(item => {
        if (ItemClass.indexOf(item.Class) !== -1) arr2.push(item)
      })
    }
    filterList.value = arr2
  } else {
    filterList.value = arr
  }
}

watch(nowList, (newValue, oldValue) => {
  isFilter.value = false
})

const cancelFilter = cancelFilter => {
  isFilter.value = cancelFilter
}

const isGotop = ref('')

onMounted(() => {
  store.dispatch('changePage', router.currentRoute.value.path)
  window.onscroll = () => {
    isGotop.value = window.scrollY > 500
    if (!isFilter.value && window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
      store.dispatch('addNowList', store.getters.nowPage)
    }
  }
})

const detail = item => {
  router.push(`/detail/${item.ID}`)
  store.commit('DETAILDATA', item)
}
</script>
