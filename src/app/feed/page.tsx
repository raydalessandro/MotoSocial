'use client';

import { useAppStore } from '@/stores/app.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FeedPage() {
  const user = useAppStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow mb-4">
        <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">MotoSocial</h1>
          <div className="flex items-center gap-4">
            <span>{user.displayName}</span>
            <button 
              onClick={() => {
                useAppStore.getState().setUser(null);
                router.push('/');
              }}
              className="text-sm text-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-lg font-semibold mb-2">
            Benvenuto {user.displayName}!
          </h2>
          <p>Il feed arriverà presto...</p>
        </div>
      </div>
    </div>
  );
}
