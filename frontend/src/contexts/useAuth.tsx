import React, { createContext, useContext, useState } from "react";
import { usePostRequest } from "../hooks/usePostRequest";
import { useGetRequest } from "../hooks/useGetRequest";
import type { GoogleLoginProps, LocalLoginProps, User } from "../utils/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  googleLogin: (email: string, sub: string) => Promise<void>;
  rememberMe: boolean;
  setRemember: (value: boolean) => void;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setToken: () => {},
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  googleLogin: async () => {},
  logout: () => {},
  rememberMe: false,
  setRemember: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("jwt")
  );

  const [rememberMe, setRememberMe] = useState<boolean>(false);

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
    LocalLoginProps | GoogleLoginProps
  >("/login");

  const login = async (email: string, password: string) => {
    const res = await loginRequest({ email, password, provider: "local" });
    localStorage.setItem("jwt", res.token);
    setToken(res.token);
  };

  const googleLogin = async (email: string, sub: string) => {
    const res = await loginRequest({ email, sub, provider: "google" });
    localStorage.setItem("jwt", res.token);
    setToken(res.token);
  };

  const changeToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("jwt", newToken);
    }
  };

  const setRemember = (value: boolean) => {
    setRememberMe(value);
    localStorage.setItem("rememberMe", value ? "true" : "false");
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("rememberMe");
    setRememberMe(false);
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
        googleLogin,
        logout,
        rememberMe,
        setRemember,
        setToken: changeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
