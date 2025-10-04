/**
 * Simple Auth Store - Based on actual signup response
 * 
 * Manages authentication state with the exact response structure
 * we receive from our Laravel backend.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State - Based on our actual response
      user: null,           // { id: 1, name: "Kennedy Kawawa", email: "ken@gmail.com", ... }
      token: null,          // "1|OpryzMUSTBZzLbgURuYTdXruplFaQ5qYZm6gPbyP8c9e4d75"
      isAuthenticated: false,
      isLoading: false,     // Loading state for UI
      error: null,          // Error messages
      
      // Actions
      /**
       * Set auth data from signup/login response
       * @param {Object} response - The response from backend
       * @param {string} response.status - "success"
       * @param {string} response.message - "Registration successful"
       * @param {Object} response.user - User object
       * @param {string} response.token - API token
       */
      setAuth: (response) => {
        // Store token in localStorage for API calls
        if (typeof window !== 'undefined' && response.token) {
          localStorage.setItem('auth-token', response.token);
        }
        
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          error: null,        // Clear any previous errors
        })
      },

      /**
       * Set loading state
       * @param {boolean} loading - Loading state
       */
      setLoading: (loading) => {
        set({ isLoading: loading })
      },

      /**
       * Set error message
       * @param {string} error - Error message
       */
      setError: (error) => {
        set({ error, isLoading: false })
      },

      /**
       * Clear error message
       */
      clearError: () => {
        set({ error: null })
      },

      /**
       * Logout user and clear all auth data
       */
      logout: () => {
        // Clear localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-token');
        }
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,        // Clear errors on logout
          isLoading: false,   // Clear loading state
        })
      },

      /**
       * Check if user is authenticated
       */
      isLoggedIn: () => {
        const state = get();
        return state.isAuthenticated && state.user && state.token;
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      // Persist user data and auth status
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
        // Note: Don't persist error or isLoading states
      }),
    }
  )
)