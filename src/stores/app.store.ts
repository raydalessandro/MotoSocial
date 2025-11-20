import { create } from 'zustand';
import { User, Post, Route } from '@/types/models';

type AppState = {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  
  // Feed
  posts: Post[];
  
  // Routes
  routes: Route[];
  
  // Actions
  setUser: (user: User | null) => void;
  addPost: (post: Post) => void;
  addRoute: (route: Route) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  posts: [],
  routes: [],
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  addRoute: (route) => set((state) => ({ routes: [...state.routes, route] })),
}));
