"use client";

import React from "react";
import SectionTitle from "../Title/SectionTitle";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <section aria-label="Título da Página" className="bg-gray_11 p-4">
      <div className="container">
        <p className="text-sm sm:text-base md:text-lg text-gray_5">
          {subtitle}
        </p>
        <SectionTitle normalText={title} coloredText="." />
      </div>
    </section>
  );
};

export default PageHeader;
