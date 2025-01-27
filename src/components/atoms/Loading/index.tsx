"use-client";

import React from "react";

interface LoadingProps {
  isDark?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isDark = false }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center my-10">
      <p className={`mt-5 ${isDark ? "text-white" : "text-black"}`}>
        Carregando...
      </p>
    </div>
  );
};

export default Loading;
