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
const touched = ref(false)

const surnameError = computed(() => {
  if(!touched.value) return ""
  if(surname.value.trim() === "") return "Укажите фамилию"
  return ""
})

const nameError = computed(() => {
  if(!touched.value) return ""
  if(name.value.trim() === "") return "Укажите имя"
  return ""
})

const patronymicError = computed(() => {
  if(!touched.value) return ""
  if(patronymic.value.trim() === "") return "Укажите отчество"
  return ""
})

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
  touched.value = true
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
  <section class="text-zinc-200 min-h-screen max-w-7xl mx-auto pt-5 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
    <h1 class="mb-8 text-center text-3xl sm:text-4xl text-zinc-200">Регистрация</h1>
    <form
      class="flex flex-col w-full max-w-md rounded-xl bg-zinc-900 p-6 sm:p-8"
      @submit.prevent="handleSubmit"
    >
      <label for="reg-surname" class="font-medium text-zinc-300">Фамилия</label>
      <input
        id="reg-surname"
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1"
        :class="surnameError
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-zinc-500 focus:border-blue-500 focus:ring-blue-500'"
        v-model="surname"
        type="text"
        placeholder="Фамилия"
      >
      <p class="text-red-400 text-sm mt-1" v-if="surnameError">{{ surnameError }}</p>
      <label for="reg-name" class="font-medium text-zinc-300">Имя</label>
      <input
        id="reg-name"
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1"
        :class="nameError
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-zinc-500 focus:border-blue-500 focus:ring-blue-500'"
        v-model="name"
        type="text"
        placeholder="Имя"
      >
      <p class="text-red-400 text-sm mt-1" v-if="nameError">{{ nameError }}</p>
      <label for="reg-patronymic" class="font-medium text-zinc-300">Отчество</label>
      <input
        id="reg-patronymic"
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1"
        :class="patronymicError
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-zinc-500 focus:border-blue-500 focus:ring-blue-500'"
        v-model="patronymic"
        type="text"
        placeholder="Отчество"
      >
      <p class="text-red-400 text-sm mt-1" v-if="patronymicError">{{ patronymicError }}</p>
      <label for="reg-email" class="font-medium text-zinc-300">Ваша почта</label>
      <input
        id="reg-email"
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1"
        :class="emailError
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-zinc-500 focus:border-blue-500 focus:ring-blue-500'"
        v-model="form.email"
        type="email"
        placeholder="example@mail.com"
      >
      <p class="text-red-400 text-sm" v-if="emailError">{{ emailError }}</p>
      <label for="reg-password" class="font-medium text-zinc-300">Пароль</label>
      <input
        id="reg-password"
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1"
        :class="passwordError
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-zinc-500 focus:border-blue-500 focus:ring-blue-500'"
        v-model="form.password"
        type="password"
        placeholder="password"
      >
      <p class="text-red-400 text-sm" v-if="passwordError">{{ passwordError }}</p>
      <p class="text-red-400 text-sm" v-if="errorMessage">{{ errorMessage }}</p>
      <button
        class="bg-blue-600 mt-8 px-6 py-2 font-semibold rounded-xl hover:bg-blue-500 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Регистрация...' : 'Зарегистрироваться' }}
      </button>
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
