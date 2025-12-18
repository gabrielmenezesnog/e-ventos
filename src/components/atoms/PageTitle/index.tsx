"use client";

import React from "react";
import SectionTitle from "../Title/SectionTitle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../Button";
import { useTranslation } from "@/hooks/useTranslation";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <section aria-label={t('pageHeader.pageTitle')} className="bg-gray_11 p-4">
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
            alt={t('navigation.back')}
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
