/**
 * Login and Register Component Unit Tests
 * Tests: form rendering, auth flow, error/success display, navigation
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

// Mock user API
vi.mock('@/api/user', () => ({
  login: vi.fn(),
  register: vi.fn(),
  isLoggedIn: vi.fn(() => false),
  logout: vi.fn(),
  getToken: vi.fn(),
  getUserInfo: vi.fn()
}))

import { login, register } from '@/api/user'

function createTestRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/products' },
      { path: '/products', component: { template: '<div />' } },
      { path: '/login', component: { template: '<div />' } },
      { path: '/register', component: { template: '<div />' } },
    ]
  })
}

describe('Login.vue', () => {
  beforeEach(() => {
    vi.mocked(login).mockClear()
  })

  it('should render login form with title', () => {
    const router = createTestRouter()
    const wrapper = mount(Login, { global: { plugins: [router] } })
    expect(wrapper.find('h2').text()).toBe('用户登录')
  })

  it('should render username and password inputs', () => {
    const router = createTestRouter()
    const wrapper = mount(Login, { global: { plugins: [router] } })
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(2)
    expect(inputs[0].attributes('placeholder')).toBe('请输入用户名')
    expect(inputs[1].attributes('placeholder')).toBe('请输入密码')
    expect(inputs[1].attributes('type')).toBe('password')
  })

  it('should render login button', () => {
    const router = createTestRouter()
    const wrapper = mount(Login, { global: { plugins: [router] } })
    expect(wrapper.find('.btn-login').text()).toBe('登录')
  })

  it('should render register link', () => {
    const router = createTestRouter()
    const wrapper = mount(Login, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('没有账号？')
    expect(wrapper.text()).toContain('去注册')
  })

  it('should not show error message initially', () => {
    const router = createTestRouter()
    const wrapper = mount(Login, { global: { plugins: [router] } })
    expect(wrapper.find('.error-message').exists()).toBe(false)
  })

  // Business Rule: 登录失败显示红色错误提示
  it('should show error on login failure', async () => {
    vi.mocked(login).mockRejectedValue({ response: { data: { message: '用户名或密码错误' } } })
    const router = createTestRouter()
    const wrapper = mount(Login, { global: { plugins: [router] } })
    await wrapper.find('input[type="text"]').setValue('testuser')
    await wrapper.find('input[type="password"]').setValue('wrong')
    await wrapper.find('.btn-login').trigger('click')
    await vi.dynamicImportSettled()
    await wrapper.vm.$nextTick()
    // Wait for promise rejection
    await new Promise(r => setTimeout(r, 10))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.error-message').exists()).toBe(true)
  })
})

describe('Register.vue', () => {
  beforeEach(() => {
    vi.mocked(register).mockClear()
  })

  it('should render register form with title', () => {
    const router = createTestRouter()
    const wrapper = mount(Register, { global: { plugins: [router] } })
    expect(wrapper.find('h2').text()).toBe('用户注册')
  })

  it('should render username, password, and email inputs', () => {
    const router = createTestRouter()
    const wrapper = mount(Register, { global: { plugins: [router] } })
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(3)
    expect(inputs[0].attributes('placeholder')).toBe('请输入用户名')
    expect(inputs[1].attributes('placeholder')).toBe('请输入密码')
    expect(inputs[2].attributes('placeholder')).toBe('请输入邮箱')
  })

  it('should render register button', () => {
    const router = createTestRouter()
    const wrapper = mount(Register, { global: { plugins: [router] } })
    expect(wrapper.find('.btn-register').text()).toBe('注册')
  })

  it('should render login link', () => {
    const router = createTestRouter()
    const wrapper = mount(Register, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('已有账号？')
    expect(wrapper.text()).toContain('去登录')
  })

  it('should not show error or success messages initially', () => {
    const router = createTestRouter()
    const wrapper = mount(Register, { global: { plugins: [router] } })
    expect(wrapper.find('.error-message').exists()).toBe(false)
    expect(wrapper.find('.success-message').exists()).toBe(false)
  })
})
