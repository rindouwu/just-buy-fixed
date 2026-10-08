import order from "@/services/order.js"
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import getProducts from "@/services/products.js";

export const useOrderStore = defineStore("orderStore", () => {
  const items = ref([])
  const products = ref([])
  const loading = ref(false)
  const error = ref(false)
  const errorMessage = ref("")

  const getOrderList = async () => {
    const response = await order.getOrder()
    items.value = response.data
    return response.data
  }
  const createOrder = async () => {
    const response = await order.postOrder()
    return response.data
  }

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

  const groupOrderProducts = computed(() => {
    const orderItems = items.value
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
  })

  const searchProducts = (orderData) => {
    const groupList = Object.values(orderData.products)

    const fullProducts = groupList.map((item) => {
      const foundProduct = products.value.find(product => {
        return product.id === item.product
      })
      return {
        name: foundProduct?.name,
        product: item.product,
        quantity: item.quantity,
      }
    })
    return fullProducts
  }

  return {
    products,
    loading,
    error,
    errorMessage,
    getOrderList,
    createOrder,
    fetchProducts,
    groupOrderProducts,
    searchProducts,
    items,
  }
})
