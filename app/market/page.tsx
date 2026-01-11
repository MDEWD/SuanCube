'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MarketRedirect() {
  const router = useRouter();

  useEffect(() => {
    // 重定向到正确的算力集市页面
    router.replace('/compute-market');
  }, [router]);

  return null;
}
