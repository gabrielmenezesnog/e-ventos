"use client";

import { getUser } from "@/services/auth/getUser";
import { register } from "@/services/auth/register";
import React, { createContext, useContext, useState } from "react";
import { iComponentWithChildren } from "@/interfaces/iComponent";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: iComponentWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = (email: string, password: string) => {
    getUser().then((user) => {
      if (email === user.email && password === user.password) {
        setIsLoggedIn(true);
        sessionStorage.setItem("isLoggedIn", "true");
        window.location.href = "/";
      }
    }).catch((error) => {
      console.error('Login error:', error);
    });
  };

  const signUp = (email: string, password: string) => {
    register({ email, password }).then(() => {
      setIsLoggedIn(true);
      sessionStorage.setItem("isLoggedIn", "true");
      window.location.href = "/";
    }).catch((error) => {
      console.error('Sign up error:', error);
    });
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
