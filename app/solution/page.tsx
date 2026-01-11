'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SolutionRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/university-solution');
  }, [router]);

  return null;
}
