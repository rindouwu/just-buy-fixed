<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth.js"
import authService from "@/services/auth.js"
import { useToastStore } from "@/stores/toast.js"

const form = reactive({
  email: "",
  password: ""
})

const router = useRouter()
const store = useAuthStore()
const toastStore = useToastStore()

const isSubmitting = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  if(form.email !== "" && form.password !== "" && form.password.length < 6) {
    errorMessage.value = "Password must be at least 6 characters"
    return
  }
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await authService.login(form)
    const token = response.data.user_token
    store.login(token)
    toastStore.showToast("Авторизация успешна!", "success")
    router.push("/")
  } catch(error) {
    errorMessage.value = error.message
    toastStore.showToast(error.message, "error")
  }

  isSubmitting.value = false
}

</script>

<template>
  <section class="text-zinc-200 h-screen max-w-7xl mx-auto pt-5 flex flex-col items-center">
    <h1 class="mb-8 text-center text-4xl text-zinc-200">Вход в аккаунт</h1>
    <form
      class="flex flex-col items-center justify-center w-full max-w-md rounded-xl bg-zinc-900 p-8"
      @submit.prevent="handleSubmit"
    >
      <label class="font-medium text-zinc-300">Email</label>
      <input
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        v-model="form.email"
        type="email"
        placeholder="example@mail.com"
      >
      <label class="font-medium text-zinc-300">Password</label>
      <input
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        v-model="form.password"
        type="password"
        placeholder="password"
      >
      <p class="text-red-400 text-sm" v-if="errorMessage">{{ errorMessage }}</p>
      <button
        class="bg-blue-600 mt-10 mt-5 px-6 py-2 font-semibold rounded-xl hover:bg-blue-500 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        :disabled="isSubmitting"
      >
        Войти
      </button>
    </form>
  </section>
</template>

<style scoped>

</style>
