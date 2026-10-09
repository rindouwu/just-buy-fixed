<script setup>
import {ref, reactive, computed} from 'vue';
import { useRouter } from 'vue-router';
import useAuth from "@/services/authService.js";
import { useToastStore } from "@/stores/toast.js"
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue"

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
      <BaseInput
        id="reg-surname"
        label="Фамилия"
        v-model="surname"
        placeholder="Фамилия"
        :error="surnameError"
      />
      <BaseInput
        id="reg-name"
        label="Имя"
        v-model="name"
        placeholder="Имя"
        :error="nameError"
      />
      <BaseInput
        id="reg-patronymic"
        label="Отчество"
        v-model="patronymic"
        placeholder="Отчество"
        :error="patronymicError"
      />
      <BaseInput
        id="reg-email"
        label="Почта"
        v-model="form.email"
        type="email"
        placeholder="example@mail.com"
        :error="emailError"
      />
      <BaseInput
        id="reg-password"
        label="Пароль"
        v-model="form.password"
        type="password"
        placeholder="Пароль"
        :error="passwordError"
      />
      <p class="text-red-400 text-sm" v-if="errorMessage">{{ errorMessage }}</p>
      <BaseButton
        class="mt-8 px-6 py-2"
        type="submit"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Регистрация...' : 'Зарегистрироваться' }}
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
