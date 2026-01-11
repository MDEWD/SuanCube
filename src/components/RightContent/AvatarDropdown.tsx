'use client';

import { userLogoutUsingPost } from '@/services/backend/userController';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Space } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const router = useRouter();
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await userLogoutUsingPost();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/login' && !redirect) {
      // 使用 URLSearchParams 替代 querystring
      const searchParams = new URLSearchParams();
      searchParams.set('redirect', pathname + search);
      router.replace(`/login?${searchParams.toString()}`);
    } else {
      router.replace('/login');
    }
    // 清除本地存储的token
    localStorage.removeItem('token');
  };

  // 简化的用户状态管理，从localStorage获取用户信息
  const [currentUser, setCurrentUser] = React.useState<any>(null);
  
  // 从localStorage获取用户信息
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 这里可以添加获取用户信息的逻辑
      // 暂时使用mock数据
      const mockUser = {
        id: '1',
        userName: '用户',
        userAvatar: null,
        userRole: 'USER',
        createTime: new Date().toISOString(),
        userProfile: '',
        displayId: 'user1'
      };
      setCurrentUser(mockUser);
    }
  }, []);

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        // 清除用户状态
        setCurrentUser(null);
        loginOut();
        return;
      }
      router.push(`/account/${key}`);
    },
    [],
  );

  if (!currentUser) {
    return (
      <Link
        href="/login"
        className="bg-gradient-to-r from-orange-400 to-orange-300 text-white px-5 py-2 rounded"
      >
        登录/注册
      </Link>
    );
  }

  const menuItems = [
    ...(menu
      ? [
        {
          key: 'center',
          icon: <UserOutlined />,
          label: '个人中心',
        },
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: '个人设置',
        },
        {
          type: 'divider' as const,
        },
      ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      <Space>
        {currentUser?.userAvatar ? (
          <Avatar size="small" src={currentUser?.userAvatar} />
        ) : (
          <Avatar size="small" icon={<UserOutlined />} />
        )}
        <span className="anticon">{currentUser?.userName ?? '无名'}</span>
      </Space>
    </HeaderDropdown>
  );
};

export const AvatarName = () => { };
