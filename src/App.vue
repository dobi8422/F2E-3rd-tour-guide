<template>
  <div>
    <Nav :theme=theme v-if="theme !== 'orange'" />
    <router-view class="min-h-screen" :theme=theme />
    <Footer :theme=theme />
  </div>
</template>

<script setup>
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'

import { computed } from 'vue'
import router from './router.js'

let color
const theme = computed(() => {
  switch (router.currentRoute.value.path) {
    case '/': color = 'orange'; break
    case '/view': color = 'green'; break
    case '/food': color = 'red'; break
    case '/room': color = 'blue'; break
    case '/active': color = 'yellow'; break
    default: color = `${color}`; break
  }
  return color
})
</script>

<style>
body{
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 5px;
  background: black;
}
::-webkit-scrollbar-thumb {
  background: rgb(189, 189, 189);
  border-radius: 5px;
}
</style>
