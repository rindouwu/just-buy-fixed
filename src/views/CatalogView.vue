<script setup>
  import { ref, onMounted } from "vue"
  import getProducts from "@/services/products"
  import { useCartStore } from "@/stores/cart.js"
  import { useAuthStore } from "@/stores/auth.js";
  import { storeToRefs } from "pinia";
  import ProductCard from "@/components/catalog/ProductCard.vue"
  import BaseSkeleton from "@/components/ui/BaseSkeleton.vue"
  import BaseEmptyState from "@/components/ui/BaseEmptyState.vue"
  import BaseErrorState from "@/components/ui/BaseErrorState.vue"

  const cartStore = useCartStore()
  const authStore = useAuthStore()

  const { isAuthenticated } = storeToRefs(authStore)
  const products = ref([])
  const loading = ref(true)
  const errorExist = ref(false)
  const errorMessage = ref("")

  const fetchProducts = async () => {
    loading.value = true
    errorExist.value = false

    try {
      products.value = await getProducts();
    } catch (error) {
      errorExist.value = true
      errorMessage.value = error.message
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchProducts()
    if(isAuthenticated.value) { cartStore.loadCart() }
  })

</script>

<template>
  <section class="max-w-7xl mx-auto text-zinc-100 min-h-screen px-4 sm:px-6 lg:px-8">
    <h1 class="mb-8 text-3xl sm:text-4xl pt-5">Каталог товаров</h1>
    <div v-if="loading">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-5 animate-pulse">
        <BaseSkeleton
          v-for="n in 8" :key="n"
        />
      </div>
    </div>
    <div v-else-if="errorExist">
      <BaseErrorState
        :error="errorMessage"
        @retry="fetchProducts"
      />
    </div>
    <div v-else-if="products.length === 0">
      <BaseEmptyState message="Каталог товаров пуст" />
    </div>
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-5">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="bg-zinc-900"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
