<template>
  <div class="flex flex-col items-center py-16" :class="`bg-${props.theme}-400`">
    <div class="bg-white w-96 h-96 rounded-3xl p-8">
      <p class="text-3xl text-center">景點</p>
      <div class="border-2 rounded-xl">
        <div>
          <img src="../assets/NoImageFound.png" alt="">
          <p>class</p>
          <p>name</p>
        </div>
      </div>
    </div>
    美食
    旅館
    活動
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({ theme: String })
</script>
