<template>
  <!-- 商品列表页面 - 仿 Amazon 首页风格 -->
  <div class="home-container">
    <!-- 顶部 Banner 轮播区（无搜索和标签时显示） -->
    <div class="hero-banner" v-if="!keyword && !tag">
      <div class="hero-content">
        <h1>欢迎来到 E-Shop</h1>
        <p>发现海量好物，享受极致购物体验</p>
      </div>
      <div class="hero-overlay"></div>
    </div>

    <!-- 搜索结果提示 -->
    <div class="search-result-hint" v-if="keyword">
      <span>搜索 "<strong>{{ keyword }}</strong>" 的结果</span>
      <span class="result-count">共 {{ total }} 件商品</span>
    </div>

    <!-- 标签筛选提示 -->
    <div class="search-result-hint" v-if="tag && !keyword">
      <span>{{ tagLabel }}</span>
      <span class="result-count">共 {{ total }} 件商品</span>
    </div>

    <!-- 商品网格 -->
    <div class="section" v-if="products.length > 0">
      <h2 class="section-title" v-if="!keyword && !tag">为你推荐</h2>
      <div class="product-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product" />
      </div>
    </div>

    <!-- 空状态 -->
    <div class="empty-state" v-if="products.length === 0 && !loading">
      <div class="empty-icon">📦</div>
      <p>暂无商品数据</p>
    </div>

    <!-- 加载中 -->
    <div class="loading-state" v-if="loading">
      <p>加载中...</p>
    </div>

    <!-- 分页 -->
    <Pagination
      v-if="total > pageSize"
      :current-page="currentPage"
      :total="total"
      :page-size="pageSize"
      @page-change="onPageChange" />
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import Pagination from '@/components/Pagination.vue'
import { listProducts, searchProducts, listByTag } from '@/api/product'

export default {
  name: 'ProductList',
  components: { ProductCard, Pagination },
  data() {
    return {
      /** 商品列表 */
      products: [],
      /** 当前页码（从0开始） */
      currentPage: 0,
      /** 每页大小 */
      pageSize: 12,
      /** 商品总数 */
      total: 0,
      /** 搜索关键词 */
      keyword: '',
      /** 标签筛选 */
      tag: '',
      /** 标签显示文本 */
      tagLabel: '',
      /** 是否加载中 */
      loading: false
    }
  },
  watch: {
    /**
     * 监听路由查询参数变化
     * 当从 Header 搜索栏或分类导航传入参数时，重新加载商品
     */
    '$route.query': {
      handler(query) {
        this.keyword = query.keyword || ''
        this.tag = query.tag || ''
        this.tagLabel = this.getTagLabel(this.tag)
        this.currentPage = 0
        this.loadProducts()
      },
      immediate: true
    }
  },
  methods: {
    /** 根据标签获取显示文本 */
    getTagLabel(tag) {
      const labels = {
        'TODAY_DEAL': '🔥 今日特惠',
        'NEW': '✨ 新品上市',
        'HOT': '🏆 热销排行',
        'BRAND': '💎 品牌精选'
      }
      return labels[tag] || ''
    },
    /** 加载商品列表（支持搜索、标签筛选、普通列表） */
    loadProducts() {
      this.loading = true
      let request

      if (this.keyword.trim()) {
        request = searchProducts(this.keyword.trim(), this.currentPage, this.pageSize)
      } else if (this.tag) {
        request = listByTag(this.tag, this.currentPage, this.pageSize)
      } else {
        request = listProducts(this.currentPage, this.pageSize)
      }

      request.then(res => {
        if (res && res.data) {
          this.products = res.data.list || []
          this.total = res.data.total || 0
        }
        this.loading = false
      }).catch(() => {
        this.products = []
        this.total = 0
        this.loading = false
      })
    },
    /**
     * 分页切换
     * @param {number} page 目标页码
     */
    onPageChange(page) {
      this.currentPage = page
      this.loadProducts()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.home-container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 16px 40px;
}

/* Banner 区域 */
.hero-banner {
  position: relative;
  height: 300px;
  background: linear-gradient(135deg, #232F3E 0%, #37475A 50%, #485769 100%);
  border-radius: 0 0 4px 4px;
  margin: 0 -16px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero-content {
  text-align: center;
  color: #fff;
  z-index: 2;
  padding: 20px;
}
.hero-content h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
.hero-content p {
  font-size: 18px;
  color: rgba(255,255,255,0.85);
}
.hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('https://picsum.photos/seed/banner/1500/300') center/cover;
  opacity: 0.2;
}

/* 搜索结果提示 */
.search-result-hint {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  font-size: 16px;
  color: #0F1111;
  border-bottom: 1px solid #DDD;
  margin-bottom: 20px;
}
.search-result-hint strong { color: #C7511F; }
.result-count { color: #565959; font-size: 14px; }

/* 商品区域 */
.section {
  margin-bottom: 30px;
}
.section-title {
  font-size: 21px;
  font-weight: 700;
  color: #0F1111;
  padding: 16px 0 12px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 80px 0;
  color: #565959;
}
.empty-icon { font-size: 64px; margin-bottom: 16px; }
.empty-state p { font-size: 18px; }

.loading-state {
  text-align: center;
  padding: 40px;
  color: #565959;
  font-size: 16px;
}
</style>
