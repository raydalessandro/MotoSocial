'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/stores/app.store';
import dynamic from 'next/dynamic';
import GPXUploader from '@/components/routes/GPXUploader';

const RouteMap = dynamic(() => import('@/components/routes/RouteMap'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
});

export default function ExplorePage() {
  const user = useAppStore((state) => state.user);
  const routes = useAppStore((state) => state.routes);
  const router = useRouter();
  const [showUpload, setShowUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Aspetta un attimo per l'idratazione dello store
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!user) {
        router.push('/login');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">🏍️</div>
          <p>Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow mb-4">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">🏍️ MotoSocial</h1>
          <div className="flex items-center gap-4">
            <a href="/feed" className="text-gray-600 hover:text-black">Feed</a>
            <a href="/explore" className="text-black font-semibold">Mappa</a>
            <button 
              onClick={() => setShowUpload(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              + Carica GPX
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">
            Percorsi nella tua zona
          </h2>
          <RouteMap routes={routes} height="500px" />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route) => (
            <div key={route.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold">{route.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {route.description || 'Nessuna descrizione'}
              </p>
              <div className="mt-2 text-sm text-gray-500">
                📏 {route.distance.toFixed(1)} km
              </div>
              <div className="mt-3 flex gap-2">
                <button className="text-blue-500 text-sm hover:underline">
                  Visualizza
                </button>
                <button className="text-blue-500 text-sm hover:underline">
                  Scarica GPX
                </button>
              </div>
            </div>
          ))}
          
          {routes.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              Nessun percorso ancora. Sii il primo a condividerne uno!
            </div>
          )}
        </div>
      </div>

      {showUpload && <GPXUploader onClose={() => setShowUpload(false)} />}
    </div>
  );
}
