'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    // 重定向到根路径页面
    router.replace('/');
  }, [router]);

  return null;
}
