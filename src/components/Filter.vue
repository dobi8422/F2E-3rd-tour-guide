<template>
  <div class="w-100 text-white">
    <button class="sider_button left-6" @click="filter = !filter"><i class="fas fa-filter text-white"></i></button>
    <div class="flex flex-col items-start xl:justify-between xl:w-80 rounded-3xl p-6 mb-5 xl:mr-10" :class="`bg-${props.theme}-600`" v-if="filter">
      <button class="w-100 rounded-full p-1 cursor-default xl:w-60 font-bold" :class="`bg-${props.theme}-800`">篩選條件</button>
      <button class="mx-2 mt-4" @click="location = !location">地區 <i class="fas fa-chevron-right transform duration-200" :class="{'rotate-90':location}" /></button>
      <div class="flex flex-wrap" v-if="location">
        <button class="filter_button">中正區</button>
        <button class="filter_button">中山區</button>
      </div>
      <!-- <button class="mx-2 mt-4" @click="openTime = !openTime">時間 <i class="fas fa-chevron-right transform duration-200" :class="{'rotate-90':openTime}" /></button>
      <div class="flex flex-wrap" v-if="openTime">
        <button class="filter_button">8:00</button>
        <button class="filter_button">9:00</button>
      </div> -->
      <button class="mx-2 mt-4" @click="itemClass = !itemClass">類型 <i class="fas fa-chevron-right transform duration-200" :class="{'rotate-90':itemClass}" /></button>
      <div class="flex flex-wrap" v-if="itemClass">
        <button class="filter_button">遊憩類</button>
        <button class="filter_button">其它類</button>
      </div>
      <div class="w-100 flex flex-col xl:flex-row justify-around xl:justify-between mt-5">
        <button class="rounded-full p-1 cursor-default w-100 mb-5 xl:mb-0 bg-white font-bold xl:order-last" :class="`text-${props.theme}-500`">送出查詢</button>
        <button class="rounded-full p-1 cursor-default w-100 mr-2 font-bold" :class="`bg-${props.theme}-800`">清除條件</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })

const filter = ref(true)
const location = ref(true)
// const openTime = ref(true)
const itemClass = ref(true)

</script>

<style>
.w-100{
  width: 100%;
}
</style>
