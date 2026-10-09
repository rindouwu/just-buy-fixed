<script setup>
const props = defineProps({
  message: String,
})
</script>

<template>
  <div class="empty">
    <h2 class="text-lg text-zinc-200">{{ props.message }}</h2>
  </div>
</template>

<style scoped>

</style>
