import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import type { AxiosRequestConfig } from "axios";

/**
 * Generic hook for sending POST requests with React Query.
 *
 * @template TData  - Expected response data type
 * @template TVariables - Request body type
 */
export const useDeleteRequest = <TData, TVariables>(
  url: string,
  options?: {
    config?: AxiosRequestConfig;
    onSuccess?: (data: TData) => void;
    onError?: (error: unknown) => void;
    withAuth?: boolean;
  }
) => {
  const token = localStorage.getItem("jwt");

  const mutation = useMutation<TData, unknown, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const headers: Record<string, string> = {};

      if (options?.withAuth && token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await axiosInstance.delete<TData>(url, {
        ...options?.config,
        data: variables,
        headers: { ...headers, ...(options?.config?.headers || {}) },
      });

      return res.data;
    },
    onSuccess: (data) => {
      if (options?.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
      if (options?.onError) options.onError(error);
    },
  });

  return mutation;
};
