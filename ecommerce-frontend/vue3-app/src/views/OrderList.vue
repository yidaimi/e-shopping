<template>
  <!-- 订单列表页面 -->
  <div class="order-list-container">
    <h2 class="page-title">我的订单</h2>

    <!-- 订单为空提示 -->
    <div class="empty-orders" v-if="orders.length === 0">
      <p>暂无订单记录</p>
      <button class="btn-primary" @click="goShopping">去购物</button>
    </div>

    <!-- 订单列表 -->
    <div class="order-list" v-if="orders.length > 0">
      <div
        class="order-card"
        v-for="order in orders"
        :key="order.id"
        @click="goToDetail(order.id)">
        <div class="order-header">
          <span class="order-id">订单编号：{{ order.id }}</span>
          <span class="order-status" :class="'status-' + order.status">{{ order.status }}</span>
        </div>
        <div class="order-body">
          <div class="order-info">
            <span class="order-amount">¥{{ order.totalAmount }}</span>
            <span class="order-time">{{ order.createdAt }}</span>
          </div>
          <span class="order-arrow">›</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { listOrders } from '@/api/order'

const router = useRouter()

/** 订单列表数据 */
const orders = ref([])

/** 加载订单列表 */
function loadOrders() {
  listOrders().then(res => {
    if (res && res.data) {
      orders.value = res.data
    }
  }).catch(() => {
    orders.value = []
  })
}

/**
 * 跳转到订单详情页
 * @param {number} orderId 订单ID
 */
function goToDetail(orderId) {
  router.push(`/order/${orderId}`)
}

/** 跳转到商品列表页 */
function goShopping() {
  router.push('/products')
}

// 组件创建时加载订单列表（等效于 Vue 2 的 created 钩子）
loadOrders()
</script>

<style scoped>
.order-list-container {
  max-width: 800px;
  margin: 24px auto;
  padding: 0 16px;
}
.page-title {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}
.empty-orders {
  text-align: center;
  padding: 60px 0;
  color: #999;
  font-size: 16px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
}
.empty-orders p {
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
.order-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.order-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px 20px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.order-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.order-id {
  font-size: 14px;
  color: #666;
}
.order-status {
  font-size: 13px;
  padding: 2px 10px;
  border-radius: 4px;
  font-weight: 500;
}
.status-CREATED {
  color: #1890ff;
  background: #e6f7ff;
}
.status-PAID {
  color: #52c41a;
  background: #f6ffed;
}
.status-CANCELLED {
  color: #999;
  background: #f5f5f5;
}
.order-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-info {
  display: flex;
  align-items: center;
  gap: 24px;
}
.order-amount {
  font-size: 18px;
  color: #ff4d4f;
  font-weight: bold;
}
.order-time {
  font-size: 13px;
  color: #999;
}
.order-arrow {
  font-size: 20px;
  color: #ccc;
}
</style>
