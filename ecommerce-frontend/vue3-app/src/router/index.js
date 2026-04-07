/**
 * Vue Router 路由配置
 * 定义所有页面路由，包含登录守卫
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/products',
    name: 'ProductList',
    component: () => import('@/views/ProductList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
