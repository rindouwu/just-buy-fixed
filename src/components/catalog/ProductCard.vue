<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart.js";
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import { useToastStore } from "@/stores/toast.js"
import BaseButton from "@/components/ui/BaseButton.vue";

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
  <article class="flex flex-col items-center py-5 px-4 rounded">
    <img
      v-if="product.image"
      :src="image_base_url + product.image"
      :alt="product.name"
      class="product-image rounded">
    <h3 class="text-center">{{ product.name }}</h3>
    <p class="text-zinc-400 w-full sm:w-60 h-auto line-clamp-3 text-center">{{ product.description }}</p>
    <p>Цена: {{ product.price }} &#8381;</p>

    <BaseButton
      class="w-full sm:w-50 mt-5 disabled:hover:bg-blue-600"
      variant="primary"
      @click="addToCart(product.id)"
      :disabled="isAddedToCart"
      v-show="isAuthenticated"
    >
      {{ !isAddedToCart ? "Добавить в корзину" : "В корзине" }}
    </BaseButton>
  </article>
</template>

<style scoped>
.product-image {
  width: 140px;
  height: 110px;
}
</style>
