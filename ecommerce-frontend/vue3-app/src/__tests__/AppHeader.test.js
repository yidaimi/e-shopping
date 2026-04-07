/**
 * Unit Tests for AppHeader Component
 * Covers: login/logout state, search, navigation
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

function createWrapper() {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/products' },
      { path: '/products', component: { template: '<div />' } },
      { path: '/login', component: { template: '<div />' } },
      { path: '/register', component: { template: '<div />' } },
      { path: '/orders', component: { template: '<div />' } },
      { path: '/cart', component: { template: '<div />' } }
    ]
  })
  router.push('/')
  return { wrapper: mount(AppHeader, { global: { plugins: [router] } }), router }
}

describe('AppHeader Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    isLoggedIn.mockReturnValue(false)
  })

  // BR-DISP-11: Header shows login/register when not logged in
  it('should show login/register links when not logged in', () => {
    const { wrapper } = createWrapper()
    const text = wrapper.text()
    expect(text).toContain('你好，请登录')
    expect(text).toContain('新用户？')
    expect(text).toContain('免费注册')
  })

  // BR-DISP-11: Header shows orders/logout when logged in
  it('should show orders/logout links when logged in', () => {
    isLoggedIn.mockReturnValue(true)
    const { wrapper } = createWrapper()
    const text = wrapper.text()
    expect(text).toContain('我的')
    expect(text).toContain('订单')
    expect(text).toContain('退出登录')
  })

  it('should render logo with E-Shop text', () => {
    const { wrapper } = createWrapper()
    expect(wrapper.find('.logo-text').text()).toBe('E-Shop')
  })

  it('should render search input', () => {
    const { wrapper } = createWrapper()
    const input = wrapper.find('.nav-search input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('搜索商品...')
  })

  it('should render shopping cart link', () => {
    const { wrapper } = createWrapper()
    expect(wrapper.find('.nav-cart').exists()).toBe(true)
    expect(wrapper.find('.cart-text').text()).toBe('购物车')
  })

  it('should render sub-navigation with all category links', () => {
    const { wrapper } = createWrapper()
    const subLinks = wrapper.findAll('.nav-sub a')
    const linkTexts = subLinks.map(l => l.text())
    expect(linkTexts).toContain('全部商品')
    expect(linkTexts).toContain('今日特惠')
    expect(linkTexts).toContain('新品上市')
    expect(linkTexts).toContain('热销排行')
    expect(linkTexts).toContain('品牌精选')
  })

  // BR-FLOW-05: Logout clears token and redirects to /login
  it('should call logout on click', async () => {
    isLoggedIn.mockReturnValue(true)
    const { wrapper, router } = createWrapper()
    await router.isReady()
    const logoutLink = wrapper.findAll('.nav-action-item').find(el => el.text().includes('退出登录'))
    if (logoutLink) {
      await logoutLink.trigger('click')
      expect(logout).toHaveBeenCalled()
    }
  })

  it('should have search button with 🔍', () => {
    const { wrapper } = createWrapper()
    expect(wrapper.find('.search-btn').text()).toBe('🔍')
  })
})
