/**
 * Pagination Component Unit Tests
 * Tests: page calculation, page change events, disabled states, Vue 3 patterns
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'

describe('Pagination.vue', () => {
  // Business Rule: 分页从第 0 页开始，默认每页 12 条
  it('should not render when totalPages <= 1', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 5, pageSize: 10 }
    })
    expect(wrapper.find('.pagination').exists()).toBe(false)
  })

  it('should render when totalPages > 1', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 25, pageSize: 10 }
    })
    expect(wrapper.find('.pagination').exists()).toBe(true)
  })

  it('should calculate totalPages correctly', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 25, pageSize: 10 }
    })
    const buttons = wrapper.findAll('.page-btn')
    // 上一页 + 3 pages + 下一页 = 5
    expect(buttons.length).toBe(5)
  })

  it('should display page numbers starting from 1 (0-indexed internally)', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 30, pageSize: 10 }
    })
    const pageButtons = wrapper.findAll('.page-btn').filter(b => !b.text().includes('页'))
    expect(pageButtons[0].text()).toBe('1')
    expect(pageButtons[1].text()).toBe('2')
    expect(pageButtons[2].text()).toBe('3')
  })

  it('should mark active page', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 1, total: 30, pageSize: 10 }
    })
    const activeBtn = wrapper.find('.page-btn.active')
    expect(activeBtn.exists()).toBe(true)
    expect(activeBtn.text()).toBe('2')
  })

  it('should disable previous button on first page', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 30, pageSize: 10 }
    })
    const prevBtn = wrapper.findAll('.page-btn')[0]
    expect(prevBtn.text()).toContain('上一页')
    expect(prevBtn.attributes('disabled')).toBeDefined()
  })

  it('should disable next button on last page', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 2, total: 30, pageSize: 10 }
    })
    const allButtons = wrapper.findAll('.page-btn')
    // The last button should be "下一页"
    const nextBtn = allButtons[allButtons.length - 1]
    expect(nextBtn).toBeDefined()
    if (nextBtn) {
      expect(nextBtn.text()).toContain('下一页')
      expect(nextBtn.attributes('disabled')).toBeDefined()
    }
  })

  it('should emit page-change event when clicking page button', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 30, pageSize: 10 }
    })
    // All page-btn: 上一页, page0, page1, page2, 下一页
    // Click page1 (index 2)
    const allButtons = wrapper.findAll('.page-btn')
    // Button index 2 should be page "2"
    await allButtons[2].trigger('click')
    expect(wrapper.emitted('page-change')).toBeTruthy()
    expect(wrapper.emitted('page-change')[0]).toEqual([1])
  })

  it('should not emit event when clicking current page', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 30, pageSize: 10 }
    })
    const allButtons = wrapper.findAll('.page-btn')
    // Button index 1 should be page "1" (current)
    await allButtons[1].trigger('click')
    expect(wrapper.emitted('page-change')).toBeFalsy()
  })

  it('should use default props', () => {
    const wrapper = mount(Pagination)
    // default total=0, pageSize=10, so totalPages=0, no render
    expect(wrapper.find('.pagination').exists()).toBe(false)
  })
})
