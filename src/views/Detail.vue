<template>
  <div class="p-4 md:p-20 pt-0 md:pt-0 rounded-t-3xl" :class="`bg-${props.theme}-400`">
    <h3 class="text-5xl text-center py-10">詳細資訊</h3>
    <div class="p-10 pb-0 bg-white rounded-3xl" v-if="store.getters.nowPage">
      <div class="flex flex-col xl:flex-row items-center">
        <img class="rounded-3xl lg:max-h-96" :src="detail[0].Picture.PictureUrl1" :alt="detail[0].Picture.PictureDescription1" v-if="detail[0].Picture.PictureUrl1">
        <img class="rounded-3xl lg:max-h-96" src="../assets/NoImageFound.png" alt="not found image" v-else>
        <div class="xl:px-10 self-start">
          <div class="my-5 xl:mt-0 flex items-end justify-between w-full">
            <p class="text-3xl mr-2">{{ detail[0].Name }}</p>
            <div class="pr-1 text-gray-500 whitespace-nowrap">
              <p>{{ detail[0].Class ? detail[0].Class : '' }}</p>
              <p>{{ detail[0].Class1 ? detail[0].Class1 : '' }}</p>
              <p>{{ detail[0].Class2 ? detail[0].Class2 : '' }}</p>
              <p>{{ detail[0].Class3 ? detail[0].Class3 : '' }}</p>
              <p>{{ detail[0].Level ? detail[0].Level : '' }}</p>
            </div>
          </div>
          <p class="px-1">{{ detail[0].DescriptionDetail ? detail[0].DescriptionDetail : detail[0].Description }}</p>
        </div>
      </div>
      <div class="border-dashed border-t-4 pt-5 mt-5 px-1" :class="`border-${props.theme}-300`">
        <p>{{ detail[0].OpenTime ? `營業時間：${detail[0].OpenTime}` : '營業時間：未提供營業時間' }}</p>
        <p>{{ detail[0].TicketInfo ? `票價：${detail[0].TicketInfo}` : '' }}</p>
        <p>{{ `電話：${detail[0].Phone}` }}</p>
        <p>{{ detail[0].Organizer ? `舉辦者：${detail[0].Organizer}` : '' }}</p>
        <p>{{ detail[0].StartTime ? `活動開始：${detail[0].StartTime}` : '' }}</p>
        <p>{{ detail[0].EndTime ? `活動結束：${detail[0].EndTime}` : '' }}</p>
        <p>{{ detail[0].Address ? `地址：${detail[0].Address}` : detail[0].Location ? `地址：${detail[0].Location}` : '地址：未提供地址' }}</p>
      </div>
      <div class="flex flex-col xl:flex-row border-dashed border-t-4 pt-5 mt-5 px-1" :class="`border-${props.theme}-300`">
        <div id="map" class="h-96 w-full rounded-xl"></div>
        <p class="w-full pt-5 xl:pl-5">{{ detail[0].TravelInfo ? `交通方式：${detail[0].TravelInfo}` : '' }}</p>
      </div>
      <p class="mt-8 text-center text-gray-500">{{ `更新時間：${detail[0].SrcUpdateTime}` }}</p>
    </div>
  </div>
</template>

<script setup>
import L from 'leaflet'
import { onMounted, reactive } from 'vue'
import router from '../router.js'
import { useStore } from 'vuex'
// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })

const store = useStore()

const detail = reactive([store.getters.detailData])

const position = [detail[0].Position.PositionLat, detail[0].Position.PositionLon]

let osmMap = {}

onMounted(() => {
  osmMap = L.map('map').setView(position, 14)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(osmMap)
  L.marker(position).addTo(osmMap)
  if (store.getters.nowPage === '') router.push('/')
})
</script>
