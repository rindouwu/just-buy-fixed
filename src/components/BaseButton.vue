<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="h-10 cursor-pointer font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="{
      'bg-blue-600 hover:bg-blue-500 text-zinc-100': variant === 'primary',
      'bg-zinc-700 hover:bg-zinc-600 text-zinc-100': variant === 'secondary',
      'bg-red-600 hover:bg-red-500 text-zinc-100': variant === 'danger',
    }"
  >
    <slot />
  </button>
</template>

<style scoped>

</style>
