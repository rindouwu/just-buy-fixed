<script setup>
import { useOrderStore } from "@/stores/order.js";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import BaseEmptyState from "@/components/BaseEmptyState.vue";
import BaseSkeleton from "@/components/BaseSkeleton.vue";
import OrderCard from "@/components/OrderCard.vue";

const orderStore = useOrderStore();

const { groupOrderProducts, loading, error, errorMessage } = storeToRefs(orderStore);
const { searchProducts } = orderStore;

onMounted(() => {
  orderStore.getOrderList()
  orderStore.fetchProducts()
})
</script>

<template>
  <section class="text-zinc-200 min-h-screen max-w-7xl mx-auto pt-5 px-4 sm:px-6 lg:px-8">
    <RouterLink to="/" class="inline-block mb-4 text-sm text-zinc-400 hover:text-zinc-200 transition-colors duration-200 ease-in-out">
      Назад в каталог
    </RouterLink>
    <h1 class="mb-8 text-3xl sm:text-4xl">Оформленные заказы</h1>
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-5 animate-pulse">
      <BaseSkeleton v-for="n in 6" :key="n"/>
    </div>
    <div v-else-if="error">
      <p class="text-red-400">{{ errorMessage }}</p>
    </div>
    <div v-else-if="groupOrderProducts.length === 0">
      <BaseEmptyState message="Заказов нет" />
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      <OrderCard
        v-for="order in groupOrderProducts"
        :key="order.order_id"
        :order="order"
        :items="searchProducts(order)"
      />
    </div>
  </section>
</template>

<style scoped>

</style>
