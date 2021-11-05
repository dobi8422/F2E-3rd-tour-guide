<template>
  <div :class="`text-${props.theme}-400`">
    景點詳細資訊...
  </div>
</template>

<script setup>
const props = defineProps({ theme: String })
</script>
