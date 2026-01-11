'use client';

import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '算力方';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'suanlifang',
          title: '算力方',
          href: '/',
          blankTarget: false,
        },
        {
          key: 'compute-market',
          title: '算力集市',
          href: '/compute-market',
          blankTarget: false,
        },
        {
          key: 'community',
          title: '社区',
          href: '/community',
          blankTarget: false,
        },
      ]}
    />
  );
};
export default Footer;
