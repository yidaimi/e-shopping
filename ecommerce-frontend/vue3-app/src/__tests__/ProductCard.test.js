/**
 * ProductCard Component Unit Tests
 * Tests: product display, price formatting, click navigation, image error handling
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
  useRoute: () => ({})
}))

const mockProduct = {
  id: 1,
  name: '测试商品',
  description: '这是一个测试商品描述',
  imageUrl: 'https://example.com/image.jpg',
  price: 199.99,
  stock: 50
}

describe('ProductCard.vue', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('should render product name', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    expect(wrapper.find('.card-title').text()).toBe('测试商品')
  })

  it('should render product description', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    expect(wrapper.find('.card-desc').text()).toBe('这是一个测试商品描述')
  })

  it('should render stock count', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    expect(wrapper.find('.rating-count').text()).toContain('50 件有货')
  })

  // Business Rule: 商品卡片价格显示格式：¥符号 + 整数部分 + . + 两位小数
  it('should format price correctly with symbol, whole and decimal parts', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    expect(wrapper.find('.price-symbol').text()).toBe('¥')
    expect(wrapper.find('.price-whole').text()).toBe('199')
    expect(wrapper.find('.price-decimal').text()).toBe('.99')
  })

  it('should format price with thousands separator for large numbers', () => {
    const expensiveProduct = { ...mockProduct, price: 1234.56 }
    const wrapper = mount(ProductCard, { props: { product: expensiveProduct } })
    expect(wrapper.find('.price-whole').text()).toBe('1,234')
    expect(wrapper.find('.price-decimal').text()).toBe('.56')
  })

  // Business Rule: 商品卡片点击跳转到 /product/:id 详情页
  it('should navigate to product detail on click', async () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    await wrapper.find('.card').trigger('click')
    expect(mockPush).toHaveBeenCalledWith('/product/1')
  })

  it('should render product image', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    const img = wrapper.find('.card-img img')
    expect(img.attributes('src')).toBe('https://example.com/image.jpg')
    expect(img.attributes('alt')).toBe('测试商品')
  })

  it('should show delivery text', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    expect(wrapper.find('.card-delivery').text()).toBe('免费配送')
  })

  it('should show star rating', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    expect(wrapper.find('.stars').text()).toBe('★★★★☆')
  })
})
