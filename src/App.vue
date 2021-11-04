<template>
  <div>
    <Nav v-if="!isHome"/>
    <div class="flex">
      <Filter v-if="!isHome"/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Nav from './components/Nav.vue'
import Filter from './components/Filter.vue'

import { computed } from 'vue'
import router from './router.js'

const isHome = computed(() => router.currentRoute.value.path === '/')
</script>

<style>
/* body{
  height: 100vh;
  background: blueviolet;
} */
</style>
