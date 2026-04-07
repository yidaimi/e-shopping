<template>
  <!-- 登录页面 -->
  <div class="login-container">
    <h2>用户登录</h2>

    <!-- 错误提示 -->
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>

    <!-- 登录表单 -->
    <div class="form-group">
      <label>用户名</label>
      <input type="text" v-model="username" placeholder="请输入用户名" />
    </div>

    <div class="form-group">
      <label>密码</label>
      <input type="password" v-model="password" placeholder="请输入密码" />
    </div>

    <button class="btn-login" @click="onLogin">登录</button>

    <p class="link-text">
      没有账号？<router-link to="/register">去注册</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/user'

const router = useRouter()

/** 用户名 */
const username = ref('')
/** 密码 */
const password = ref('')
/** 错误提示信息 */
const errorMessage = ref('')

/**
 * 登录操作
 * 调用 login 接口，成功后跳转到商品列表页，失败则显示错误信息
 */
function onLogin() {
  errorMessage.value = ''
  login(username.value, password.value).then(() => {
    // 登录成功，跳转到商品列表页
    router.push('/products')
  }).catch(err => {
    // 登录失败，显示错误信息
    const resp = err.response
    errorMessage.value = (resp && resp.data && resp.data.message) || '登录失败，请检查用户名和密码'
  })
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 32px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}
h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #555;
}
.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}
.btn-login {
  width: 100%;
  padding: 12px;
  background: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
}
.btn-login:hover {
  background: #40a9ff;
}
.error-message {
  color: #ff4d4f;
  background: #fff2f0;
  border: 1px solid #ffccc7;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
}
.link-text {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #666;
}
.link-text a {
  color: #1890ff;
  text-decoration: none;
}
</style>
