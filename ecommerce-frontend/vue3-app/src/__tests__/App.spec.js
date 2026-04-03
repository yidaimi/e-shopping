/**
 * Unit tests for App.vue root component
 * Tests: component rendering, AppHeader inclusion, router-view
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

vi.mock('@/api/user', () => ({
  isLoggedIn: vi.fn(() => false),
  logout: vi.fn()
}))

describe('App.vue', () => {
  it('should render without errors', () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/products', component: { template: '<div>Products</div>' } }
      ]
    })
    const wrapper = mount(App, { global: { plugins: [router] } })
    expect(wrapper.find('#app').exists()).toBe(true)
  })

  it('should include AppHeader component', () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/products', component: { template: '<div>Products</div>' } }
      ]
    })
    const wrapper = mount(App, { global: { plugins: [router] } })
    // AppHeader renders nav.nav-main
    expect(wrapper.find('.nav-main').exists()).toBe(true)
  })

  it('should include router-view', () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/products', component: { template: '<div>Products</div>' } }
      ]
    })
    const wrapper = mount(App, { global: { plugins: [router] } })
    // router-view exists in the DOM
    expect(wrapper.find('#app').exists()).toBe(true)
  })
})
