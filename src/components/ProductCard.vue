<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart.js";
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { useToastStore } from "@/stores/toast.js"

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore();
const authStore = useAuthStore();
const toastStore = useToastStore();

const { isAuthenticated } = storeToRefs(authStore);

const isAddedToCart = computed(() => {
  return cartStore.items.some(item => item.product_id === props.product.id)
})

const addToCart = async (product_id) => {
  try {
    await cartStore.addToCart(product_id)
    toastStore.showToast("Продукт добавлен в корзину", "success")
  } catch {
    toastStore.showToast("Не удалось добавить товар", "error")
  }
}

const image_base_url = import.meta.env.VITE_IMAGE_BASE_URL;
</script>

<template>
  <div class="flex flex-col items-center py-5 rounded">
    <img
      v-if="product.image"
      :src="image_base_url + product.image"
      alt=""
      class="product-image rounded">
    <h3>{{ product.name }}</h3>
    <p class="text-zinc-400 w-60 h-auto line-clamp-3">{{ product.description }}</p>
    <p>Цена: {{ product.price }} &#8381;</p>
    <button
      class="bg-blue-600 hover:bg-blue-400 disabled:hover:bg-blue-600 w-50 h-10 rounded cursor-pointer mt-5 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      @click="addToCart(product.id)"
      v-show="isAuthenticated"
      :disabled="isAddedToCart">{{ !isAddedToCart ? "Добавить в корзину" : "В корзине" }}
    </button>
  </div>

</template>

<style scoped>
.product-image {
  width: 140px;
  height: 110px;
}
</style>
