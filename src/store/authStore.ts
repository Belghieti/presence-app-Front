import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  
  // Actions
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,

      // Login
      login: (token: string, user: User) => {
        Cookies.set('token', token, { expires: 1 }); // 1 jour
        Cookies.set('user', JSON.stringify(user), { expires: 1 });
        
        set({
          user,
          token,
          isAuthenticated: true,
          isAdmin: user.role === 'ADMIN',
        });
      },

      // Logout
      logout: () => {
        Cookies.remove('token');
        Cookies.remove('user');
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },

      // Update User
      updateUser: (user: User) => {
        Cookies.set('user', JSON.stringify(user), { expires: 1 });
        set({ user });
      },

      // Check Auth on mount
      checkAuth: () => {
        const token = Cookies.get('token');
        const userStr = Cookies.get('user');
        
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            set({
              user,
              token,
              isAuthenticated: true,
              isAdmin: user.role === 'ADMIN',
            });
          } catch (error) {
            get().logout();
          }
        } else {
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);