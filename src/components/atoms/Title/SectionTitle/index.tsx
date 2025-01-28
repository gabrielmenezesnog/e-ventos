"use client";

import React from "react";

interface iProps {
  normalText: string;
  coloredText: string;
  isDark?: boolean;
}

const SectionTitle: React.FC<iProps> = ({
  normalText,
  coloredText,
  isDark = true,
}) => {
  return (
    <h1
      className={`${
        isDark ? "text-white" : "text-black"
      } text-4xl sm:text-5xl md:text-6xl font-medium leading-tight`}
    >
      {normalText}
      <span className="text-primary">{coloredText}</span>
    </h1>
  );
};

export default SectionTitle;
