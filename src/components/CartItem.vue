<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  imageBaseUrl: {
    type: String,
    default: ''
  }
})

defineEmits(["increment", "decrement", "remove"])
</script>

<template>
  <article class="item flex items-center gap-6 rounded-xl bg-zinc-800 p-4">
    <div>
      <img
        v-if="item.image"
        :src="imageBaseUrl + item.image"
        :alt="item.name"
        class="w-24 sm:w-32 h-20 sm:h-24 object-contain rounded-lg">
    </div>
    <div class="flex flex-1 justify-between items-center gap-3 min-w-0">
      <div class="min-w-0">
        <h3 class="text-base sm:text-lg font-semibold truncate">{{ item.name }}</h3>
        <div class="flex items-center gap-3 mt-2">
          <button
            class="cursor-pointer w-8 h-8 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors duration-200"
            @click="$emit('decrement', item)">
            -
          </button>
          <p>{{ item.quantity || 0}}</p>
          <button
            class="cursor-pointer w-8 h-8 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors duration-200"
            @click="$emit('increment', item)">
            +
          </button>
        </div>
        <p class="mt-2 text-zinc-400 font-medium">{{ item.price }} &#8381;</p>
      </div>
      <button
        class="text-red-400 cursor-pointer hover:text-red-300 transition-colors duration-200 text-sm shrink-0"
        @click="$emit('remove', item)">
        Удалить
      </button>
    </div>
  </article>
</template>

<style scoped>

</style>
