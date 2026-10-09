<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { useToastStore } from "@/stores/toast.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import AppToast from "@/components/layout/AppToast.vue"
import BaseButton from "@/components/ui/BaseButton.vue";

const authStore = useAuthStore();
const router = useRouter();
const toastStore = useToastStore();

const { isAuthenticated } = storeToRefs(authStore);

const logoutAction = async () => {
  try {
    await authStore.logout();
    toastStore.showToast("Выход из аккаунта", "success");
    router.push('/')
  } catch {
    toastStore.showToast("Ошибка выхода", "error")
  }
}
</script>

<template>
  <header class="bg-zinc-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20 text-zinc-100">
      <RouterLink :to="{name:'Catalog'}" class="font-semibold shrink-0 hover:text-zinc-300 transition-colors duration-200">
        Просто купить
      </RouterLink>

      <nav class="flex items-center gap-3 sm:gap-6 text-sm sm:text-base">
        <RouterLink class="text-zinc-200 hover:text-zinc-400 transition-colors duration-200"
                    :to="{name:'Login'}"
                    v-show="!isAuthenticated">Войти</RouterLink>
        <RouterLink class="text-zinc-200 hover:text-zinc-400 transition-colors duration-200"
                    :to="{name:'Registration'}"
                    v-show="!isAuthenticated">Регистрация</RouterLink>
        <RouterLink class="text-zinc-200 hover:text-zinc-400 transition-colors duration-200"
                    :to="{name:'Cart'}"
                    v-show="isAuthenticated">Корзина</RouterLink>
        <RouterLink class="text-zinc-200 hover:text-zinc-400 transition-colors duration-200"
                    :to="{name:'Orders'}"
                    v-show="isAuthenticated">Заказы</RouterLink>
        <BaseButton
          class="px-3 sm:px-5 h-9 sm:h-10 rounded-2xl text-sm sm:text-base"
          @click="logoutAction()"
          v-show="isAuthenticated">
            Выйти
        </BaseButton>
      </nav>
    </div>
  </header>

  <AppToast/>

  <main class="bg-zinc-950">

    <router-view v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </main>

  <router-view name="drawer" v-slot="{ Component }">
    <Transition name="cart-drawer" :duration="300">
      <component :is="Component" />
    </Transition>

  </router-view>
</template>

<style>

.page-enter-active,
.page-leave-active {
  transition: opacity .25s ease, transform .25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.cart-drawer-enter-active .cart-overlay,
.cart-drawer-leave-active .cart-overlay {
  transition: opacity 0.3s ease-in-out;
}
.cart-drawer-enter-from .cart-overlay,
.cart-drawer-leave-to .cart-overlay {
  opacity: 0;
}
.cart-drawer-enter-active aside,
.cart-drawer-leave-active aside {
  transition: transform 0.3s ease-out;
}

.cart-drawer-enter-from aside,
.cart-drawer-leave-to aside {
  transform: translateX(100%);
}
</style>
