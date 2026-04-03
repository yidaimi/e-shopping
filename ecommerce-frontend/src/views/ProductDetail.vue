<template>
  <!-- 商品详情页面 -->
  <div>
    <div class="detail-container" v-if="product">
      <div class="detail-content">
        <!-- 商品图片 -->
        <div class="product-image">
          <img :src="product.imageUrl || 'https://via.placeholder.com/400x400?text=商品图片'" :alt="product.name" />
        </div>

        <!-- 商品信息 -->
        <div class="product-info">
          <h1 class="product-name">{{ product.name }}</h1>
          <p class="product-desc">{{ product.description }}</p>
          <div class="product-price">¥{{ product.price }}</div>
          <div class="product-stock">
            库存：<span :class="{ 'low-stock': product.stock <= 5 }">{{ product.stock }}</span> 件
          </div>

          <!-- 数量选择 -->
          <div class="quantity-row">
            <label>数量：</label>
            <input
              type="number"
              v-model.number="quantity"
              :min="1"
              :max="product.stock"
              @change="onQuantityChange" />
          </div>

          <!-- 加入购物车按钮 -->
          <button class="btn-add-cart" @click="addToCart">加入购物车</button>

          <!-- 操作结果提示 -->
          <div class="message success" v-if="message && !isError">{{ message }}</div>
          <div class="message error" v-if="message && isError">{{ message }}</div>
        </div>
      </div>
    </div>

    <!-- 加载中 / 商品不存在 -->
    <div class="empty-state" v-if="!product">
      <p>商品加载中...</p>
    </div>
  </div>
</template>

<script>
import { getProductById } from '@/api/product'
import { addToCart as addToCartApi } from '@/api/cart'
import { isLoggedIn } from '@/api/user'

export default {
  name: 'ProductDetail',
  data() {
    return {
      /** 商品信息 */
      product: null,
      /** 购买数量，默认为1 */
      quantity: 1,
      /** 操作提示信息 */
      message: '',
      /** 是否为错误信息 */
      isError: false
    }
  },
  watch: {
    /** 监听路由参数变化，加载对应商品 */
    '$route.params.id': {
      handler(id) {
        if (id) {
          this.loadProduct(Number(id))
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 加载商品详情
     * @param {number} id 商品ID
     */
    loadProduct(id) {
      getProductById(id).then(res => {
        if (res && res.data) {
          this.product = res.data
        }
      }).catch(() => {
        this.message = '商品加载失败'
        this.isError = true
      })
    },
    /** 数量变更时校验，确保不小于1 */
    onQuantityChange() {
      if (this.quantity < 1) {
        this.quantity = 1
      }
    },
    /**
     * 加入购物车
     * 先检查登录状态，未登录则跳转登录页；
     * 已登录则调用购物车接口添加商品
     */
    addToCart() {
      this.message = ''
      // 检查是否已登录
      if (!isLoggedIn()) {
        this.$router.push('/login')
        return
      }
      // 调用购物车接口添加商品
      addToCartApi(this.product.id, this.quantity).then(() => {
        this.message = '已加入购物车'
        this.isError = false
      }).catch(err => {
        const resp = err.response
        this.message = (resp && resp.data && resp.data.message) || '加入购物车失败'
        this.isError = true
      })
    }
  }
}
</script>

<style scoped>
.detail-container {
  max-width: 1000px;
  margin: 24px auto;
  padding: 0 16px;
}
.detail-content {
  display: flex;
  gap: 32px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 24px;
}
.product-image {
  flex-shrink: 0;
  width: 400px;
}
.product-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 4px;
  background: #f5f5f5;
}
.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.product-name {
  font-size: 24px;
  color: #333;
  margin: 0 0 12px 0;
}
.product-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
}
.product-price {
  font-size: 28px;
  color: #ff4d4f;
  font-weight: bold;
  margin-bottom: 12px;
}
.product-stock {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
}
.low-stock {
  color: #ff4d4f;
  font-weight: bold;
}
.quantity-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}
.quantity-row label {
  font-size: 14px;
  color: #555;
}
.quantity-row input {
  width: 80px;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
}
.btn-add-cart {
  width: 200px;
  padding: 12px;
  background: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-add-cart:hover {
  background: #40a9ff;
}
.message {
  margin-top: 12px;
  padding: 8px 12px;
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
.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #999;
  font-size: 16px;
}
</style>
