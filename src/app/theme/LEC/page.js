'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LECTheme() {
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
      <h1 className="text-3xl font-bold">LEC Theme</h1>
      <div className="mt-6">
        <p>Token: {token}</p>
        {/* LEC theme content will go here */}
      </div>
    </div>
  );
} 