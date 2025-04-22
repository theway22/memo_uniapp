<template>
  <view class="edit-container">
    <!-- 顶部操作栏 -->
    <view class="header">
      <view class="back-btn" @tap="handleBack">
        <text class="back-icon">←</text>
      </view>
      <view class="save-btn" @tap="handleSave">
        <text class="save-text">保存</text>
      </view>
    </view>

    <!-- 编辑表单 -->
    <view class="edit-form">
      <view class="input-group">
        <input 
          class="title-input" 
          type="text" 
          v-model="formData.title" 
          placeholder="请输入标题"
          placeholder-class="placeholder"
          @input="handleTitleInput"
        />
      </view>
      <view class="input-group">
        <textarea 
          class="content-input" 
          v-model="formData.content" 
          placeholder="请输入内容"
          placeholder-class="placeholder"
          @input="handleContentInput"
        />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { memo } from '@/api'

// 表单数据
const formData = reactive({
  _id: '',
  title: '',
  content: ''
})

// 是否是编辑模式
const isEdit = ref(false)

// 获取备忘录详情
const getMemoDetail = async (id) => {
  try {
    console.log('正在获取备忘录详情, ID:', id)
    const res = await memo.getDetail(id)
    if (!res.data) {
      throw new Error('获取到的数据为空')
    }
    formData._id = res.data._id
    formData.title = res.data.title
    formData.content = res.data.content
    isEdit.value = true
    console.log('获取备忘录详情成功:', formData)
  } catch (error) {
    console.error('获取备忘录详情失败:', error)
    uni.showToast({
      title: '获取详情失败',
      icon: 'none'
    })
  }
}

// 处理标题输入
const handleTitleInput = (e) => {
  console.log('标题输入:', e.detail.value)
  formData.title = e.detail.value
}

// 处理内容输入
const handleContentInput = (e) => {
  console.log('内容输入:', e.detail.value)
  formData.content = e.detail.value
}

// 获取页面参数
onLoad((options) => {
  console.log('编辑页面参数:', options)
  if (options.id) {
    getMemoDetail(options.id)
  }
})

// 返回上一页
const handleBack = () => {
  uni.redirectTo({
    url: '/pages/memo/index'
  })
}

// 保存备忘录
const handleSave = async () => {
  console.log('保存备忘录:', formData)
  
  // 表单验证
  if (!formData.title.trim()) {
    uni.showToast({
      title: '请输入标题',
      icon: 'none'
    })
    return
  }
  
  if (!formData.content.trim()) {
    uni.showToast({
      title: '请输入内容',
      icon: 'none'
    })
    return
  }
  
  try {
    if (isEdit.value) {
      // 更新备忘录
      await memo.update(formData._id, {
        title: formData.title,
        content: formData.content
      })
    } else {
      // 创建备忘录
      await memo.create({
        title: formData.title,
        content: formData.content
      })
    }
    
    // 先返回列表页
    uni.redirectTo({
      url: '/pages/memo/index'
    })
    
    // 然后显示成功提示
    uni.showToast({
      title: isEdit.value ? '更新成功' : '创建成功',
      icon: 'success',
      duration: 2000
    })
  } catch (error) {
    console.error(isEdit.value ? '更新备忘录失败:' : '创建备忘录失败:', error)
    uni.showToast({
      title: isEdit.value ? '更新失败' : '创建失败',
      icon: 'none'
    })
  }
}
</script>

<style lang="scss">
.edit-container {
  min-height: 100vh;
  background-color: #fff;
  position: relative;
}

.header {
  padding: 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2rpx solid #f5f5f5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 100;
  padding-top: 80rpx; // 增加顶部内边距，让按钮往下移
  
  .back-btn, .save-btn {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:active {
      opacity: 0.7;
    }
  }
  
  .back-icon {
    font-size: 40rpx;
    color: #333;
  }
  
  .save-text {
    font-size: 32rpx;
    color: #4A90E2;
    font-weight: 500;
  }
}

.edit-form {
  padding: 40rpx;
  margin-top: 160rpx; // 为固定定位的header留出空间
  
  .input-group {
    margin-bottom: 40rpx;
    
    .title-input {
      width: 100%;
      font-size: 48rpx;
      font-weight: 600;
      color: #333;
      padding: 20rpx 0;
      border-bottom: 2rpx solid #f5f5f5;
      background-color: transparent;
    }
    
    .content-input {
      width: 100%;
      height: 600rpx;
      font-size: 32rpx;
      color: #666;
      line-height: 1.6;
      padding: 20rpx 0;
      background-color: transparent;
    }
    
    .placeholder {
      color: #999;
    }
  }
}
</style> 