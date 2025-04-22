# 备忘录小程序接口文档

## 基础信息

- 基础路径：`https://ngtlufpuvjjd.sealoshzh.site`
- 请求方式：所有请求都使用 HTTP 协议
- 数据格式：请求和响应数据都使用 JSON 格式
- 认证方式：使用 Token 认证，在请求头中添加 `Authorization: Bearer <token>`

## 通用响应格式

### 成功响应
```json
{
    "code": 200,
    "message": "操作成功",
    "data": {
        // 具体数据
    }
}
```

### 错误响应
```json
{
    "code": 错误码,
    "message": "错误信息",
    "errors": ["具体错误信息"] // 可选，仅在验证错误时返回
}
```

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200    | 成功 |
| 400    | 请求参数错误 |
| 401    | 未授权或token过期 |
| 403    | 权限不足 |
| 404    | 资源不存在 |
| 500    | 服务器内部错误 |

## 接口列表

### 1. 用户认证

#### 1.1 用户注册
- 请求路径：`/api/v1/auth/register`
- 请求方法：POST
- 请求参数：
```json
{
    "username": "string",  // 用户名，至少3个字符
    "password": "string"   // 密码，至少6个字符
}
```
- 成功响应：
```json
{
    "code": 200,
    "message": "注册成功",
    "data": {
        "userId": "string",     // 用户ID
        "username": "string"    // 用户名
    }
}
```
- 失败响应：
```json
{
    "code": 400,
    "message": "用户名已存在"
}
```

#### 1.2 用户登录
- 请求路径：`/api/v1/auth/login`
- 请求方法：POST
- 请求参数：
```json
{
    "username": "string",  // 用户名
    "password": "string",  // 密码
    "remember": boolean   // 是否记住登录状态，可选
}
```
- 成功响应：
```json
{
    "code": 200,
    "message": "登录成功",
    "data": {
        "token": "string",      // 认证令牌
        "userId": "string",     // 用户ID
        "username": "string"    // 用户名
    }
}
```
- 失败响应：
```json
{
    "code": 401,
    "message": "用户名或密码错误"
}
```

### 2. 备忘录管理

#### 2.1 获取备忘录列表
- 请求路径：`/api/v1/memos`
- 请求方法：GET
- 请求头：
```
Authorization: Bearer <token>
```
- 成功响应：
```json
{
    "code": 200,
    "message": "获取成功",
    "data": {
        "total": number,        // 总条数
        "list": [
            {
                "id": "string",         // 备忘录ID
                "title": "string",      // 标题
                "content": "string",    // 内容
                "createTime": "string", // 创建时间
                "updateTime": "string"  // 更新时间
            }
        ]
    }
}
```
- 失败响应：
```json
{
    "code": 401,
    "message": "未授权，请先登录"
}
```

#### 2.2 获取备忘录详情
- 请求路径：`/api/v1/memos/:id`
- 请求方法：GET
- 请求头：
```
Authorization: Bearer <token>
```
- 路径参数：
  - id: 备忘录ID
- 成功响应：
```json
{
    "code": 200,
    "message": "获取成功",
    "data": {
        "id": "string",         // 备忘录ID
        "title": "string",      // 标题
        "content": "string",    // 内容
        "createTime": "string", // 创建时间
        "updateTime": "string"  // 更新时间
    }
}
```
- 失败响应：
```json
{
    "code": 404,
    "message": "备忘录不存在"
}
```

#### 2.3 创建备忘录
- 请求路径：`/api/v1/memos`
- 请求方法：POST
- 请求头：
```
Authorization: Bearer <token>
```
- 请求参数：
```json
{
    "title": "string",   // 标题
    "content": "string"  // 内容
}
```
- 成功响应：
```json
{
    "code": 200,
    "message": "创建成功",
    "data": {
        "id": "string",         // 备忘录ID
        "title": "string",      // 标题
        "content": "string",    // 内容
        "createTime": "string"  // 创建时间
    }
}
```
- 失败响应：
```json
{
    "code": 400,
    "message": "请求参数错误",
    "errors": ["标题不能为空", "内容不能为空"]
}
```

#### 2.4 更新备忘录
- 请求路径：`/api/v1/memos/:id`
- 请求方法：PUT
- 请求头：
```
Authorization: Bearer <token>
```
- 路径参数：
  - id: 备忘录ID
- 请求参数：
```json
{
    "title": "string",   // 标题
    "content": "string"  // 内容
}
```
- 成功响应：
```json
{
    "code": 200,
    "message": "更新成功",
    "data": {
        "id": "string",         // 备忘录ID
        "title": "string",      // 标题
        "content": "string",    // 内容
        "updateTime": "string"  // 更新时间
    }
}
```
- 失败响应：
```json
{
    "code": 404,
    "message": "备忘录不存在"
}
```

#### 2.5 删除备忘录
- 请求路径：`/api/v1/memos/:id`
- 请求方法：DELETE
- 请求头：
```
Authorization: Bearer <token>
```
- 路径参数：
  - id: 备忘录ID
- 成功响应：
```json
{
    "code": 200,
    "message": "删除成功"
}
```
- 失败响应：
```json
{
    "code": 404,
    "message": "备忘录不存在"
}
```

## 注意事项

1. 所有请求需要在 header 中携带 token（除了注册和登录接口）
2. 时间格式统一使用 ISO 8601 标准：`YYYY-MM-DDTHH:mm:ss.sssZ`
3. 所有接口都有访问频率限制：每个 IP 15分钟内最多 100 次请求
4. 建议在请求失败时，根据返回的错误码和错误信息进行相应处理
5. 建议在 token 过期时（401错误），引导用户重新登录 