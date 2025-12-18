"use client";

import { iComponentWithChildren } from "@/interfaces/iComponent";
import React, { createContext, useContext, useState } from "react";

type LoadingContextType = {
  isLoading: boolean;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  loadingMessage: string;
};

const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

export function LoadingProvider({ children }: iComponentWithChildren) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Carregando...");

  const showLoading = (message = "Carregando...") => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, showLoading, hideLoading, loadingMessage }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error(
      "useLoading deve ser usado dentro de um LoadingProvider"
    );
  }
  return context;
}
