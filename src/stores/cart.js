import { defineStore } from 'pinia'
import cart from "@/services/cart.js"
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const errorMessage = ref(null)
  const loading = ref(false)

  const loadCart = async () => {
    try {
      loading.value = true
      const response = await cart.getCart()
      items.value = response.data
    } catch (error) {
      errorMessage.value = error.message
    } finally {
      loading.value = false
    }
  }
  const groupItems = computed(() => {
    return Object.values(
      items.value.reduce((acc, item) => {
        const productId = item.product_id;
        if(!acc[productId]) {
          acc[productId] = {
            ...item,
            quantity: 1,
            cart_id: [item.id]
          }
        } else {
          acc[productId].cart_id.push(item.id)
          acc[productId].quantity += 1
        }
        return acc
      }, {})
    )
  })
  const addToCart = async (product_id) => {
    await cart.addProductToCart(product_id)
    await loadCart()
  }
  const deleteFromCart = async (id) => {
    await cart.deleteProductFromCart(id)
    await loadCart()
  }
  const deleteProductFromCart = async (product_id) => {
    const targetProduct = groupItems.value.find(
      item => item.product_id === product_id
    )
    for(let i = 0; i < targetProduct.cart_id.length; i++) {
      await cart.deleteProductFromCart(targetProduct.cart_id[i])
    }

    await loadCart()
  }
  const totalSum = computed(() => {
    let total = 0
    for(let i = 0; i < groupItems.value.length; i++) {
      total += groupItems.value[i].quantity*groupItems.value[i].price
    }
    return total
  })


  return {
    items,
    loadCart,
    groupItems,
    errorMessage,
    addToCart,
    deleteFromCart,
    deleteProductFromCart,
    totalSum,
    loading
  }
})
