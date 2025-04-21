'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';

function LCKContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    
    if (!tokenParam) {
      // If no token in URL, redirect to login
      router.push('/auth/login');
      return;
    }
    
    setToken(tokenParam);
    setLoading(false);
  }, [searchParams, router]);

  if (loading) {
    return <div className="min-h-screen p-8">Loading...</div>;
  }

  if (!token) {
    return null; // Return blank if no token
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">LCK Theme</h1>
      <div className="mt-6">
        <p>Token: {token}</p>
        {/* LCK theme content will go here */}
      </div>
    </div>
  );
}

export default function LCKTheme() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8">Loading...</div>}>
      <LCKContent />
    </Suspense>
  );
} 