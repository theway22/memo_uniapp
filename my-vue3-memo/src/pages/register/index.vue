<template>
  <view class="register-container">
    <!-- 返回按钮 -->
    <view class="back-btn" @tap="handleBack">
      <text class="back-icon">←</text>
    </view>

    <!-- Logo部分 -->
    <view class="logo-box">
      <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
    </view>

    <!-- 标题 -->
    <view class="title">账号注册</view>

    <!-- 表单部分 -->
    <view class="form-box">
      <!-- 账号输入框 -->
      <view class="input-group">
        <text class="label">账号</text>
        <input 
          class="input" 
          type="text" 
          v-model="formData.username" 
          placeholder="请输入账号"
          placeholder-class="placeholder"
        />
      </view>

      <!-- 密码输入框 -->
      <view class="input-group">
        <text class="label">密码</text>
        <input 
          class="input" 
          type="password" 
          v-model="formData.password" 
          placeholder="请输入密码"
          placeholder-class="placeholder"
        />
      </view>

      <!-- 确认密码输入框 -->
      <view class="input-group">
        <text class="label">确认密码</text>
        <input 
          class="input" 
          type="password" 
          v-model="formData.confirmPassword" 
          placeholder="请再次输入密码"
          placeholder-class="placeholder"
        />
      </view>

      <!-- 注册按钮 -->
      <button class="register-btn" @tap="handleRegister">注 册</button>

      <!-- 返回登录 -->
      <view class="login-link">
        <text>已有账号？</text>
        <text class="link" @tap="handleBack">返回登录</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import { auth } from '@/api'

// 表单数据
const formData = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

// 处理注册
const handleRegister = async () => {
  // 表单验证
  if (!formData.username || !formData.password || !formData.confirmPassword) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none'
    })
    return
  }

  if (formData.password !== formData.confirmPassword) {
    uni.showToast({
      title: '两次输入的密码不一致',
      icon: 'none'
    })
    return
  }

  // 添加用户名和密码长度验证
  if (formData.username.length < 3) {
    uni.showToast({
      title: '用户名至少需要3个字符',
      icon: 'none'
    })
    return
  }

  if (formData.password.length < 6) {
    uni.showToast({
      title: '密码至少需要6个字符',
      icon: 'none'
    })
    return
  }

  try {
    const res = await auth.register({
      username: formData.username,
      password: formData.password
    })
    
    uni.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        // 注册成功后延迟返回登录页
        setTimeout(() => {
          uni.navigateBack()
        }, 2000)
      }
    })
  } catch (error) {
    console.error('注册失败:', error)
    // 错误信息已经在request.js中通过toast显示，这里不需要重复显示
  }
}

// 返回上一页
const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.register-container {
  min-height: 100vh;
  background-color: #fff;
  padding: 40rpx;
  box-sizing: border-box;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 40rpx;
  top: 40rpx;
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .back-icon {
    font-size: 40rpx;
    color: #333;
  }
}

.logo-box {
  padding: 120rpx 0 40rpx;
  display: flex;
  justify-content: center;
  
  .logo {
    width: 160rpx;
    height: 160rpx;
    background: #4A90E2;
    border-radius: 40rpx;
  }
}

.title {
  text-align: center;
  font-size: 48rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 60rpx;
}

.form-box {
  padding: 0 30rpx;
  width: 100%;
  box-sizing: border-box;
}

.input-group {
  margin-bottom: 40rpx;
  width: 100%;
  
  .label {
    display: block;
    font-size: 28rpx;
    color: #333;
    margin-bottom: 16rpx;
    padding-left: 4rpx;
  }
  
  .input {
    width: 100%;
    height: 88rpx;
    border: 2rpx solid #ddd;
    border-radius: 16rpx;
    padding: 0 30rpx;
    font-size: 32rpx;
    box-sizing: border-box;
    
    &:focus {
      border-color: #4A90E2;
    }
  }
  
  .placeholder {
    color: #999;
  }
}

.register-btn {
  width: 100%;
  height: 88rpx;
  background: #4A90E2;
  color: #fff;
  border-radius: 16rpx;
  font-size: 32rpx;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60rpx 0;
  
  &:active {
    background: #357ABD;
  }
}

.login-link {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  
  .link {
    color: #4A90E2;
    margin-left: 10rpx;
  }
}
</style> 