'use client';

import { useState } from 'react';
import { useAppStore } from '@/stores/app.store';
import { Post } from '@/types/models';

export default function CreatePost() {
  const user = useAppStore((state) => state.user);
  const addPost = useAppStore((state) => state.addPost);
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    const newPost: Post = {
      id: Date.now().toString(),
      authorId: user.id,
      type: 'text',
      content,
      visibility: 'public',
      likes: [],
      comments: [],
      shares: 0,
      createdAt: new Date().toISOString(),
    };

    addPost(newPost);
    setContent('');
    setIsOpen(false);
  };

  const handleRouteClick = () => {
    window.location.href = '/explore';
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full text-left text-gray-500 hover:text-gray-700"
        >
          A cosa stai pensando, {user?.displayName}?
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border rounded resize-none"
            rows={3}
            placeholder="Condividi la tua esperienza in moto..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          />
          <div className="flex justify-between mt-2">
            <div className="flex gap-2">
              <button
                type="button"
                className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                📷 Foto
              </button>
              <button
                type="button"
                onClick={handleRouteClick}
                className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                📍 Percorso
              </button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-sm text-gray-500"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Pubblica
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
