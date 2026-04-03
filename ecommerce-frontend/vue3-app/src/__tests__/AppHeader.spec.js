/**
 * Unit tests for AppHeader component
 * Tests: search functionality, login/logout state, navigation links
 * Business rules: BR-AUTH-08, BR-VAL-02, BR-WORK-03
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
      { path: '/products', component: { template: '<div>Products</div>' } },
      { path: '/login', component: { template: '<div>Login</div>' } },
      { path: '/register', component: { template: '<div>Register</div>' } },
      { path: '/orders', component: { template: '<div>Orders</div>' } },
      { path: '/cart', component: { template: '<div>Cart</div>' } }
    ]
  })
}

describe('AppHeader.vue', () => {
  let router

  beforeEach(() => {
    router = createTestRouter()
    vi.mocked(isLoggedIn).mockReturnValue(false)
    vi.mocked(logout).mockClear()
  })

  it('should display logo with E-Shop text', () => {
    const wrapper = mount(AppHeader, { global: { plugins: [router] } })
    expect(wrapper.find('.logo-text').text()).toBe('E-Shop')
    expect(wrapper.find('.logo-icon').text()).toBe('🛒')
  })

  it('should display search input with placeholder "搜索商品..."', () => {
    const wrapper = mount(AppHeader, { global: { plugins: [router] } })
    const input = wrapper.find('.nav-search input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('搜索商品...')
  })

  it('should show login/register links when not logged in', () => {
    vi.mocked(isLoggedIn).mockReturnValue(false)
    const wrapper = mount(AppHeader, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('你好，请登录')
    expect(wrapper.text()).toContain('免费注册')
  })

  it('should show orders/logout links when logged in', () => {
    vi.mocked(isLoggedIn).mockReturnValue(true)
    const wrapper = mount(AppHeader, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('我的')
    expect(wrapper.text()).toContain('订单')
    expect(wrapper.text()).toContain('退出登录')
  })

  it('should display sub-navigation with all tag links', () => {
    const wrapper = mount(AppHeader, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('全部商品')
    expect(wrapper.text()).toContain('今日特惠')
    expect(wrapper.text()).toContain('新品上市')
    expect(wrapper.text()).toContain('热销排行')
    expect(wrapper.text()).toContain('品牌精选')
  })

  it('should display cart link with 🛒 icon and text', () => {
    const wrapper = mount(AppHeader, { global: { plugins: [router] } })
    expect(wrapper.find('.cart-icon').text()).toBe('🛒')
    expect(wrapper.find('.cart-text').text()).toBe('购物车')
  })
})
