<template>
  <!-- 仿 Amazon 深色双层导航栏 -->
  <header>
    <!-- 主导航栏 -->
    <nav class="nav-main">
      <router-link class="nav-logo" to="/products">
        <span class="logo-icon">🛒</span>
        <span class="logo-text">E-Shop</span>
      </router-link>

      <!-- 搜索栏 -->
      <div class="nav-search">
        <input
          type="text"
          v-model="searchKeyword"
          placeholder="搜索商品..."
          @keyup.enter="onSearch" />
        <button class="search-btn" @click="onSearch">🔍</button>
      </div>

      <!-- 右侧功能区 -->
      <div class="nav-actions">
        <!-- 已登录状态 -->
        <template v-if="loggedIn">
          <router-link class="nav-action-item" to="/orders">
            <span class="action-line1">我的</span>
            <span class="action-line2">订单</span>
          </router-link>
          <a class="nav-action-item" @click="handleLogout" style="cursor:pointer">
            <span class="action-line1">你好</span>
            <span class="action-line2">退出登录</span>
          </a>
        </template>
        <!-- 未登录状态 -->
        <template v-else>
          <router-link class="nav-action-item" to="/login">
            <span class="action-line1">你好，请登录</span>
            <span class="action-line2">账户管理</span>
          </router-link>
          <router-link class="nav-action-item" to="/register">
            <span class="action-line1">新用户？</span>
            <span class="action-line2">免费注册</span>
          </router-link>
        </template>
        <router-link class="nav-cart" to="/cart">
          <span class="cart-icon">🛒</span>
          <span class="cart-text">购物车</span>
        </router-link>
      </div>
    </nav>

    <!-- 子导航栏 -->
    <div class="nav-sub">
      <router-link to="/products">全部商品</router-link>
      <router-link :to="{ path: '/products', query: { tag: 'TODAY_DEAL' } }">今日特惠</router-link>
      <router-link :to="{ path: '/products', query: { tag: 'NEW' } }">新品上市</router-link>
      <router-link :to="{ path: '/products', query: { tag: 'HOT' } }">热销排行</router-link>
      <router-link :to="{ path: '/products', query: { tag: 'BRAND' } }">品牌精选</router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { isLoggedIn, logout } from '@/api/user'

const router = useRouter()
const searchKeyword = ref('')

/** 计算属性：检查用户是否已登录 */
const loggedIn = computed(() => isLoggedIn())

/** 退出登录，清除 token 并跳转到登录页 */
function handleLogout() {
  logout()
  router.push('/login')
}

/** 搜索商品，通过路由查询参数传递关键词 */
function onSearch() {
  if (searchKeyword.value.trim()) {
    router.push({ path: '/products', query: { keyword: searchKeyword.value.trim() } })
  } else {
    router.push('/products')
  }
}
</script>

<style scoped>
.nav-main {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 60px;
  background: #131921;
  color: #fff;
  gap: 12px;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: #fff;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 3px;
  flex-shrink: 0;
}
.nav-logo:hover {
  border-color: #fff;
  text-decoration: none;
  color: #fff;
}
.logo-icon { font-size: 24px; }
.logo-text { font-size: 22px; font-weight: bold; letter-spacing: 1px; }

.nav-search {
  flex: 1;
  display: flex;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
}
.nav-search input {
  flex: 1;
  border: none;
  padding: 0 14px;
  font-size: 15px;
  outline: none;
  color: #111;
}
.search-btn {
  width: 48px;
  background: #FEBD69;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-btn:hover { background: #F3A847; }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
.nav-action-item {
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
  border: 1px solid transparent;
  border-radius: 3px;
  text-decoration: none;
  color: #fff;
  line-height: 1.2;
}
.nav-action-item:hover {
  border-color: #fff;
  text-decoration: none;
  color: #fff;
}
.action-line1 { font-size: 12px; color: #ccc; }
.action-line2 { font-size: 14px; font-weight: bold; }

.nav-cart {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  padding: 8px 10px;
  border: 1px solid transparent;
  border-radius: 3px;
  text-decoration: none;
  color: #fff;
}
.nav-cart:hover {
  border-color: #fff;
  text-decoration: none;
  color: #fff;
}
.cart-icon { font-size: 28px; }
.cart-text { font-size: 14px; font-weight: bold; margin-bottom: 2px; }

.nav-sub {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 38px;
  background: #232F3E;
  gap: 4px;
  overflow-x: auto;
}
.nav-sub a {
  color: #fff;
  font-size: 14px;
  padding: 6px 12px;
  border: 1px solid transparent;
  border-radius: 3px;
  white-space: nowrap;
  text-decoration: none;
}
.nav-sub a:hover {
  border-color: #fff;
  text-decoration: none;
  color: #fff;
}
</style>
