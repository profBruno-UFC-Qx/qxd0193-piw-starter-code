import { createWebHistory, createRouter } from 'vue-router'

import PublicHome from '@/pages/PublicHome.vue'
import UserInDetails from '@/pages/UserInDetails.vue'
import LoginPage from '@/pages/LoginPage.vue'
import { useUserStore } from '@/stores/userStore'

const routes = [
  {
    path: '/',
    component: PublicHome,
    meta: { requiresAuth: true }
  },
  { path: '/users/:id', component: UserInDetails, meta: { requiresAuth: true } },
  { path: '/users/new', component: UserInDetails, meta: { requiresAuth: true } },
  { path: '/login', component: LoginPage }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return '/login'
  }
})
