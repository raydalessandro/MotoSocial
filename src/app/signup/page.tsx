'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/stores/app.store';

export default function SignupPage() {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    displayName: '',
    motoModel: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Per ora signup mock
    const newUser = {
      id: Date.now().toString(),
      email: formData.email,
      username: formData.username,
      displayName: formData.displayName,
      motoModel: formData.motoModel,
      followersCount: 0,
      followingCount: 0,
      routesCount: 0,
      createdAt: new Date().toISOString(),
    };
    
    setUser(newUser);
    router.push('/feed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">MotoSocial</h1>
        <h2 className="text-xl mb-4">Registrati</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nome visualizzato"
              className="w-full p-2 border rounded"
              value={formData.displayName}
              onChange={(e) => setFormData({...formData, displayName: e.target.value})}
              required
            />
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="La tua moto (es: Yamaha MT-09)"
              className="w-full p-2 border rounded"
              value={formData.motoModel}
              onChange={(e) => setFormData({...formData, motoModel: e.target.value})}
            />
          </div>
          
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Registrati
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm">
          Hai già un account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Accedi
          </a>
        </p>
      </div>
    </div>
  );
}
