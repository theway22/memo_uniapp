<template>
  <view class="memo-container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="title">备忘录</text>
    </view>

    <!-- 备忘录列表 -->
    <view class="memo-grid">
      <view 
        class="memo-item" 
        v-for="(item, index) in memoList" 
        :key="index"
        @tap="handleMemoClick(item)"
      >
        <text class="memo-title">{{ item.title }}</text>
        <text class="memo-content">{{ item.content }}</text>
      </view>
    </view>

    <!-- 添加按钮 -->
    <view class="add-btn" @tap="handleAddMemo">
      <text class="add-icon">+</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { memo } from '@/api'

// 备忘录列表数据
const memoList = ref([])

// 获取备忘录列表
const getMemoList = async () => {
  try {
    const res = await memo.getList()
    memoList.value = res.data.list || []
    console.log('获取备忘录列表成功:', memoList.value)
  } catch (error) {
    console.error('获取备忘录列表失败:', error)
    uni.showToast({
      title: '获取列表失败，请重试',
      icon: 'none'
    })
  }
}

// 点击备忘录
const handleMemoClick = (item) => {
  console.log('点击备忘录:', item)
  if (!item || !item._id) {
    uni.showToast({
      title: '备忘录数据错误',
      icon: 'none'
    })
    return
  }
  uni.navigateTo({
    url: `/pages/memo/detail?id=${item._id}`
  })
}

// 添加备忘录
const handleAddMemo = () => {
  uni.navigateTo({
    url: '/pages/memo/edit'
  })
}

// 页面加载时获取列表
onLoad(() => {
  getMemoList()
})

// 每次页面显示时刷新列表
onShow(() => {
  getMemoList()
})
</script>

<style lang="scss">
.memo-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 40rpx;
  box-sizing: border-box;
  position: relative;
}

.header {
  padding: 20rpx 0 40rpx;
  
  .title {
    font-size: 48rpx;
    font-weight: 600;
    color: #333;
  }
}

.memo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;
  padding-bottom: 120rpx; // 为底部按钮留出空间
}

.memo-item {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  min-height: 200rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  
  .memo-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 16rpx;
    // 标题超出一行显示省略号
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .memo-content {
    font-size: 28rpx;
    color: #666;
    flex: 1;
    // 内容超出两行显示省略号
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  
  &:active {
    transform: scale(0.98);
    transition: transform 0.2s;
  }
}

.add-btn {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  width: 100rpx;
  height: 100rpx;
  background: #4A90E2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(74,144,226,0.3);
  
  .add-icon {
    color: #fff;
    font-size: 60rpx;
    font-weight: 300;
    margin-top: -4rpx; // 微调加号位置
  }
  
  &:active {
    transform: scale(0.95);
    transition: transform 0.2s;
  }
}
</style> 