<script setup>
import {useCartStore} from "@/stores/cart.js";
import {useOrderStore} from "@/stores/order.js";
import {onMounted} from "vue";
import { useRouter } from "vue-router";
import { useToastStore } from "@/stores/toast.js"
import EmptyState from "@/components/EmptyState.vue";
import CartItem from "@/components/CartItem.vue";

const cartStore = useCartStore();
const orderStore = useOrderStore();
const toastStore = useToastStore();

const router = useRouter();

const image_base_url = import.meta.env.VITE_IMAGE_BASE_URL

const closeCart = () => {
  router.push('/')
}

const makeOrder = async () => {
  try {
    await orderStore.createOrder()
    toastStore.showToast("Заказ создан успешно", "success")
  } catch (error) {
    toastStore.showToast(error.message, "error")
    return;
  }
  await cartStore.loadCart()

  router.push('/orders')
}

onMounted(() => {
  cartStore.loadCart();
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex justify-end text-zinc-200">
    <div class="cart-overlay fixed inset-0 bg-black/60 cursor-pointer" @click="closeCart()" />

    <aside class="relative z-10 w-full sm:max-w-md h-full bg-zinc-900 flex flex-col">
      <div class="p-4">
        <button
          class="cursor-pointer w-8 h-8 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors duration-200"
          @click="closeCart()">
          x
        </button>
      </div>
      <div class="flex justify-center items-center">
        <h1 class="mb-8 text-2xl sm:text-4xl">Корзина</h1>
      </div>
      <div class="flex-1 overflow-y-auto">
        <div
          v-if="cartStore.groupItems.length === 0"
          class="h-full flex justify-center items-center"
        >
          <EmptyState message="Корзина пустая" />
        </div>
        <div v-else>
          <div class="mb-3 px-4"
               v-for="item in cartStore.groupItems"
               :key="item.id">
            <CartItem
              :item="item"
              :image-base-url="image_base_url"
              @increment="cartStore.addToCart(item.product_id)"
              @decrement="cartStore.deleteFromCart(item.id)"
              @remove="cartStore.deleteProductFromCart(item.product_id)"
            />
          </div>
        </div>
      </div>
      <div class="mt-auto">
        <div
          v-show="cartStore.groupItems.length !== 0"
          class="mt-8 flex p-4"
        >
          <h2 class="text-xl font-semibold">Итого: <span class="text-2xl font-bold">{{ cartStore.totalSum }}</span></h2>
        </div>
        <div class="flex pb-4 px-4" v-if="cartStore.groupItems.length > 0">
          <button
            class="bg-blue-600 px-6 py-3 font-semibold rounded-lg hover:bg-blue-500 transition-colors duration-200 cursor-pointer"
            @click="makeOrder()">
            Сделать заказ
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>

</style>
