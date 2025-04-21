'use client';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Theme() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
  }, [token, router]);

  if (!token) {
    return null; // Return blank if no token
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Themes</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <a href={`/theme/LCK?token=${token}`} className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold">LCK</h2>
        </a>
        <a href={`/theme/LEC?token=${token}`} className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold">LEC</h2>
        </a>
        <a href={`/theme/LCP?token=${token}`} className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold">LCP</h2>
        </a>
        <a href={`/theme/FirstStand2025?token=${token}`} className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold">FirstStand2025</h2>
        </a>
      </div>
    </div>
  );
} 