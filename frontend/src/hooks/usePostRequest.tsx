import { useMutation } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import axiosInstance from "../api/axiosInstance";

/**
 * Generic hook for sending POST requests with React Query.
 *
 * @template TData  - Expected response data type
 * @template TVariables - Request body type
 */
export const usePostRequest = <TData, TVariables>(
  url: string,
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: unknown) => void;
    config?: AxiosRequestConfig;
    withAuth?: boolean;
    contentType?: string;
  }
) => {
  const token = localStorage.getItem("jwt");

  const mutation = useMutation<TData, unknown, TVariables>({
    mutationFn: async (variables: TVariables) => {
      // If variables is a FormData instance, let the browser set the Content-Type header
      const isFormData =
        typeof FormData !== "undefined" && variables instanceof FormData;

      const headers: Record<string, string> = {};
      if (!isFormData) {
        headers["Content-Type"] = options?.contentType || "application/json";
      }

      if (options?.withAuth && token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await axiosInstance.post<TData>(url, variables, {
        ...options?.config,
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
