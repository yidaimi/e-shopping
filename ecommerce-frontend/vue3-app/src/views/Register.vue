<template>
  <!-- 注册页面 -->
  <div class="register-container">
    <h2>用户注册</h2>

    <!-- 错误提示 -->
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>

    <!-- 成功提示 -->
    <div class="success-message" v-if="successMessage">{{ successMessage }}</div>

    <!-- 注册表单 -->
    <div class="form-group">
      <label>用户名</label>
      <input type="text" v-model="username" placeholder="请输入用户名" />
    </div>

    <div class="form-group">
      <label>密码</label>
      <input type="password" v-model="password" placeholder="请输入密码" />
    </div>

    <div class="form-group">
      <label>邮箱</label>
      <input type="email" v-model="email" placeholder="请输入邮箱" />
    </div>

    <button class="btn-register" @click="onRegister">注册</button>

    <p class="link-text">
      已有账号？<router-link to="/login">去登录</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/user'

const router = useRouter()

/** 用户名 */
const username = ref('')
/** 密码 */
const password = ref('')
/** 邮箱 */
const email = ref('')
/** 错误提示信息 */
const errorMessage = ref('')
/** 成功提示信息 */
const successMessage = ref('')

/**
 * 注册操作
 * 调用 register 接口，成功后跳转到登录页，失败则显示错误信息
 */
function onRegister() {
  errorMessage.value = ''
  successMessage.value = ''
  register(username.value, password.value, email.value).then(() => {
    // 注册成功，跳转到登录页
    successMessage.value = '注册成功，即将跳转到登录页...'
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  }).catch(err => {
    // 注册失败，显示错误信息
    const resp = err.response
    errorMessage.value = (resp && resp.data && resp.data.message) || '注册失败，请稍后重试'
  })
}
</script>

<style scoped>
.register-container {
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
.btn-register {
  width: 100%;
  padding: 12px;
  background: #52c41a;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
}
.btn-register:hover {
  background: #73d13d;
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
.success-message {
  color: #52c41a;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
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
