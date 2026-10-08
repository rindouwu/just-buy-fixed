<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  }
})

defineEmits(["update:modelValue"]);
</script>

<template>
  <label :for="id" class="font-medium text-zinc-300 mt-4 first:mt-0">{{ label }}</label>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :aria-invalid="!!error"
    class="w-full rounded-lg border bg-zinc-800 px-4 py-3 mt-1 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1"
    :class="error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    : 'border-zinc-700 focus:border-blue-500 focus:ring-blue-500'"
    @input="$emit('update:modelValue', $event.target.value)"
  >
  <p v-if="error" class="text-red-400 text-sm mt-1">{{ error }}</p>
</template>

<style scoped>

</style>
