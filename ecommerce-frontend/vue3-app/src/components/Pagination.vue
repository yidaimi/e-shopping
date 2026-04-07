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

<script setup>
import { computed } from 'vue'

const props = withDefaults(defineProps(), {
  /** 当前页码（从0开始） */
  currentPage: 0,
  /** 数据总数 */
  total: 0,
  /** 每页大小 */
  pageSize: 10
})

const emit = defineEmits(['page-change'])

/** 计算总页数 */
const totalPages = computed(() => {
  return Math.ceil(props.total / props.pageSize)
})

/** 生成页码数组 */
const pages = computed(() => {
  const arr = []
  for (let i = 0; i < totalPages.value; i++) {
    arr.push(i)
  }
  return arr
})

/**
 * 跳转到指定页
 * @param {number} page 目标页码
 */
function goToPage(page) {
  if (page >= 0 && page < totalPages.value && page !== props.currentPage) {
    emit('page-change', page)
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
