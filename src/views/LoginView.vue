<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth.js"
import authService from "@/services/auth.js"
import { useToastStore } from "@/stores/toast.js"
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";

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
  if(!form.email || !form.password) {
    errorMessage.value = "Заполните все поля"
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
  <section class="text-zinc-200 min-h-screen max-w-7xl mx-auto pt-5 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
    <h1 class="mb-8 text-center text-3xl sm:text-4xl text-zinc-200">Вход в аккаунт</h1>
    <form
      class="flex flex-col w-full max-w-md rounded-xl bg-zinc-900 p-6 sm:p-8"
      @submit.prevent="handleSubmit"
    >
      <BaseInput
        id="login-email"
        label="Почта"
        v-model="form.email"
        type="email"
        placeholder="example@mail.com"
        :error="errorMessage"
        />
      <BaseInput
        id="login-password"
        label="Пароль"
        v-model="form.password"
        type="password"
        placeholder="Пароль"
        :error="errorMessage"
      />
      <BaseButton
        class="mt-8 px-6 py-2"
        type="submit"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Вход...' : 'Войти' }}
      </BaseButton>
      <RouterLink
        to="/"
        class="mt-4 self-center text-sm text-zinc-400 hover:text-zinc-200 transition-colors duration-200"
      >
        Назад в каталог
      </RouterLink>
    </form>
  </section>
</template>

<style scoped>

</style>
