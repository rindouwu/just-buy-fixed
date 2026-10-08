<script setup>
import { useOrderStore } from "@/stores/order.js";
import { onMounted, ref } from "vue";
import getProducts from "@/services/products"
import EmptyState from "@/components/EmptyState.vue";
import Skeleton from "@/components/Skeleton.vue";

const orderStore = useOrderStore();

const products = ref([])
const loading = ref(true)
const error = ref(false)
const errorMessage = ref("")

const fetchProducts = async () => {
  loading.value = true
  error.value = false

  try {
    products.value = await getProducts();
  } catch (err) {
    error.value = true
    errorMessage.value = err.message
  } finally {
    loading.value = false
  }
}

const groupOrderProducts = () => {
  const orderItems = orderStore.items
  const result = []

  for(const item of orderItems) {
    const products = item.products

    const groupedProducts = products.reduce((acc, product) => {
      if(!acc[product]) {
        acc[product] = {
          product: product,
          quantity: 1
        }
      } else {
        acc[product].quantity += 1
      }
      return acc
    }, {})
    const data = {
      order_id: item.id,
      products: groupedProducts,
      price: item.order_price,
    }
    result.push(data)
  }
  return result
}

const searchProducts = (orderData) => {
  const groupList = Object.values(orderData.products)

  const fullProducts = groupList.map((item) => {
    const foundProduct = products.value.find(product => {
        return product.id === item.product
    })
    return {
      name: foundProduct.name,
      product: item.product,
      quantity: item.quantity,
    }
  })
  return fullProducts
}

onMounted(() => {
  orderStore.getOrderList()
  fetchProducts()
})


</script>

<template>
  <section class="text-zinc-200 h-screen max-w-7xl mx-auto pt-5">
    <h1 class="mb-8 text-4xl">Оформленные заказы</h1>
    <div v-if="loading" class="grid grid-cols-3 gap-8 pt-5 animate-pulse">
      <Skeleton v-for="n in 6" :key="n"/>
    </div>
    <div v-else-if="error">
      <p class="text-red-400">{{ errorMessage }}</p>
    </div>
    <div v-else-if="groupOrderProducts().length === 0">
      <EmptyState message="Заказов нет" />
    </div>
    <div v-else class="grid grid-cols-3 gap-8 max-w-7xl mx-auto">
      <div
        class="w-70 rounded-xl bg-zinc-900 p-5"
        v-for="order in groupOrderProducts()"
        :key="order.order_id">
        <ul>
          <li
            v-for="item in searchProducts(order)"
            :key="item.product">
              <p>Название: {{ item.name }}</p>
              <p>Товар: {{ item.product }}</p>
              <p>Количество: {{ item.quantity }}</p>
          </li>
        </ul>
        <div class="mt-6 flex justify-between border-t border-zinc-700 pt-4">
          <h2>Номер заказа: №{{ order.order_id }}</h2>
          <h3>Цена: {{ order.price }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
