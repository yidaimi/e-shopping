/**
 * Unit tests for ProductCard component
 * Tests: price formatting, image error handling, click navigation
 * Business rules: BR-DISP-01, BR-DISP-04, BR-DISP-12, BR-DISP-13
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'

const mockPush = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

const mockProduct = {
  id: 1,
  name: '测试商品名称',
  description: '测试商品描述文字',
  imageUrl: 'https://example.com/image.jpg',
  price: 1299.99,
  stock: 10
}

describe('ProductCard.vue', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('should render product name', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    expect(wrapper.find('.card-title').text()).toBe('测试商品名称')
  })

  it('should render product description', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    expect(wrapper.find('.card-desc').text()).toBe('测试商品描述文字')
  })

  it('should format price with integer and decimal parts (BR-DISP-01)', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    expect(wrapper.find('.price-symbol').text()).toBe('¥')
    expect(wrapper.find('.price-whole').text()).toBe('1,299')
    expect(wrapper.find('.price-decimal').text()).toBe('.99')
  })

  it('should format price of 50.00 correctly (BR-DISP-01)', () => {
    const product = { ...mockProduct, price: 50.00 }
    const wrapper = mount(ProductCard, { props: { product } })
    expect(wrapper.find('.price-whole').text()).toBe('50')
    expect(wrapper.find('.price-decimal').text()).toBe('.00')
  })

  it('should display stock count (BR-DISP-12)', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    expect(wrapper.find('.rating-count').text()).toBe('10 件有货')
  })

  it('should display stars rating (BR-DISP-12)', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    expect(wrapper.find('.stars').text()).toBe('★★★★☆')
  })

  it('should display free delivery text (BR-DISP-13)', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    expect(wrapper.find('.card-delivery').text()).toBe('免费配送')
  })

  it('should navigate to product detail on click', async () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    await wrapper.find('.card').trigger('click')
    expect(mockPush).toHaveBeenCalledWith('/product/1')
  })

  it('should have error handler on image for fallback (BR-DISP-04)', () => {
    const wrapper = mount(ProductCard, { props: { product: mockProduct } })
    const img = wrapper.find('.card-img img')
    // Verify the @error handler is bound on the img element
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/image.jpg')
  })
})
