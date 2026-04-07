/**
 * Unit Tests for Login and Register Views
 * Covers: form rendering, validation, API calls, routing
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

// Mock user API
vi.mock('@/api/user', () => ({
  login: vi.fn(),
  register: vi.fn(),
  isLoggedIn: vi.fn(() => false),
  logout: vi.fn(),
  getToken: vi.fn(() => null),
  getUserInfo: vi.fn()
}))

import { login, register } from '@/api/user'

function createLoginWrapper() {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/products' },
      { path: '/login', component: Login },
      { path: '/register', component: { template: '<div />' } },
      { path: '/products', component: { template: '<div />' } }
    ]
  })
  router.push('/login')
  return { wrapper: mount(Login, { global: { plugins: [router] } }), router }
}

function createRegisterWrapper() {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/products' },
      { path: '/login', component: { template: '<div />' } },
      { path: '/register', component: Register },
      { path: '/products', component: { template: '<div />' } }
    ]
  })
  router.push('/register')
  return { wrapper: mount(Register, { global: { plugins: [router] } }), router }
}

describe('Login View', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render login form with correct title', () => {
    const { wrapper } = createLoginWrapper()
    expect(wrapper.find('h2').text()).toBe('用户登录')
  })

  it('should render username and password inputs', () => {
    const { wrapper } = createLoginWrapper()
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(2)
    expect(inputs[0].attributes('placeholder')).toBe('请输入用户名')
    expect(inputs[1].attributes('placeholder')).toBe('请输入密码')
    expect(inputs[1].attributes('type')).toBe('password')
  })

  it('should render login button', () => {
    const { wrapper } = createLoginWrapper()
    expect(wrapper.find('.btn-login').text()).toBe('登录')
  })

  it('should render register link', () => {
    const { wrapper } = createLoginWrapper()
    expect(wrapper.find('.link-text').text()).toContain('去注册')
  })

  // BR-FLOW-02: After successful login, redirect to /products
  it('should call login API on button click', async () => {
    login.mockResolvedValue({ data: 'token123' })
    const { wrapper, router } = createLoginWrapper()
    await router.isReady()

    await wrapper.find('input[type="text"]').setValue('testuser')
    await wrapper.find('input[type="password"]').setValue('testpass')
    await wrapper.find('.btn-login').trigger('click')
    await flushPromises()

    expect(login).toHaveBeenCalledWith('testuser', 'testpass')
  })

  it('should show error message on login failure', async () => {
    login.mockRejectedValue({ response: { data: { message: '用户名或密码错误' } } })
    const { wrapper } = createLoginWrapper()

    await wrapper.find('.btn-login').trigger('click')
    await flushPromises()

    expect(wrapper.find('.error-message').exists()).toBe(true)
  })

  it('should not show error message initially', () => {
    const { wrapper } = createLoginWrapper()
    expect(wrapper.find('.error-message').exists()).toBe(false)
  })
})

describe('Register View', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render register form with correct title', () => {
    const { wrapper } = createRegisterWrapper()
    expect(wrapper.find('h2').text()).toBe('用户注册')
  })

  it('should render username, password, and email inputs', () => {
    const { wrapper } = createRegisterWrapper()
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(3)
    expect(inputs[0].attributes('placeholder')).toBe('请输入用户名')
    expect(inputs[1].attributes('placeholder')).toBe('请输入密码')
    expect(inputs[2].attributes('placeholder')).toBe('请输入邮箱')
  })

  it('should render register button', () => {
    const { wrapper } = createRegisterWrapper()
    expect(wrapper.find('.btn-register').text()).toBe('注册')
  })

  it('should render login link', () => {
    const { wrapper } = createRegisterWrapper()
    expect(wrapper.find('.link-text').text()).toContain('去登录')
  })

  // BR-FLOW-01: After successful registration, show success message
  it('should call register API on button click', async () => {
    register.mockResolvedValue({ data: { id: 1 } })
    const { wrapper } = createRegisterWrapper()

    await wrapper.findAll('input')[0].setValue('newuser')
    await wrapper.findAll('input')[1].setValue('newpass')
    await wrapper.findAll('input')[2].setValue('test@test.com')
    await wrapper.find('.btn-register').trigger('click')
    await flushPromises()

    expect(register).toHaveBeenCalledWith('newuser', 'newpass', 'test@test.com')
  })

  it('should show success message after registration', async () => {
    register.mockResolvedValue({ data: { id: 1 } })
    const { wrapper } = createRegisterWrapper()

    await wrapper.find('.btn-register').trigger('click')
    await flushPromises()

    expect(wrapper.find('.success-message').text()).toContain('注册成功')
  })

  it('should show error message on registration failure', async () => {
    register.mockRejectedValue({ response: { data: { message: '用户名已存在' } } })
    const { wrapper } = createRegisterWrapper()

    await wrapper.find('.btn-register').trigger('click')
    await flushPromises()

    expect(wrapper.find('.error-message').exists()).toBe(true)
  })
})
