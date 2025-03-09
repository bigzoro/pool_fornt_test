import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    // component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    meta: {title: '用户登录'},
    component: () => import('@/views/Login.vue'),
  },
  {
    name: 'register',
    path: '/register',
    meta: {title: '用户注册'},
    component: () => import('@/views/Register.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
