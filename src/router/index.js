import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '@/views/CatalogView.vue'
import LoginView from '@/views/LoginView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import CartDrawer from "@/components/CartDrawer.vue";
import OrdersView from '@/views/OrdersView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: CatalogView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/signup',
    name: 'Registration',
    component: RegistrationView,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    components: {
      default: CatalogView,
      drawer: CartDrawer,
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrdersView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const token = localStorage.getItem('user_token')
  if(token == undefined || token == null || token == "undefined") {
    localStorage.removeItem('user_token')
  }
  if(to.meta.requiresAuth && !token) {
    return { path: '/login' }
  }
  if(to.meta.guestOnly && token) {
    return { path: '/' }
  }
})
export default router
