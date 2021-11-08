<template>
  <div class="p-4 md:p-20 rounded-t-3xl" :class="`bg-${props.theme}-400`">
    <h3 class="text-5xl text-center mt-2 mb-5">詳細資訊</h3>
    <div class="p-10 pb-0 bg-white rounded-3xl flex flex-col">
      <img class="rounded-3xl" :src="detail[0].Picture.PictureUrl1" :alt="detail[0].Picture.PictureDescription1" v-if="detail[0].Picture.PictureUrl1">
      <img class="rounded-3xl" src="../assets/NoImageFound.png" alt="not found image" v-else>
      <div class="my-5 flex items-end justify-between w-100">
        <p class="text-3xl mr-2">{{ detail[0].Name }}</p>
        <div class="pr-1">
          <p class="text-gray-500">{{ detail[0].Class ? detail[0].Class : detail[0].Class1 ? detail[0].Class1 : '' }}</p>
          <p>{{ detail[0].Level ? detail[0].Level : '' }}</p>
        </div>
      </div>
      <p class="px-1">{{ detail[0].DescriptionDetail ? detail[0].DescriptionDetail : detail[0].Description }}</p>
      <div class="border-dashed border-t-4 pt-5 mt-5 px-1" :class="`border-${props.theme}-300`">
        <p>{{ detail[0].OpenTime ? `營業時間：${detail[0].OpenTime}` : '營業時間：未提供營業時間' }}</p>
        <p>{{ detail[0].TicketInfo ? `票價：${detail[0].TicketInfo}` : '' }}</p>
        <p>{{ `電話：${detail[0].Phone}` }}</p>
        <p>{{ detail[0].Organizer ? `舉辦者：${detail[0].Organizer}` : '' }}</p>
        <p>{{ detail[0].StartTime ? `活動開始：${detail[0].StartTime}` : '' }}</p>
        <p>{{ detail[0].EndTime ? `活動結束：${detail[0].EndTime}` : '' }}</p>
        <p>{{ detail[0].TravelInfo ? `交通方式：${detail[0].TravelInfo}` : '' }}</p>
        <p>{{ detail[0].Address ? `地址：${detail[0].Address}` : detail[0].Location ? `地址：${detail[0].Location}` : '地址：未提供地址' }}</p>
      </div>
      <p class="border-2 mt-5" :class="`border-${props.theme}-300`">{{ detail[0].Position }}</p>
      <p class="mt-8 text-center text-gray-500">{{ `更新時間：${detail[0].SrcUpdateTime}` }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import router from '../router.js'
import { useStore } from 'vuex'
// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })

const store = useStore()

const detail = reactive([store.getters.detailData])

onMounted(() => {
  if (store.getters.nowPage === '') router.push('/')
  console.log(detail[0])
})
</script>
