<template>
  <div :class="`bg-${props.theme}-400`">
    Home
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })
</script>
