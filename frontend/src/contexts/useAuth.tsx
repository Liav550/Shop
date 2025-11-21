import React, { createContext, useContext, useState } from "react";
import { usePostRequest } from "../hooks/usePostRequest";
import { useGetRequest } from "../hooks/useGetRequest";
import type { User } from "../utils/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("jwt")
  );

  // Get user data when token exists
  const { data: userData, isLoading } = useGetRequest<{ user: User }>(
    "/login/me",
    !!token,
    token ?? undefined
  );

  // Post request for login
  const { mutateAsync: loginRequest, isPending } = usePostRequest<
    {
      token: string;
    },
    { email: string; password: string }
  >("/login");

  const login = async (email: string, password: string) => {
    const res = await loginRequest({ email, password });
    localStorage.setItem("jwt", res.token);
    setToken(res.token);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
  };

  const isAuthenticated = !!token && !!userData?.user;

  return (
    <AuthContext.Provider
      value={{
        user: userData?.user ?? null,
        token,
        isAuthenticated,
        isLoading: isLoading || isPending,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
