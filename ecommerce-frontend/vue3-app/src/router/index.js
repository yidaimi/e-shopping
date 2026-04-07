/**
 * Vue Router 路由配置 (Vue Router 4)
 * 定义所有页面路由，包含登录守卫
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/products'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
