/**
 * axios 请求实例配置
 * - 请求拦截器：自动添加 Authorization 头
 * - 响应拦截器：401 时清除 token 并跳转登录页
 */
import axios from 'axios'
import router from '@/router'

// 创建 axios 实例，baseURL 为空（通过 vite.config.ts 代理转发）
const request = axios.create({
  baseURL: '',
  timeout: 15000
})

// 请求拦截器：自动添加 JWT token
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器：处理 401 未授权
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response && error.response.status === 401) {
      // token 无效或过期，清除并跳转登录页
      localStorage.removeItem('token')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default request
