'use client';

import { Post, User } from '@/types/models';
import { useState } from 'react';
import { useAppStore } from '@/stores/app.store';

interface PostCardProps {
  post: Post;
  author: User;
}

export default function PostCard({ post, author }: PostCardProps) {
  const currentUser = useAppStore((state) => state.user);
  const [liked, setLiked] = useState(post.likes.includes(currentUser?.id || ''));
  const [likes, setLikes] = useState(post.likes.length);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Adesso';
    if (hours < 24) return `${hours}h fa`;
    if (hours < 48) return 'Ieri';
    return date.toLocaleDateString('it-IT');
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      {/* Header */}
      <div className="p-4 flex items-center">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {author.displayName[0]}
        </div>
        <div className="ml-3">
          <div className="font-semibold">{author.displayName}</div>
          <div className="text-sm text-gray-500">
            {author.motoModel} • {formatDate(post.createdAt)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-800">{post.content}</p>
      </div>

      {/* Stats */}
      {(likes > 0 || post.comments.length > 0) && (
        <div className="px-4 pb-2 flex justify-between text-sm text-gray-500">
          <span>{likes > 0 && `${likes} Mi piace`}</span>
          <span>{post.comments.length > 0 && `${post.comments.length} commenti`}</span>
        </div>
      )}

      {/* Actions */}
      <div className="border-t flex">
        <button
          onClick={handleLike}
          className={`flex-1 py-2 hover:bg-gray-50 ${
            liked ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          {liked ? '👍 Mi piace' : '👍 Mi piace'}
        </button>
        <button className="flex-1 py-2 text-gray-500 hover:bg-gray-50">
          💬 Commenta
        </button>
        <button className="flex-1 py-2 text-gray-500 hover:bg-gray-50">
          ↗️ Condividi
        </button>
      </div>
    </div>
  );
}
