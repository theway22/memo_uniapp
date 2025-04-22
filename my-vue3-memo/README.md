# Vue3 备忘录小程序

一个基于 Vue3 + uni-app 开发的跨平台备忘录应用，支持多端运行（H5、小程序、App）。

## 功能特性

- 📝 备忘录的增删改查
- 🔐 用户认证（登录/注册）
- 📱 响应式设计，支持多端适配
- 🎨 简洁美观的界面设计
- 💾 数据实时同步
- 🔄 自动刷新列表

## 技术栈

### 前端
- Vue 3
- uni-app
- SCSS
- Vuex (状态管理)

### 后端
- Node.js
- Express
- MongoDB
- JWT (身份认证)

## 项目结构

```
├── src/
│   ├── api/                # API 接口封装
│   ├── components/         # 公共组件
│   ├── pages/             # 页面文件
│   │   ├── auth/          # 认证相关页面
│   │   └── memo/          # 备忘录相关页面
│   ├── static/            # 静态资源
│   ├── store/             # Vuex 状态管理
│   ├── utils/             # 工具函数
│   ├── App.vue            # 应用入口组件
│   └── main.js            # 应用入口文件
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## 安装和运行

1. 克隆项目
```bash
git clone [项目地址]
cd my-vue3-memo
```

2. 安装依赖
```bash
npm install
```

3. 运行项目
```bash
# 运行到 H5
npm run dev:h5

# 运行到微信小程序
npm run dev:mp-weixin

# 运行到 App
npm run dev:app
```

## API 接口说明

### 基础信息
- 基础路径：`https://ngtlufpuvjjd.sealoshzh.site`
- 请求方式：HTTP
- 数据格式：JSON
- 认证方式：Bearer Token

### 主要接口

#### 用户认证
- 注册：`POST /api/v1/auth/register`
- 登录：`POST /api/v1/auth/login`

#### 备忘录管理
- 获取列表：`GET /api/v1/memos`
- 获取详情：`GET /api/v1/memos/:id`
- 创建：`POST /api/v1/memos`
- 更新：`PUT /api/v1/memos/:id`
- 删除：`DELETE /api/v1/memos/:id`

## 页面说明

### 认证页面
- 登录页面：用户登录
- 注册页面：新用户注册

### 备忘录页面
- 列表页：显示所有备忘录
- 详情页：查看备忘录详情
- 编辑页：创建/编辑备忘录

## 开发说明

### 环境要求
- Node.js >= 14.0.0
- npm >= 6.0.0

### 开发工具
- HBuilderX
- VS Code
- 微信开发者工具（小程序开发）

### 注意事项
1. 首次运行需要配置后端服务地址
2. 小程序开发需要在微信开发者工具中导入项目
3. 确保已安装所需依赖
4. 注意跨域配置

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交代码
4. 创建 Pull Request

## 许可证

[MIT License](LICENSE)

## 联系方式

如有问题或建议，请提交 Issue 或联系开发者。 