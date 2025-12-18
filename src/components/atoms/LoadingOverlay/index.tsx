"use client";

import React from "react";
import { useLoading } from "@/context/Loading";

const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-30 z-[70] backdrop-blur-sm flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default LoadingOverlay;
