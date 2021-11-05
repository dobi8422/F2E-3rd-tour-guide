<template>
  <div>
    <Nav :theme=theme />
    <router-view :theme=theme />
    <Gotop />
    <Footer :theme=theme />
  </div>
</template>

<script setup>
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
import Gotop from './components/GoTop.vue'

import { computed } from 'vue'
import router from './router.js'

const theme = computed(() => {
  let color
  switch (router.currentRoute.value.path) {
    case '/': color = 'purple'; break
    case '/view': color = 'green'; break
    case '/food': color = 'red'; break
    case '/room': color = 'blue'; break
    case '/active': color = 'yellow'; break
    default: color = 'color'; break
  }
  return color
})
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
  background: black;
}
::-webkit-scrollbar-thumb {
  background: rgb(189, 189, 189);
  border-radius: 0 5px 5px 0;
}
</style>
