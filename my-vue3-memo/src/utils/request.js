// 基础配置
const baseURL = 'https://pwvmezyaqyim.sealoshzh.site'

// 请求拦截器
const requestInterceptor = (options) => {
  // 获取token
  const token = uni.getStorageSync('token')
  
  // 添加基础URL
  options.url = `${baseURL}${options.url}`
  
  // 添加header
  options.header = {
    'Content-Type': 'application/json',
    ...options.header
  }
  
  // 如果有token，添加到header
  if (token) {
    options.header.Authorization = `Bearer ${token}`
  }
  
  return options
}

// 响应拦截器
const responseInterceptor = (response) => {
  const { data } = response
  
  // 请求成功
  if (data.code === 200) {
    return data
  }
  
  // token过期或未授权
  if (data.code === 401) {
    // 清除token
    uni.removeStorageSync('token')
    // 跳转到登录页
    uni.reLaunch({
      url: '/pages/login/index'
    })
    return Promise.reject(new Error('未授权，请重新登录'))
  }
  
  // 请求参数错误
  if (data.code === 400) {
    uni.showToast({
      title: data.message || '请求参数错误',
      icon: 'none'
    })
    return Promise.reject(new Error(data.message || '请求参数错误'))
  }
  
  // 其他错误
  uni.showToast({
    title: data.message || '请求失败',
    icon: 'none'
  })
  return Promise.reject(new Error(data.message || '请求失败'))
}

// 请求方法
const request = (options) => {
  // 应用请求拦截器
  options = requestInterceptor(options)
  
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        try {
          resolve(responseInterceptor(res))
        } catch (error) {
          reject(error)
        }
      },
      fail: (error) => {
        console.error('请求失败:', error)
        uni.showToast({
          title: '网络请求失败',
          icon: 'none'
        })
        reject(error)
      }
    })
  })
}

export default request 