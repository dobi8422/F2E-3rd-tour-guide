<template>
  <div class="sider_button right-6">
    <button v-if="nowType === 'list'" @click="changeType('block')" class="text-white"><i class="fas fa-th"></i></button>
    <button v-if="nowType === 'block'" @click="changeType('list')" class="text-white"><i class="fas fa-th-list"></i></button>
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
