import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getLoginUserUsingGet } from '@/services/backend/userController';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { AvatarDropdown } from './components/RightContent/AvatarDropdown';
import { requestConfig } from './requestConfig';

const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  const initialState: InitialState = {
    currentUser: undefined,
  };
  
  // 检查是否有 token
  const token = localStorage.getItem('token');
  
  // 如果有 token，尝试获取用户信息
  if (token) {
    try {
      const res = await getLoginUserUsingGet();
      console.log('📥 getLoginUserUsingGet 完整响应:', JSON.stringify(res, null, 2));
      
      // 处理响应数据，兼容不同的响应格式
      // 由于没有使用 skipErrorHandler，响应拦截器返回的是完整的 axios response 对象
      // 后端返回格式: {code: 0, message: "操作成功", data: LoginUserVO}
      // 响应拦截器处理后，返回的是 response 对象
      // 所以：
      // - res = axios response 对象 {data: {code: 0, message: "...", data: LoginUserVO}, status: 200, ...}
      // - res.data = {code: 0, message: "操作成功", data: LoginUserVO}
      // - res.data.data = LoginUserVO
      
      const resAny = res as any;
      let userData: API.LoginUserVO | undefined = undefined;
      
      if (resAny?.data?.data) {
        // 标准格式: res.data.data 包含用户信息
        userData = resAny.data.data as API.LoginUserVO;
        console.log('✅ 使用 res.data.data 格式:', userData);
      } else if (resAny?.data && (resAny.data.userName || resAny.data.userAvatar || resAny.data.id)) {
        // 或者 res.data 本身就是用户信息（兼容格式）
        userData = resAny.data as API.LoginUserVO;
        console.log('✅ 使用 res.data 格式:', userData);
      } else if (resAny && (resAny.userName || resAny.userAvatar || resAny.id)) {
        // 如果 res 本身就是用户信息（直接格式）
        userData = resAny as API.LoginUserVO;
        console.log('✅ 使用 res 直接格式:', userData);
      }
      
      // 如果后端返回的字段名不同，需要做字段映射
      if (userData) {
        // 确保字段名匹配前端期望的格式
        const mappedUser: API.LoginUserVO = {
          id: userData.id || (userData as any).id,
          userName: userData.userName || (userData as any).nickname || (userData as any).userName,
          userAvatar: userData.userAvatar || (userData as any).avatar || (userData as any).userAvatar,
          userRole: userData.userRole || (userData as any).userRole,
          createTime: userData.createTime || (userData as any).createTime,
          userProfile: userData.userProfile || (userData as any).userProfile,
          displayId: userData.displayId || (userData as any).displayId,
        };
        
        initialState.currentUser = mappedUser;
        console.log('✅ 从服务器获取用户信息成功（已映射）:', mappedUser);
        console.log('✅ 用户名:', mappedUser.userName);
        console.log('✅ 用户头像:', mappedUser.userAvatar);
      } else {
        console.error('❌ 无法解析用户信息，响应结构:', {
          hasRes: !!resAny,
          hasResData: !!resAny?.data,
          hasResDataData: !!resAny?.data?.data,
          resKeys: resAny ? Object.keys(resAny) : [],
          resDataKeys: resAny?.data ? Object.keys(resAny.data) : []
        });
      }
    } catch (error: any) {
      // 如果获取用户信息失败（token 过期或无效），清除 token
      console.error('❌ 获取用户信息失败:', error);
      console.error('❌ 错误详情:', error.message || error);
      localStorage.removeItem('token');
      // 如果不在登录页，跳转到登录页
      const { location } = history;
      if (location.pathname !== loginPath) {
        window.location.href = `/user/login?redirect=${location.pathname}`;
      }
    }
  } else {
    // 没有 token，如果不在登录页，跳转到登录页
    const { location } = history;
    if (location.pathname !== loginPath) {
      // 不自动跳转，让用户手动登录
      console.log('ℹ️ 未找到 token，用户需要登录');
    }
  }
  
  return initialState;
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
// @ts-ignore
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    // avatarProps: {
    //   render: () => {
    //     return <AvatarDropdown />;
    //   },
    // },
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    // footerRender: () => <Footer />,
    headerRender: () => <Header />,
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...defaultSettings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;
