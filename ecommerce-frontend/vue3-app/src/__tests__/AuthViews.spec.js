/**
 * Unit tests for Login and Register views
 * Tests: form rendering, text content, error/success messages
 * Business rules: BR-AUTH-02, BR-WORK-01, BR-WORK-02
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

vi.mock('@/api/user', () => ({
  login: vi.fn(),
  register: vi.fn(),
  isLoggedIn: vi.fn(() => false),
  logout: vi.fn()
}))

function createTestRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/products' },
      { path: '/products', component: { template: '<div>Products</div>' } },
      { path: '/login', component: Login },
      { path: '/register', component: Register }
    ]
  })
}

describe('Login.vue', () => {
  it('should render login form with title "用户登录"', () => {
    const router = createTestRouter()
    const wrapper = mount(Login, { global: { plugins: [router] } })
    expect(wrapper.find('h2').text()).toBe('用户登录')
  })

  it('should have username and password inputs', () => {
    const router = createTestRouter()
    const wrapper = mount(Login, { global: { plugins: [router] } })
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(2)
    expect(inputs[0].attributes('placeholder')).toBe('请输入用户名')
    expect(inputs[1].attributes('placeholder')).toBe('请输入密码')
    expect(inputs[1].attributes('type')).toBe('password')
  })

  it('should have "登录" button', () => {
    const router = createTestRouter()
    const wrapper = mount(Login, { global: { plugins: [router] } })
    expect(wrapper.find('.btn-login').text()).toBe('登录')
  })

  it('should have link to register page', () => {
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
})

describe('Register.vue', () => {
  it('should render register form with title "用户注册"', () => {
    const router = createTestRouter()
    const wrapper = mount(Register, { global: { plugins: [router] } })
    expect(wrapper.find('h2').text()).toBe('用户注册')
  })

  it('should have username, password, and email inputs', () => {
    const router = createTestRouter()
    const wrapper = mount(Register, { global: { plugins: [router] } })
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(3)
    expect(inputs[0].attributes('placeholder')).toBe('请输入用户名')
    expect(inputs[1].attributes('placeholder')).toBe('请输入密码')
    expect(inputs[2].attributes('placeholder')).toBe('请输入邮箱')
    expect(inputs[2].attributes('type')).toBe('email')
  })

  it('should have "注册" button', () => {
    const router = createTestRouter()
    const wrapper = mount(Register, { global: { plugins: [router] } })
    expect(wrapper.find('.btn-register').text()).toBe('注册')
  })

  it('should have link to login page', () => {
    const router = createTestRouter()
    const wrapper = mount(Register, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('已有账号？')
    expect(wrapper.text()).toContain('去登录')
  })

  it('should not show error or success message initially', () => {
    const router = createTestRouter()
    const wrapper = mount(Register, { global: { plugins: [router] } })
    expect(wrapper.find('.error-message').exists()).toBe(false)
    expect(wrapper.find('.success-message').exists()).toBe(false)
  })
})
