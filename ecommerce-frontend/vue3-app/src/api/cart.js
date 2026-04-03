/**
 * 购物车相关 API
 * 封装购物车查询、添加、修改数量、删除等接口
 */
import request from './request'

/**
 * 查询当前用户购物车
 * @returns {Promise} 包含购物车内容的响应
 */
export function getCart() {
  return request.get('/api/cart')
}

/**
 * 添加商品到购物车
 * @param {number} productId 商品ID
 * @param {number} quantity 数量
 * @returns {Promise} 操作结果
 */
export function addToCart(productId, quantity) {
  return request.post('/api/cart', { productId, quantity })
}

/**
 * 修改购物车商品数量
 * @param {number} cartItemId 购物车项ID
 * @param {number} quantity 新数量
 * @returns {Promise} 操作结果
 */
export function updateQuantity(cartItemId, quantity) {
  return request.put(`/api/cart/${cartItemId}`, { quantity })
}

/**
 * 删除购物车中的商品
 * @param {number} cartItemId 购物车项ID
 * @returns {Promise} 操作结果
 */
export function removeCartItem(cartItemId) {
  return request.delete(`/api/cart/${cartItemId}`)
}
