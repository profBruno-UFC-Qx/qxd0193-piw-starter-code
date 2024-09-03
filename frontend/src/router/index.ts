import { createWebHistory, createRouter } from 'vue-router'

import PublicHome from '@/pages/PublicHome.vue'
import UserInDetails from '@/pages/UserInDetails.vue'
import LoginPage from '@/pages/LoginPage.vue'

const routes = [
  { path: '/', component: PublicHome },
  { path: '/users/:id', component: UserInDetails },
  { path: '/login', component: LoginPage}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})