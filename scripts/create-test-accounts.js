/**
 * 创建测试账号脚本
 * 使用方法：在浏览器控制台运行，或通过后端API调用
 */

// 测试账号配置
const testAccounts = [
  {
    userAccount: 'testuser',
    userPassword: '123456',
    userName: '测试用户',
    userRole: 'user',
    userProfile: '普通用户测试账号'
  },
  {
    userAccount: 'testpartner',
    userPassword: '123456',
    userName: '测试算力同盟',
    userRole: 'partner',
    userProfile: '算力同盟测试账号'
  },
  {
    userAccount: 'testadmin',
    userPassword: '123456',
    userName: '测试管理员',
    userRole: 'admin',
    userProfile: '管理员测试账号'
  }
];

/**
 * 通过API创建账号（需要在浏览器控制台运行）
 */
async function createTestAccounts() {
  const { userRegisterUsingPost } = await import('../src/services/backend/userController');
  
  for (const account of testAccounts) {
    try {
      console.log(`正在创建账号: ${account.userAccount}...`);
      const res = await userRegisterUsingPost({
        userAccount: account.userAccount,
        userPassword: account.userPassword,
        checkPassword: account.userPassword
      });
      
      if (res.code === 0) {
        console.log(`✅ 账号 ${account.userAccount} 创建成功！`);
        console.log(`   用户名: ${account.userName}`);
        console.log(`   角色: ${account.userRole}`);
        console.log(`   注意：需要后端管理员将用户角色修改为 ${account.userRole}`);
      } else {
        console.log(`❌ 账号 ${account.userAccount} 创建失败: ${res.message}`);
      }
    } catch (error) {
      console.error(`❌ 创建账号 ${account.userAccount} 时出错:`, error);
    }
  }
}

// 导出供使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testAccounts, createTestAccounts };
}

console.log(`
========================================
测试账号信息：
========================================

1. 普通用户
   账号: testuser
   密码: 123456
   角色: user

2. 算力同盟
   账号: testpartner
   密码: 123456
   角色: partner

3. 管理员
   账号: testadmin
   密码: 123456
   角色: admin

========================================
使用方法：
1. 在登录页面点击快速登录按钮
2. 或手动输入账号密码登录
3. 如果后端API失败，会自动使用模拟数据登录（开发模式）

注意：如果通过注册页面创建，需要后端管理员修改用户角色
========================================
`);

