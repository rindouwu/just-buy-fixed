<script setup>
import {ref, reactive, computed} from 'vue';
import { useRouter } from 'vue-router';
import useAuth from "@/services/auth.js";
import { useToastStore } from "@/stores/toast.js"

const form = reactive({
  fio: "",
  email: "",
  password: "",
})

const name = ref("")
const surname = ref("")
const patronymic = ref("")

const router = useRouter()
const toastStore = useToastStore()

const errorMessage = ref("")
const isSubmitting = ref(false);

const emailError = computed(() => {
  if(!form.email) return ""
  if(!form.email.includes("@")) return "Email должен содержать символ @"
  return ""
})

const passwordError = computed(() => {
  if(!form.password) return ""
  if(form.password.length < 6) return "Пароль должен быть не менее 6 символов"
  if(!/[A-Z]/.test(form.password)) return "Добавьте хотя бы одну заглавную букву"
  if(!/\d/.test(form.password)) return "Добавьте хотя бы одну цифру"
  return ""
})

const isFormValid = computed(() => {
  return (
    surname.value.trim() !== "" &&
    name.value.trim() !== "" &&
    patronymic.value.trim() !== "" &&
    form.email !== "" &&
    emailError.value === "" &&
    form.password !== "" &&
    passwordError.value === ""
  )
})

const handleSubmit = async () => {
  form.fio = `${surname.value} ${name.value} ${patronymic.value}`

  if(!isFormValid.value) {
    errorMessage.value = "Заполните все поля корректно."
    return
  }

  isSubmitting.value = true
  errorMessage.value = ""

  try {
    await useAuth.signup(form)
    toastStore.showToast("Регистрация успешна!", "success")
    router.push("/login")
  } catch (error) {
    errorMessage.value =
      error.errors?.email?.[0] ||
      error.errors?.password?.[0] ||
      error.errors?.fio?.[0] ||
      error.message
    toastStore.showToast(errorMessage.value, "error")
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="text-zinc-200 h-screen max-w-7xl mx-auto pt-5 flex flex-col items-center">
    <h1 class="mb-8 text-center text-4xl text-zinc-200">Регистрация</h1>
    <form
      class="flex flex-col items-center justify-center w-full max-w-md rounded-xl bg-zinc-900 p-8"
      @submit.prevent="handleSubmit"
    >
      <label class="font-medium text-zinc-300">Фамилия</label>
      <input
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        v-model="surname"
        type="text"
        placeholder="Фамилия"
      >
      <label class="font-medium text-zinc-300">Имя</label>
      <input
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        v-model="name"
        type="text"
        placeholder="Имя"
      >
      <label class="font-medium text-zinc-300">Отчество</label>
      <input
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        v-model="patronymic"
        type="text"
        placeholder="Отчество"
      >
      <label class="font-medium text-zinc-300">Ваша почта</label>
      <input
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        v-model="form.email"
        type="email"
        placeholder="example@mail.com"
      >
      <p class="text-red-400 text-lg" v-if="emailError">{{ emailError }}</p>
      <label class="font-medium text-zinc-300">Пароль</label>
      <input
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        v-model="form.password"
        type="password"
        placeholder="password"
      >
      <p class="text-red-400 text-lg" v-if="passwordError">{{ passwordError }}</p>
      <p class="text-red-400 text-sm" v-if="errorMessage">{{ errorMessage }}</p>
      <button
        class="bg-blue-600 mt-10 mt-5 px-6 py-2 font-semibold rounded-xl hover:bg-blue-500 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        :disabled="!isFormValid || isSubmitting"
      >
        Зарегистрироваться
      </button>
    </form>
  </section>
</template>
<style scoped>

</style>
