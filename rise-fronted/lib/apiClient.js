
/**
 * API Client - Centralized HTTP client for backend communication
 * 
 * This module provides a consistent interface for making API calls to the Laravel backend.
 * It handles authentication tokens, error responses, and provides convenience methods.
 */

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Generic fetcher for SWR
export const fetcher = (path) => apiFetch(path);

// Core fetch function
export async function apiFetch(path, options = {}) {
  const url = `${baseUrl}${path}`;

  // Get auth token from localStorage if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options.headers || {}),
      },
      credentials: 'include', // Include cookies for session-based auth
    });

    // Handle different response types
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(errorData.message || `HTTP ${res.status}: ${res.statusText}`);
    }

    // Return response data
    const data = await res.json();
    return data;
    
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Convenience methods
export function get(path, options = {}) {
  return apiFetch(path, { ...options, method: 'GET' });
}

export function post(path, data, options = {}) {
  return apiFetch(path, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: JSON.stringify(data),
  });
}

export function put(path, data, options = {}) {
  return apiFetch(path, {
    ...options,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: JSON.stringify(data),
  });
}

export function del(path, options = {}) {
  return apiFetch(path, { ...options, method: 'DELETE' });
} 