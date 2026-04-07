<template>
  <!-- 购物车页面 -->
  <div class="cart-container">
    <h2 class="cart-title">我的购物车</h2>

    <!-- 操作结果提示 -->
    <div class="message success" v-if="message && !isError">{{ message }}</div>
    <div class="message error" v-if="message && isError">{{ message }}</div>

    <!-- 购物车为空提示 -->
    <div class="empty-cart" v-if="!cart || !cart.items || cart.items.length === 0">
      <p>购物车是空的，快去挑选商品吧！</p>
      <button class="btn-primary" @click="goShopping">去购物</button>
    </div>

    <!-- 购物车商品列表 -->
    <div class="cart-content" v-if="cart && cart.items && cart.items.length > 0">
      <table class="cart-table">
        <thead>
          <tr>
            <th class="col-product">商品</th>
            <th class="col-price">单价</th>
            <th class="col-quantity">数量</th>
            <th class="col-subtotal">小计</th>
            <th class="col-action">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.items" :key="item.id">
            <td class="col-product">
              <div class="product-info">
                <img :src="item.productImageUrl || 'https://via.placeholder.com/60x60?text=商品'" :alt="item.productName" class="product-img" />
                <span class="product-name">{{ item.productName }}</span>
              </div>
            </td>
            <td class="col-price">¥{{ item.productPrice }}</td>
            <td class="col-quantity">
              <div class="quantity-control">
                <button class="btn-qty" @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">-</button>
                <input type="number" :value="item.quantity" @change="onQuantityChange(item, $event)" min="1" class="qty-input" />
                <button class="btn-qty" @click="increaseQuantity(item)">+</button>
              </div>
            </td>
            <td class="col-subtotal">¥{{ item.subtotal }}</td>
            <td class="col-action">
              <button class="btn-delete" @click="removeItem(item.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 底部结算栏 -->
      <div class="cart-footer">
        <div class="total-price">
          合计：<span class="price-value">¥{{ cart.totalPrice }}</span>
        </div>
        <button class="btn-submit" @click="submitOrder">提交订单</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCart, updateQuantity, removeCartItem } from '@/api/cart'
import { createOrder } from '@/api/order'

const router = useRouter()

/** 购物车数据，包含 items 和 totalPrice */
const cart = ref(null)
/** 操作提示信息 */
const message = ref('')
/** 是否为错误信息 */
const isError = ref(false)

/** 加载购物车数据 */
function loadCart() {
  getCart().then(res => {
    if (res && res.data) {
      cart.value = res.data
    }
  }).catch(err => {
    const resp = err.response
    message.value = (resp && resp.data && resp.data.message) || '加载购物车失败'
    isError.value = true
  })
}

/**
 * 修改购物车商品数量
 * @param {number} itemId 购物车项ID
 * @param {number} quantity 新数量
 */
function doUpdateQuantity(itemId, quantity) {
  if (quantity < 1) return
  message.value = ''
  updateQuantity(itemId, quantity).then(() => {
    loadCart()
  }).catch(err => {
    const resp = err.response
    message.value = (resp && resp.data && resp.data.message) || '修改数量失败'
    isError.value = true
  })
}

/** 数量输入框变更事件 */
function onQuantityChange(item, event) {
  const newQty = parseInt(event.target.value, 10)
  if (newQty && newQty >= 1) {
    doUpdateQuantity(item.id, newQty)
  }
}

/** 增加商品数量 */
function increaseQuantity(item) {
  doUpdateQuantity(item.id, item.quantity + 1)
}

/** 减少商品数量 */
function decreaseQuantity(item) {
  if (item.quantity > 1) {
    doUpdateQuantity(item.id, item.quantity - 1)
  }
}

/**
 * 删除购物车中的商品
 * @param {number} itemId 购物车项ID
 */
function removeItem(itemId) {
  message.value = ''
  removeCartItem(itemId).then(() => {
    message.value = '已从购物车中移除'
    isError.value = false
    loadCart()
  }).catch(err => {
    const resp = err.response
    message.value = (resp && resp.data && resp.data.message) || '删除失败'
    isError.value = true
  })
}

/** 提交订单，成功后跳转到订单列表页 */
function submitOrder() {
  message.value = ''
  createOrder().then(() => {
    router.push('/orders')
  }).catch(err => {
    const resp = err.response
    message.value = (resp && resp.data && resp.data.message) || '提交订单失败'
    isError.value = true
  })
}

/** 跳转到商品列表页 */
function goShopping() {
  router.push('/products')
}

// 组件创建时加载购物车（等效于 Vue 2 的 created 钩子）
loadCart()
</script>

<style scoped>
.cart-container {
  max-width: 1000px;
  margin: 24px auto;
  padding: 0 16px;
}
.cart-title {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}
.message {
  margin-bottom: 16px;
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 14px;
}
.message.success {
  color: #52c41a;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
}
.message.error {
  color: #ff4d4f;
  background: #fff2f0;
  border: 1px solid #ffccc7;
}
.empty-cart {
  text-align: center;
  padding: 60px 0;
  color: #999;
  font-size: 16px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
}
.empty-cart p {
  margin-bottom: 16px;
}
.btn-primary {
  padding: 10px 24px;
  background: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
.btn-primary:hover {
  background: #40a9ff;
}
.cart-content {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}
.cart-table {
  width: 100%;
  border-collapse: collapse;
}
.cart-table thead {
  background: #fafafa;
}
.cart-table th {
  padding: 14px 16px;
  text-align: center;
  font-size: 14px;
  color: #666;
  font-weight: 500;
  border-bottom: 1px solid #eee;
}
.cart-table td {
  padding: 16px;
  text-align: center;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}
.col-product {
  text-align: left !important;
  width: 35%;
}
.col-price { width: 15%; }
.col-quantity { width: 20%; }
.col-subtotal { width: 15%; }
.col-action { width: 15%; }
.product-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.product-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  background: #f5f5f5;
}
.product-name {
  font-size: 14px;
  color: #333;
}
.quantity-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.btn-qty {
  width: 28px;
  height: 28px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-qty:hover:not(:disabled) {
  border-color: #1890ff;
  color: #1890ff;
}
.btn-qty:disabled {
  color: #d9d9d9;
  cursor: not-allowed;
}
.qty-input {
  width: 50px;
  height: 28px;
  text-align: center;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}
.qty-input::-webkit-inner-spin-button,
.qty-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.btn-delete {
  padding: 4px 12px;
  background: none;
  border: 1px solid #ff4d4f;
  color: #ff4d4f;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}
.btn-delete:hover {
  background: #ff4d4f;
  color: #fff;
}
.cart-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  padding: 20px 24px;
  border-top: 1px solid #eee;
  background: #fafafa;
}
.total-price {
  font-size: 16px;
  color: #333;
}
.price-value {
  font-size: 22px;
  color: #ff4d4f;
  font-weight: bold;
}
.btn-submit {
  padding: 12px 32px;
  background: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-submit:hover {
  background: #ff7875;
}
</style>
