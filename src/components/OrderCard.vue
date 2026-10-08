<script setup>
defineProps({
  order: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <article class="rounded-xl bg-zinc-900 p-5 flex flex-col">
    <ul class="flex-1 divide-y divide-zinc-800">
      <li
        v-for="item in items"
        :key="item.product"
        class="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
        <div class="min-w-0">
          <p class="text-zinc-100 truncate">{{ item.name || `Товар #${item.product}` }}</p>
          <p class="text-sm text-zinc-500">ID: {{ item.product }}</p>
        </div>
        <span class="text-zinc-300 text-sm shrink-0">x {{ item.quantity }}</span>
      </li>
    </ul>

    <div class="mt-5 pt-4 border-t border-zinc-700 flex items-center justify-between">
      <span class="text-sm text-zinc-400">Заказ №{{ order.order_id }}</span>
      <span class="text-lg font-semibold text-zinc-100">{{ order.price }} &#8381;</span>
    </div>
  </article>
</template>

<style scoped>

</style>
