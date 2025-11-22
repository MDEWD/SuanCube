# 创建测试账号说明

## 测试账号信息

### 1. 普通用户账号
- **账号**: `testuser`
- **密码**: `123456`
- **角色**: `user`
- **功能**: 可以查看购买记录、收藏、需求管理

### 2. 算力同盟账号
- **账号**: `testpartner`
- **密码**: `123456`
- **角色**: `partner`
- **功能**: 可以查看我的商品、出售记录

### 3. 管理员账号
- **账号**: `testadmin`
- **密码**: `123456`
- **角色**: `admin`
- **功能**: 可以查看所有订单、用户管理、算力同盟管理

## 创建方式

### 方式一：通过注册页面创建
1. 访问 `/user/register` 注册页面
2. 使用上述账号和密码注册
3. 注册后需要后端管理员将用户角色修改为对应的角色（`user`、`partner`、`admin`）

### 方式二：通过后端API直接创建（推荐）
如果后端支持，可以通过以下方式创建：

```bash
# 创建普通用户
POST /api/user/register
{
  "userAccount": "testuser",
  "userPassword": "123456",
  "checkPassword": "123456"
}
# 然后通过管理员接口修改角色为 user

# 创建算力同盟
POST /api/user/register
{
  "userAccount": "testpartner",
  "userPassword": "123456",
  "checkPassword": "123456"
}
# 然后通过管理员接口修改角色为 partner

# 创建管理员
POST /api/user/register
{
  "userAccount": "testadmin",
  "userPassword": "123456",
  "checkPassword": "123456"
}
# 然后通过管理员接口修改角色为 admin
```

### 方式三：数据库直接插入（开发环境）
如果可以直接访问数据库，可以执行以下SQL：

```sql
-- 创建普通用户
INSERT INTO user (user_account, user_password, user_name, user_role, create_time, update_time)
VALUES ('testuser', '加密后的密码', '测试用户', 'user', NOW(), NOW());

-- 创建算力同盟
INSERT INTO user (user_account, user_password, user_name, user_role, create_time, update_time)
VALUES ('testpartner', '加密后的密码', '测试同盟', 'partner', NOW(), NOW());

-- 创建管理员
INSERT INTO user (user_account, user_password, user_name, user_role, create_time, update_time)
VALUES ('testadmin', '加密后的密码', '测试管理员', 'admin', NOW(), NOW());
```

## 登录方式

1. 访问 `/user/login` 登录页面
2. 使用上述任一账号和密码登录
3. 登录成功后访问 `/profile` 查看个人中心，不同角色会显示不同的功能

## 注意事项

- 密码需要根据后端的加密方式进行处理
- 用户角色需要在注册后通过管理员接口或数据库修改
- 如果后端已有默认管理员账号，可以直接使用该账号修改其他用户的角色

