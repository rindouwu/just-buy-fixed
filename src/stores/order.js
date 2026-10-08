import order from "@/services/order.js"
import {defineStore} from "pinia";
import {ref} from "vue";

export const useOrderStore = defineStore("orderStore", () => {
  const items = ref([])

  const getOrderList = async () => {
    const response = await order.getOrder()
    items.value = response.data
    return response.data
  }
  const createOrder = async () => {
    const response = await order.postOrder()
    return response.data
  }
  return {
    getOrderList,
    createOrder,
    items,
  }
})
