<template>
  <!-- 根组件：包含顶部导航和路由视图 -->
  <div id="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>
