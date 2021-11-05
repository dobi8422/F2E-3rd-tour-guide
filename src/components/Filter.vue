<template>
  <div class="flex flex-col justify-between items-center w-80 rounded-3xl p-6 mb-5 mr-10" :class="`bg-${props.theme}-200`">
    <div class="flex flex-col items-start p-2 w-64">
      <button class="rounded-full p-1 cursor-default w-60" :class="`bg-${props.theme}-400`">篩選條件</button>
      <button @click="location = !location">地區<i class="fas fa-chevron-right" :class="{'transform rotate-90':location}"/></button>
      <div class="flex" v-if="location">
        <button>中正區</button>
        <button>中山區</button>
      </div>
      <button @click="openTime = !openTime">時間<i class="fas fa-chevron-right" :class="{'transform rotate-90':openTime}"/></button>
      <div class="flex" v-if="openTime">
        <button>8:00</button>
        <button>9:00</button>
      </div>
      <button @click="itemClass = !itemClass">類型<i class="fas fa-chevron-right" :class="{'transform rotate-90':itemClass}"/></button>
      <div class="flex" v-if="itemClass">
        <button>遊憩類</button>
        <button>其它類</button>
      </div>
    </div>
    <div class="flex justify-around w-64">
      <button class="rounded-full p-1 cursor-default w-28" :class="`bg-${props.theme}-400`">送出查詢</button>
      <button class="rounded-full p-1 cursor-default w-28" :class="`bg-${props.theme}-400`">清除全部</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })

const location = ref(false)
const openTime = ref(false)
const itemClass = ref(false)

</script>
