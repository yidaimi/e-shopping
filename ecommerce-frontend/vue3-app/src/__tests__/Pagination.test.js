/**
 * Unit Tests for Pagination Component
 * Covers: page calculation, page-change events, boundary conditions
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'

describe('Pagination Component', () => {
  // BR-DATA-01: Products paginated with default page size 12
  // BR-DATA-02: Pagination is 0-based

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
    // ceil(25/10) = 3 pages, so should show 3 page buttons
    const pageButtons = wrapper.findAll('.page-btn').filter(btn =>
      !btn.text().includes('上一页') && !btn.text().includes('下一页')
    )
    expect(pageButtons.length).toBe(3)
  })

  it('should display page numbers starting from 1 (0-indexed internally)', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 30, pageSize: 10 }
    })
    const pageButtons = wrapper.findAll('.page-btn').filter(btn =>
      !btn.text().includes('上一页') && !btn.text().includes('下一页')
    )
    expect(pageButtons[0].text()).toBe('1')
    expect(pageButtons[1].text()).toBe('2')
    expect(pageButtons[2].text()).toBe('3')
  })

  it('should mark current page as active', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 1, total: 30, pageSize: 10 }
    })
    const activeBtn = wrapper.find('.page-btn.active')
    expect(activeBtn.exists()).toBe(true)
    expect(activeBtn.text()).toBe('2') // page 1 (0-indexed) = display "2"
  })

  it('should disable 上一页 on first page', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 30, pageSize: 10 }
    })
    const prevBtn = wrapper.findAll('.page-btn').find(btn => btn.text() === '上一页')
    expect(prevBtn.attributes('disabled')).toBeDefined()
  })

  it('should disable 下一页 on last page', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 2, total: 30, pageSize: 10 }
    })
    const nextBtn = wrapper.findAll('.page-btn').find(btn => btn.text() === '下一页')
    expect(nextBtn.attributes('disabled')).toBeDefined()
  })

  it('should emit page-change when clicking page button', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 30, pageSize: 10 }
    })
    const page2Btn = wrapper.findAll('.page-btn').find(btn => btn.text() === '2')
    await page2Btn.trigger('click')
    expect(wrapper.emitted('page-change')).toBeTruthy()
    expect(wrapper.emitted('page-change')[0]).toEqual([1]) // page index 1
  })

  it('should not emit page-change when clicking current page', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 30, pageSize: 10 }
    })
    const page1Btn = wrapper.findAll('.page-btn').find(btn => btn.text() === '1')
    await page1Btn.trigger('click')
    expect(wrapper.emitted('page-change')).toBeFalsy()
  })

  it('should use default pageSize of 10', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 0, total: 25 }
    })
    const pageButtons = wrapper.findAll('.page-btn').filter(btn =>
      !btn.text().includes('上一页') && !btn.text().includes('下一页')
    )
    expect(pageButtons.length).toBe(3) // ceil(25/10) = 3
  })
})
