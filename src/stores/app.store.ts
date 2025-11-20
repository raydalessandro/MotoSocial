import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Post, Route } from '@/types/models';

type AppState = {
  user: User | null;
  isAuthenticated: boolean;
  posts: Post[];
  routes: Route[];
  
  setUser: (user: User | null) => void;
  addPost: (post: Post) => void;
  addRoute: (route: Route) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      posts: [],
      routes: [],
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
      addRoute: (route) => set((state) => ({ routes: [...state.routes, route] })),
    }),
    {
      name: 'motosocial-storage',
    }
  )
);
