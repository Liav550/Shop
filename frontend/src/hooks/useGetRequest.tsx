import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useGetRequest = <TData = unknown, TError = unknown>(
  url: string,
  enabled: boolean = true,
  token?: string
): UseQueryResult<TData, TError> => {
  return useQuery<TData, TError>({
    queryKey: ["GET", url, token ?? null],
    queryFn: async () => {
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const res = await axiosInstance.get<TData>(url, { headers });
      return res.data as TData;
    },
    enabled,
    retry: false,
  });
};
