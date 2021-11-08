<template>
  <div class="hidden md:inline ">
    <button v-if="listMode" @click="store.commit('LISTMODE')" class="sider_button right-2 md:right-6 text-white" :class="`bg-${props.theme}-400`"><i class="fas fa-th"></i></button>
    <button v-if="!listMode" @click="store.commit('LISTMODE')" class="sider_button right-2 md:right-6 text-white" :class="`bg-${props.theme}-400`"><i class="fas fa-th-list"></i></button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const listMode = computed(() => store.getters.listMode)

// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })
</script>
