<template>
  <!-- 分页组件 -->
  <div class="pagination" v-if="totalPages > 1">
    <!-- 上一页按钮 -->
    <button
      class="page-btn"
      :disabled="currentPage <= 0"
      @click="goToPage(currentPage - 1)">
      上一页
    </button>

    <!-- 页码按钮 -->
    <button
      v-for="p in pages"
      :key="p"
      class="page-btn"
      :class="{ active: p === currentPage }"
      @click="goToPage(p)">
      {{ p + 1 }}
    </button>

    <!-- 下一页按钮 -->
    <button
      class="page-btn"
      :disabled="currentPage >= totalPages - 1"
      @click="goToPage(currentPage + 1)">
      下一页
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    /** 当前页码（从0开始） */
    currentPage: {
      type: Number,
      default: 0
    },
    /** 数据总数 */
    total: {
      type: Number,
      default: 0
    },
    /** 每页大小 */
    pageSize: {
      type: Number,
      default: 10
    }
  },
  computed: {
    /** 计算总页数 */
    totalPages() {
      return Math.ceil(this.total / this.pageSize)
    },
    /** 生成页码数组 */
    pages() {
      const arr = []
      for (let i = 0; i < this.totalPages; i++) {
        arr.push(i)
      }
      return arr
    }
  },
  methods: {
    /**
     * 跳转到指定页
     * @param {number} page 目标页码
     */
    goToPage(page) {
      if (page >= 0 && page < this.totalPages && page !== this.currentPage) {
        this.$emit('page-change', page)
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 16px 0;
}
.page-btn {
  padding: 6px 14px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}
.page-btn:hover:not(:disabled):not(.active) {
  color: #1890ff;
  border-color: #1890ff;
}
.page-btn.active {
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
}
.page-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
  border-color: #e8e8e8;
}
</style>
