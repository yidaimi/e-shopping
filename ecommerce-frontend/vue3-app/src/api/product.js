/**
 * 商品相关 API
 * 封装商品列表查询、搜索、详情、标签筛选等接口
 */
import request from './request'

/**
 * 分页查询商品列表
 * @param {number} page 页码，从0开始
 * @param {number} size 每页大小
 * @returns {Promise} 包含分页结果的响应
 */
export function listProducts(page, size) {
  return request.get('/api/product/list', { params: { page, size } })
}

/**
 * 按关键词搜索商品
 * @param {string} keyword 搜索关键词
 * @param {number} page 页码，从0开始
 * @param {number} size 每页大小
 * @returns {Promise} 包含分页结果的响应
 */
export function searchProducts(keyword, page, size) {
  return request.get('/api/product/search', { params: { keyword, page, size } })
}

/**
 * 查询商品详情
 * @param {number} id 商品ID
 * @returns {Promise} 包含商品信息的响应
 */
export function getProductById(id) {
  return request.get(`/api/product/${id}`)
}

/**
 * 按标签分页查询商品
 * @param {string} tag 标签名称
 * @param {number} page 页码，从0开始
 * @param {number} size 每页大小
 * @returns {Promise} 包含分页结果的响应
 */
export function listByTag(tag, page, size) {
  return request.get(`/api/product/tag/${tag}`, { params: { page, size } })
}
