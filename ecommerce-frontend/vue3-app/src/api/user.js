/**
 * 用户相关 API
 * 封装注册、登录、获取用户信息等接口
 */
import request from './request'

/** token 在 localStorage 中的存储键名 */
const TOKEN_KEY = 'token'

/**
 * 用户注册
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} email 邮箱
 * @returns {Promise} 包含用户ID的响应
 */
export function register(username, password, email) {
  return request.post('/api/user/register', { username, password, email })
}

/**
 * 用户登录
 * 登录成功后自动将 token 保存到 localStorage
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns {Promise} 包含 JWT token 的响应
 */
export function login(username, password) {
  return request.post('/api/user/login', { username, password }).then(res => {
    // 登录成功后将 token 保存到 localStorage
    if (res && res.data) {
      localStorage.setItem(TOKEN_KEY, res.data)
    }
    return res
  })
}

/**
 * 获取当前登录用户信息
 * @returns {Promise} 包含用户信息的响应
 */
export function getUserInfo() {
  return request.get('/api/user/info')
}

/**
 * 从 localStorage 获取 token
 * @returns {string|null} token 字符串，不存在则返回 null
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * 检查用户是否已登录
 * @returns {boolean} 是否存在有效 token
 */
export function isLoggedIn() {
  return !!getToken()
}

/**
 * 退出登录，清除 localStorage 中的 token
 */
export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}
