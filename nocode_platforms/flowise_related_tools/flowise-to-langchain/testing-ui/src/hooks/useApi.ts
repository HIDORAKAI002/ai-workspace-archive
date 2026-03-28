import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface UseApiQueryOptions {
  enabled?: boolean;
  retry?: boolean | number;
}

export interface UseApiMutationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

// Query hook for GET requests
export function useApiQuery<T = any>(
  key: string | string[],
  endpoint: string,
  options: UseApiQueryOptions = {}
) {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: () => api.get(endpoint),
    enabled: options.enabled ?? true,
    retry: options.retry ?? 3,
  });
}

// Mutation hook for POST/PUT/DELETE requests
export function useApiMutation<T = any>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST',
  options: UseApiMutationOptions = {}
) {
  return useMutation({
    mutationFn: (data: any) => {
      switch (method) {
        case 'POST':
          return api.post(endpoint, data);
        case 'PUT':
          return api.put(endpoint, data);
        case 'DELETE':
          return api.delete(endpoint);
        default:
          return api.post(endpoint, data);
      }
    },
    onSuccess: options.onSuccess,
    onError: options.onError,
  });
}

// Specialized hooks for common operations
export const useFlowConversion = (options: UseApiMutationOptions = {}) => {
  return useApiMutation('/api/flows/convert', 'POST', options);
};

export const useFlowValidation = (options: UseApiMutationOptions = {}) => {
  return useApiMutation('/api/flows/validate', 'POST', options);
};

export const useFlowTesting = (options: UseApiMutationOptions = {}) => {
  return useApiMutation('/api/flows/test', 'POST', options);
};

export const useFlowUpload = (options: UseApiMutationOptions = {}) => {
  return useApiMutation('/api/flows/upload', 'POST', options);
};