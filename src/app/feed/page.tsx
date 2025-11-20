'use client';

import { useAppStore } from '@/stores/app.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CreatePost from '@/components/feed/CreatePost';
import PostCard from '@/components/feed/PostCard';

export default function FeedPage() {
  const user = useAppStore((state) => state.user);
  const posts = useAppStore((state) => state.posts);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow mb-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">🏍️ MotoSocial</h1>
          <div className="flex items-center gap-4">
            <a href="/explore" className="text-gray-600
            <button className="text-gray-600">👥</button>
            <button className="text-gray-600">🔔</button>
            <div className="flex items-center gap-2">
              <span className="text-sm">{user.displayName}</span>
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
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-4">
        {/* Create Post */}
        <CreatePost />

        {/* Feed */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            <p className="text-lg mb-2">Il tuo feed è vuoto</p>
            <p className="text-sm">Inizia a pubblicare qualcosa o segui altri riders!</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} author={user} />
          ))
        )}
      </div>
    </div>
  );
}
