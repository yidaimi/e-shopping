/**
 * Vue 应用入口文件
 * 初始化 Vue 实例，挂载路由和全局样式
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'

createApp(App).use(router).mount('#app')
