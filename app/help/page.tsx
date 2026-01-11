'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HelpRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/help-documentation');
  }, [router]);

  return null;
}
