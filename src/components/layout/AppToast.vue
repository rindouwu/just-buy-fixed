<script setup>
import { useToastStore } from "@/stores/toast.js"

const toastStore = useToastStore()

</script>

<template>
  <Transition name="toast">
    <div
      v-if="toastStore.isShow"
      class="fixed top-5 right-5 z-51 w-80 rounded-xl p-4 shadow-lg"
      :class="{
        'bg-green-600': toastStore.type === 'success',
        'bg-red-600': toastStore.type === 'error'
      }">
      <div class="flex items-start justify-between gap-4">
        <h2 class="font-semibold text-white">
          {{ toastStore.type === "success" ? "Успешно" : "Ошибка" }}
        </h2>
        <p class="mt-1 text-sm text-white/90">
          {{ toastStore.message }}
        </p>
      </div>

      <button
        class="text-xl leading-none text-white/80 hover:text-white cursor-pointer"
        @click="toastStore.hideToast()">
        x
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all .3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
