"use client";

import React from "react";
import SectionTitle from "../Title/SectionTitle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../Button";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  const router = useRouter();

  return (
    <section aria-label="Título da Página" className="bg-gray_11 p-4">
      <div className="container">
        <Button
          type="default"
          onClick={() => router.back()}
          className="bg-transparent p-0 mb-8"
        >
          <Image
            src="/images/get-back.svg"
            width={40}
            height={40}
            alt="Voltar"
          />
        </Button>

        <p className="text-sm sm:text-base md:text-lg text-gray_5">
          {subtitle}
        </p>
        <SectionTitle normalText={title} coloredText="." />
      </div>
    </section>
  );
};

export default PageHeader;
