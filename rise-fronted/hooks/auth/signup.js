import { post } from "../../lib/apiClient.js";
import { useAuthStore } from "../../zustand/index.js";

/**
 * Signup Hook - Handles user registration with Zustand integration
 * 
 * This hook provides signup functionality and directly updates Zustand global state.
 */
export function useSignup() {
  const { setAuth } = useAuthStore();

  // Signup function using post method
  const signup = async (userData) => {
    try {
      const response = await post("/auth/register", userData);
      
      // Directly update Zustand global state
      setAuth(response);
      
      return response;
    } catch (err) {
      throw err;
    }
  };

  return {
    signup,
  };
}