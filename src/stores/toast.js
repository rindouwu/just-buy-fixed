import { defineStore } from "pinia";
import {ref} from "vue";

export const useToastStore = defineStore("toast", () => {
  const message = ref(null)
  const type = ref(null)
  const isShow = ref(false)

  const showToast = (newMessage, newType) => {
    message.value = newMessage
    type.value = newType
    isShow.value = true

    setTimeout(() => {
      isShow.value = false
    }, 3000)
  }

  const hideToast = () => {
    isShow.value = false
  }

  return {
    message,
    type,
    isShow,
    showToast,
    hideToast,
  }
})
