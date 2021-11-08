<template>
  <button class="fixed right-6 bottom-6 border-2 border-white rounded-full px-2.5 py-1 text-xl" :class="`bg-${props.theme}-400`"><i class="fas fa-arrow-up text-white"></i></button>
<!--  right-6 button-72 md:button-36 lg:button-24"> -->
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })
</script>
