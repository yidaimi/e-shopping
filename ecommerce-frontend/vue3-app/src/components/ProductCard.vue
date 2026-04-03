<template>
  <!-- 商品卡片组件 - 仿 Amazon 风格 -->
  <div class="card" @click="goToDetail">
    <div class="card-img">
      <img :src="product.imageUrl" :alt="product.name"
           @error="onImgError" />
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ product.name }}</h3>
      <p class="card-desc">{{ product.description }}</p>
      <div class="card-rating">
        <span class="stars">★★★★☆</span>
        <span class="rating-count">{{ product.stock }} 件有货</span>
      </div>
      <div class="card-price">
        <span class="price-symbol">¥</span>
        <span class="price-whole">{{ getWhole(product.price) }}</span>
        <span class="price-decimal">.{{ getDecimal(product.price) }}</span>
      </div>
      <div class="card-delivery">免费配送</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  /** 商品数据对象 */
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()

/** 跳转到商品详情页 */
function goToDetail() {
  router.push(`/product/${props.product.id}`)
}

/** 获取价格整数部分 */
function getWhole(price) {
  return Math.floor(price).toLocaleString()
}

/** 获取价格小数部分 */
function getDecimal(price) {
  return (price % 1).toFixed(2).substring(2)
}

/** 图片加载失败时使用默认图片 */
function onImgError(e) {
  e.target.src = 'https://picsum.photos/seed/default/400/400'
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  padding: 16px;
  transition: box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
}
.card-img {
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.card-img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
}
.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.card-title {
  font-size: 14px;
  color: #0F1111;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-title:hover {
  color: #C7511F;
}
.card-desc {
  font-size: 12px;
  color: #565959;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.stars { color: #DE7921; font-size: 14px; }
.rating-count { font-size: 12px; color: #007185; }
.card-price {
  display: flex;
  align-items: flex-start;
  margin-bottom: 4px;
}
.price-symbol { font-size: 13px; margin-top: 2px; }
.price-whole { font-size: 28px; font-weight: 400; line-height: 1; }
.price-decimal { font-size: 13px; margin-top: 2px; }
.card-delivery {
  font-size: 12px;
  color: #565959;
  margin-top: auto;
}
</style>
