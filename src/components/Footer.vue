<template>
  <div class="text-center text-white pb-0.5 pt-1" :class="`bg-${props.theme}-600`">
    <a class="mx-4" href="https://2021.thef2e.com/" target="_blank">F2E-3rd</a>
    <a class="mx-4" href="https://github.com/dobi8422/F2E-3rd-tour-guide" target="_blank"><i class="fab fa-github"/>&nbsp;dosss</a>
    <a class="mx-4" href="https://ptx.transportdata.tw/PTX/" target="_blank">TDX API</a>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })
</script>
