/**
 * Unit tests for Pagination component
 * Tests: page calculation, page-change events, disabled states
 * Business rules: BR-VAL-04, BR-VAL-05, BR-VAL-06, BR-DATA-01
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'

describe('Pagination.vue', () => {
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
    // 25 / 10 = 3 pages
    const pageButtons = wrapper.findAll('.page-btn').filter(btn => !btn.text().includes('上一页') && !btn.text().includes('下一页'))
    expect(pageButtons.length).toBe(3)
  })

  it('should display page numbers starting from 1 (0-based internal)', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 25, pageSize: 10 }
    })
    const pageButtons = wrapper.findAll('.page-btn').filter(btn => !btn.text().includes('上一页') && !btn.text().includes('下一页'))
    expect(pageButtons[0].text()).toBe('1')
    expect(pageButtons[1].text()).toBe('2')
    expect(pageButtons[2].text()).toBe('3')
  })

  it('should mark active page correctly', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 1, total: 25, pageSize: 10 }
    })
    const activeBtn = wrapper.find('.page-btn.active')
    expect(activeBtn.exists()).toBe(true)
    expect(activeBtn.text()).toBe('2') // page 1 displays as "2"
  })

  it('should disable "上一页" on first page (BR-VAL-04)', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 25, pageSize: 10 }
    })
    const prevBtn = wrapper.findAll('.page-btn').find(btn => btn.text() === '上一页')
    expect(prevBtn.attributes('disabled')).toBeDefined()
  })

  it('should disable "下一页" on last page (BR-VAL-05)', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 2, total: 25, pageSize: 10 }
    })
    const nextBtn = wrapper.findAll('.page-btn').find(btn => btn.text() === '下一页')
    expect(nextBtn.attributes('disabled')).toBeDefined()
  })

  it('should emit page-change when clicking a different page (BR-VAL-06)', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 25, pageSize: 10 }
    })
    const pageButtons = wrapper.findAll('.page-btn').filter(btn => !btn.text().includes('上一页') && !btn.text().includes('下一页'))
    await pageButtons[1].trigger('click') // Click page 2 (index 1)
    expect(wrapper.emitted('page-change')).toBeTruthy()
    expect(wrapper.emitted('page-change')[0]).toEqual([1])
  })

  it('should not emit page-change when clicking the current page (BR-VAL-06)', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 25, pageSize: 10 }
    })
    const pageButtons = wrapper.findAll('.page-btn').filter(btn => !btn.text().includes('上一页') && !btn.text().includes('下一页'))
    await pageButtons[0].trigger('click') // Click current page
    expect(wrapper.emitted('page-change')).toBeFalsy()
  })

  it('should work with pageSize of 12 (BR-DATA-01)', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 36, pageSize: 12 }
    })
    const pageButtons = wrapper.findAll('.page-btn').filter(btn => !btn.text().includes('上一页') && !btn.text().includes('下一页'))
    expect(pageButtons.length).toBe(3) // 36/12 = 3
  })
})
