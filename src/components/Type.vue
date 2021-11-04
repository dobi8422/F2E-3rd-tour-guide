<template>
  <div class="list-none cursor-pointer">
    <li v-if="list" @click="list = false" class="text-purple-700"><i class="fas fa-th"></i></li>
    <li v-else @click="list = true" class="text-purple-700"><i class="fas fa-th-list"></i></li>
  </div>
</template>

<script>
export default {
  data: () => ({
    list: true
  })
}
</script>
