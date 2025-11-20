'use client';

import { useState } from 'react';
import { useAppStore } from '@/stores/app.store';
import { Route } from '@/types/models';

export default function GPXUploader({ onClose }: { onClose: () => void }) {
  const user = useAppStore((state) => state.user);
  const addRoute = useAppStore((state) => state.addRoute);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) return;

    setLoading(true);

    const mockRoute: Route = {
      id: Date.now().toString(),
      userId: user.id,
      title,
      description,
      distance: Math.random() * 100 + 50,
      points: [
        { lat: 45.4642, lng: 9.1900 },
        { lat: 45.5842, lng: 9.2500 },
        { lat: 45.6542, lng: 9.3100 },
        { lat: 45.7242, lng: 9.3700 },
      ],
      visibility: 'public',
      stats: {
        views: 0,
        likes: 0,
        downloads: 0,
      },
      createdAt: new Date().toISOString(),
    };

    addRoute(mockRoute);
    
    const routePost = {
      id: Date.now().toString() + '_post',
      authorId: user.id,
      type: 'route' as const,
      content: `Ho condiviso un nuovo percorso: ${title}`,
      routeId: mockRoute.id,
      visibility: 'public' as const,
      likes: [],
      comments: [],
      shares: 0,
      createdAt: new Date().toISOString(),
    };
    
    useAppStore.getState().addPost(routePost);
    
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4" style={{ zIndex: 10000 }}>
        <h2 className="text-xl font-bold mb-4">Carica Percorso GPX</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Titolo del percorso
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="es. Giro del Lago di Como"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Descrizione
            </label>
            <textarea
              className="w-full p-2 border rounded resize-none"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrivi il percorso..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              File GPX
            </label>
            <input
              type="file"
              accept=".gpx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full"
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded hover:bg-gray-50"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Caricamento...' : 'Carica'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
