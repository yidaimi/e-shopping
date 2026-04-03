/**
 * 订单相关 API
 * 封装订单创建、列表查询、详情查询等接口
 */
import request from './request'

/**
 * 创建订单（根据当前用户购物车内容）
 * @returns {Promise} 包含新订单ID的响应
 */
export function createOrder() {
  return request.post('/api/order', {})
}

/**
 * 查询当前用户订单列表
 * @returns {Promise} 包含订单列表的响应
 */
export function listOrders() {
  return request.get('/api/order/list')
}

/**
 * 查询订单详情
 * @param {number} id 订单ID
 * @returns {Promise} 包含订单详情的响应
 */
export function getOrderById(id) {
  return request.get(`/api/order/${id}`)
}
