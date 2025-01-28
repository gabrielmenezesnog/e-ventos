"use client";

import { getUser } from "@/services/auth/getUser";
import { register } from "@/services/auth/register";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    const user = await getUser();

    if (email === user.email && password === user.password) {
      setIsLoggedIn(true);
      sessionStorage.setItem("isLoggedIn", "true");

      window.location.href = "/";
    }
  };

  const signUp = async (email: string, password: string) => {
    await register({ email, password });

    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");

    window.location.href = "/";
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
  };

  React.useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth precisa ser usado com um AuthProvider");
  }
  return context;
};
