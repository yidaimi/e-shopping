/**
 * AppHeader Component Unit Tests
 * Tests: login/logout state display, search, navigation links, Vue 3 patterns
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

// Mock user API
vi.mock('@/api/user', () => ({
  isLoggedIn: vi.fn(() => false),
  logout: vi.fn()
}))

import { isLoggedIn, logout } from '@/api/user'

function createTestRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/products' },
      { path: '/products', component: { template: '<div />' } },
      { path: '/login', component: { template: '<div />' } },
      { path: '/register', component: { template: '<div />' } },
      { path: '/orders', component: { template: '<div />' } },
      { path: '/cart', component: { template: '<div />' } },
    ]
  })
}

describe('AppHeader.vue', () => {
  beforeEach(() => {
    vi.mocked(isLoggedIn).mockReturnValue(false)
    vi.mocked(logout).mockClear()
  })

  it('should render logo with E-Shop text', () => {
    const router = createTestRouter()
    const wrapper = mount(AppHeader, { global: { plugins: [router] } })
    expect(wrapper.find('.logo-text').text()).toBe('E-Shop')
    expect(wrapper.find('.logo-icon').text()).toBe('🛒')
  })

  it('should render search input', () => {
    const router = createTestRouter()
    const wrapper = mount(AppHeader, { global: { plugins: [router] } })
    expect(wrapper.find('.nav-search input').exists()).toBe(true)
    expect(wrapper.find('.nav-search input').attributes('placeholder')).toBe('搜索商品...')
  })

  it('should render search button', () => {
    const router = createTestRouter()
    const wrapper = mount(AppHeader, { global: { plugins: [router] } })
    expect(wrapper.find('.search-btn').text()).toBe('🔍')
  })

  // Business Rule: 未登录状态显示 "你好，请登录" 和 "新用户？免费注册"
  it('should show login and register links when not logged in', () => {
    vi.mocked(isLoggedIn).mockReturnValue(false)
    const router = createTestRouter()
    const wrapper = mount(AppHeader, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('你好，请登录')
    expect(wrapper.text()).toContain('新用户？')
    expect(wrapper.text()).toContain('免费注册')
  })

  // Business Rule: 已登录状态显示 "我的订单" 和 "退出登录"
  it('should show orders and logout links when logged in', () => {
    vi.mocked(isLoggedIn).mockReturnValue(true)
    const router = createTestRouter()
    const wrapper = mount(AppHeader, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('我的')
    expect(wrapper.text()).toContain('订单')
    expect(wrapper.text()).toContain('退出登录')
  })

  it('should render cart link', () => {
    const router = createTestRouter()
    const wrapper = mount(AppHeader, { global: { plugins: [router] } })
    expect(wrapper.find('.nav-cart').exists()).toBe(true)
    expect(wrapper.find('.cart-text').text()).toBe('购物车')
  })

  // Business Rule: 子导航栏标签链接
  it('should render sub-navigation links', () => {
    const router = createTestRouter()
    const wrapper = mount(AppHeader, { global: { plugins: [router] } })
    const navSub = wrapper.find('.nav-sub')
    expect(navSub.text()).toContain('全部商品')
    expect(navSub.text()).toContain('今日特惠')
    expect(navSub.text()).toContain('新品上市')
    expect(navSub.text()).toContain('热销排行')
    expect(navSub.text()).toContain('品牌精选')
  })
})
