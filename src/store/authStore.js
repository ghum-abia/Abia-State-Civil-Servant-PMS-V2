import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      profile: null,
      access_token: localStorage.getItem('pms_token') || null,
      isAuthenticated: !!localStorage.getItem('pms_token'),
      isLoading: false,
      error: null,

      // Login action hitting POST /api/v1/auth/login
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', credentials); //
          
          // Assuming the API returns token and profile object
          const { access_token, profile } = response.data;
          
          localStorage.setItem('pms_token', access_token);
          set({ 
            access_token, 
            profile, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
          
          return profile;
        } catch (error) {
          const errorMsg = error.response?.data?.message || 'Invalid credentials. Please try again.';
          set({ 
            error: errorMsg, 
            isLoading: false 
          });
          throw new Error(errorMsg);
        }
      },

      // Fetch current profile hitting GET /api/v1/auth/me
      fetchProfile: async () => {
        set({ isLoading: true });
        try {
          const response = await api.get('/auth/me');
          set({ 
            profile: response?.data, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          get().logout();
          set({ isLoading: false });
        }
      },

      // Logout action
      logout: () => {
        localStorage.removeItem('pms_token');
        set({ 
          profile: null, 
          access_token: null, 
          isAuthenticated: false,
          error: null 
        });
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'pms-auth-storage',
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated, profile: state.profile }),
    }
  )
);