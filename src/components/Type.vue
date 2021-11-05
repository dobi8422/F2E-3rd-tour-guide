<template>
  <div class="list-none cursor-pointer absolute top-24 right-6 border-2 border-white rounded-full px-2 py-1">
    <li v-if="nowType === 'list'" @click="changeType('block')" class="text-white"><i class="fas fa-th"></i></li>
    <li v-if="nowType === 'block'" @click="changeType('list')" class="text-white"><i class="fas fa-th-list"></i></li>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const nowType = computed(() => store.getters.nowType)

const changeType = (type) => {
  store.commit('CHANGETYPE', type)
}
</script>
