<template>
  <view class="login-container">
    <!-- Logo部分 -->
    <view class="logo-box">
      <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
    </view>

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

      <!-- 记住密码和忘记密码 -->
      <view class="options-row">
        <label class="remember-me">
          <checkbox 
            :checked="formData.remember" 
            @tap="formData.remember = !formData.remember"
            color="#4A90E2"
          />
          <text>记住我</text>
        </label>
        <text class="forgot-password" @tap="handleForgotPassword">忘记密码？</text>
      </view>

      <!-- 登录按钮 -->
      <button class="login-btn" @tap="handleLogin">登 录</button>

      <!-- 注册链接 -->
      <view class="register-link">
        <text>还没有账号？</text>
        <text class="link" @tap="handleRegister">立即注册</text>
      </view>

      <!-- 分割线 -->
      <view class="divider">
        <text>或</text>
      </view>

      <!-- 社交登录 -->
      <view class="social-login">
        <view class="social-btn" @tap="handleSocialLogin('wechat')">微</view>
        <view class="social-btn" @tap="handleSocialLogin('qq')">Q</view>
        <view class="social-btn" @tap="handleSocialLogin('weibo')">微</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { auth } from '@/api'

// 表单数据
const formData = reactive({
  username: '',
  password: '',
  remember: false
})

// 处理登录
const handleLogin = async () => {
  // 表单验证
  if (!formData.username || !formData.password) {
    uni.showToast({
      title: '请输入账号和密码',
      icon: 'none'
    })
    return
  }
  
  try {
    const res = await auth.login(formData)
    // 保存token
    uni.setStorageSync('token', res.data.token)
    // 保存用户信息
    uni.setStorageSync('userInfo', {
      userId: res.data.userId,
      username: res.data.username
    })
    
    uni.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        // 跳转到备忘录列表页
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/memo/index'
          })
        }, 2000)
      }
    })
  } catch (error) {
    console.error('登录失败:', error)
  }
}

// 处理忘记密码
const handleForgotPassword = () => {
  uni.navigateTo({
    url: '/pages/forgot-password/index'
  })
}

// 处理注册
const handleRegister = () => {
  uni.navigateTo({
    url: '/pages/register/index'
  })
}

// 处理社交登录
const handleSocialLogin = (type) => {
  uni.showToast({
    title: `点击了${type}登录`,
    icon: 'none'
  })
}
</script>

<style lang="scss">
.login-container {
  min-height: 100vh;
  background-color: #fff;
  padding: 40rpx;
  box-sizing: border-box;
}

.logo-box {
  padding: 60rpx 0;
  display: flex;
  justify-content: center;
  
  .logo {
    width: 160rpx;
    height: 160rpx;
    background: #4A90E2;
    border-radius: 40rpx;
  }
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

.options-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
  font-size: 28rpx;
  
  .remember-me {
    display: flex;
    align-items: center;
    color: #666;
    
    checkbox {
      transform: scale(0.8);
      margin-right: 8rpx;
    }
  }
  
  .forgot-password {
    color: #4A90E2;
  }
}

.login-btn {
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
  margin: 20rpx 0;
  
  &:active {
    background: #357ABD;
  }
}

.register-link {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  margin: 40rpx 0;
  
  .link {
    color: #4A90E2;
    margin-left: 10rpx;
  }
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40rpx 0;
  color: #999;
  font-size: 28rpx;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 2rpx;
    background: #eee;
    margin: 0 20rpx;
  }
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 40rpx;
  
  .social-btn {
    width: 80rpx;
    height: 80rpx;
    background: #f5f5f5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36rpx;
    color: #666;
    
    &:active {
      background: #e0e0e0;
      transform: translateY(-4rpx);
    }
  }
}
</style> 