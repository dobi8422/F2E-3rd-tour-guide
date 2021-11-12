<template>
  <button
    class="fixed right-6 bottom-6 border-2 border-white rounded-full px-2.5 py-1 text-xl text-white hover:bg-white transform hover:-translate-y-2 duration-300"
    :class="`bg-${props.theme}-400 hover:text-${props.theme}-400`"
    @click="gotop"
  >
    <i class="fas fa-arrow-up"></i>
  </button>
<!--  right-6 button-72 md:button-36 lg:button-24"> -->
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })
const gotop = () => { document.documentElement.scrollTop = 0 }
</script>
