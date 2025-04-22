import request from '@/utils/request'

// 用户认证相关接口
export const auth = {
  // 用户注册
  register: (data) => {
    return request({
      url: '/api/v1/auth/register',
      method: 'POST',
      data
    })
  },
  
  // 用户登录
  login: (data) => {
    return request({
      url: '/api/v1/auth/login',
      method: 'POST',
      data
    })
  }
}

// 备忘录相关接口
export const memo = {
  // 获取备忘录列表
  getList: () => {
    return request({
      url: '/api/v1/memos',
      method: 'GET'
    })
  },
  
  // 获取备忘录详情
  getDetail: (id) => {
    return request({
      url: `/api/v1/memos/${id}`,
      method: 'GET'
    })
  },
  
  // 创建备忘录
  create: (data) => {
    return request({
      url: '/api/v1/memos',
      method: 'POST',
      data
    })
  },
  
  // 更新备忘录
  update: (id, data) => {
    return request({
      url: `/api/v1/memos/${id}`,
      method: 'PUT',
      data
    })
  },
  
  // 删除备忘录
  delete: (id) => {
    return request({
      url: `/api/v1/memos/${id}`,
      method: 'DELETE'
    })
  }
} 