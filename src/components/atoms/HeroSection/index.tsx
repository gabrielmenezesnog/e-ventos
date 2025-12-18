"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../Button";
import { useTranslation } from "@/hooks/useTranslation";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section>
      <div className="bg-black relative mb-28 md:shadow-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-medium leading-tight">
              {t('hero.title')} <span className="text-primary">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray_5 mt-4 mb-10">
              {t('hero.subtitle')}
            </p>

            <div className="mb-10 md:mb-0">
              <Button type="default">
                <Link href="/events" className="font-medium">
                  {t('hero.ctaButton')}
                </Link>
              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <Image
              src="/images/img-intro.jpg"
              alt="Show Alok BC 15/10/2025 - Fotografia"
              className="rounded-lg"
              width={640}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
