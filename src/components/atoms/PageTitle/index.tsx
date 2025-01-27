"use client";

import React from "react";
import SectionTitle from "../Title/SectionTitle";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  const router = useRouter();

  return (
    <section aria-label="Título da Página" className="bg-gray_11 p-4">
      <div className="container">
        <button className="icon_button mb-8" onClick={() => router.back()}>
          <Image
            src="/images/get-back.svg"
            width={40}
            height={40}
            alt="Voltar"
          />
        </button>

        <p className="text-sm sm:text-base md:text-lg text-gray_5">
          {subtitle}
        </p>
        <SectionTitle normalText={title} coloredText="." />
      </div>
    </section>
  );
};

export default PageHeader;
