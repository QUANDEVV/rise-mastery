import { post } from "../../lib/apiClient.js";
import { useAuthStore } from "../../zustand";

/**
 * Login Hook - Handles user authentication with Zustand
 * 
 * This hook provides login functionality using our Zustand auth store.
 * Directly integrates with global state management.
 */
export function useLogin() {
  const { setAuth, setLoading, setError, clearError } = useAuthStore();

  // Login function using post method
  const login = async (credentials) => {
    try {
      // Clear any previous errors and set loading state
      clearError();
      setLoading(true);

      const response = await post("/auth/login", credentials);
      
      // Store user and token in Zustand store
      if (response.user && response.token) {
        setAuth(response.user, response.token);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  return {
    login,
  };
}