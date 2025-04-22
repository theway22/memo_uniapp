<template>
  <view class="detail-container">
    <!-- 顶部操作栏 -->
    <view class="header">
      <view class="back-btn" @tap="handleBack">
        <text class="back-icon">←</text>
      </view>
    </view>

    <!-- 备忘录内容 -->
    <view class="memo-content">
      <view class="title-section">
        <text class="title">{{ memoDetail.title }}</text>
      </view>
      <view class="content-section">
        <text class="content">{{ memoDetail.content }}</text>
      </view>
    </view>

    <!-- 底部按钮组 -->
    <view class="bottom-buttons">
      <view class="edit-btn" @tap="handleEdit">
        <text class="edit-text">编辑</text>
      </view>
      <view class="delete-btn" @tap="handleDelete">
        <text class="delete-text">删除</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { memo } from '@/api'

// 备忘录详情数据
const memoDetail = ref({
  _id: '',
  title: '',
  content: ''
})

// 获取备忘录详情
const getMemoDetail = async (id) => {
  if (!id) {
    console.error('备忘录ID不存在')
    uni.showToast({
      title: '备忘录ID不存在',
      icon: 'none'
    })
    uni.redirectTo({
      url: '/pages/memo/index'
    })
    return
  }

  try {
    console.log('正在获取备忘录详情, ID:', id)
    const res = await memo.getDetail(id)
    if (!res.data) {
      throw new Error('获取到的数据为空')
    }
    memoDetail.value = res.data
    console.log('获取备忘录详情成功:', memoDetail.value)
  } catch (error) {
    console.error('获取备忘录详情失败:', error)
    uni.showToast({
      title: '获取详情失败',
      icon: 'none'
    })
    setTimeout(() => {
      uni.redirectTo({
        url: '/pages/memo/index'
      })
    }, 1500)
  }
}

// 返回上一页
const handleBack = () => {
  uni.redirectTo({
    url: '/pages/memo/index'
  })
}

// 编辑备忘录
const handleEdit = () => {
  if (memoDetail.value) {
    uni.navigateTo({
      url: `/pages/memo/edit?id=${memoDetail.value._id}`
    })
  }
}

// 删除备忘录
const handleDelete = () => {
  if (!memoDetail.value || !memoDetail.value._id) {
    uni.showToast({
      title: '备忘录ID不存在',
      icon: 'none'
    })
    return
  }
  
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这条备忘录吗？',
    success: async (res) => {
      if (res.confirm) {
        try {
          await memo.delete(memoDetail.value._id)
          uni.showToast({
            title: '删除成功',
            icon: 'success'
          })
          // 返回列表页
          uni.redirectTo({
            url: '/pages/memo/index'
          })
        } catch (error) {
          console.error('删除备忘录失败:', error)
          uni.showToast({
            title: '删除失败',
            icon: 'none'
          })
        }
      }
    }
  })
}

// 获取页面参数
onLoad((options) => {
  console.log('详情页面参数:', options)
  if (options.id) {
    getMemoDetail(options.id)
  } else {
    uni.showToast({
      title: '参数错误',
      icon: 'none'
    })
    uni.redirectTo({
      url: '/pages/memo/index'
    })
  }
})
</script>

<style lang="scss">
.detail-container {
  min-height: 100vh;
  background-color: #fff;
  position: relative;
  padding-bottom: 200rpx; // 为底部按钮组留出空间
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
  
  .back-btn {
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
}

.memo-content {
  padding: 40rpx;
  margin-top: 160rpx; // 为固定定位的header留出空间
  
  .title-section {
    margin-bottom: 40rpx;
    
    .title {
      font-size: 48rpx;
      font-weight: 600;
      color: #333;
      line-height: 1.4;
    }
  }
  
  .content-section {
    .content {
      font-size: 32rpx;
      color: #666;
      line-height: 1.6;
      white-space: pre-wrap; // 保留换行符
    }
  }
}

.bottom-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40rpx;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-top: 2rpx solid #f5f5f5;
  
  .edit-btn, .delete-btn {
    flex: 1;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40rpx;
    margin: 0 20rpx;
    
    &:active {
      opacity: 0.8;
    }
  }
  
  .edit-btn {
    background-color: #4A90E2;
    
    .edit-text {
      color: #fff;
      font-size: 32rpx;
    }
  }
  
  .delete-btn {
    background-color: #ff4d4f;
    
    .delete-text {
      color: #fff;
      font-size: 32rpx;
    }
  }
}
</style> 