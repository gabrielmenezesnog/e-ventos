"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full mb-4 sm:mb-0 sm:w-auto sm:flex-none sm:text-left text-center">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={200}
              height={100}
              className="mx-auto sm:mx-0"
            />
          </div>

          <div className="w-fit text-center sm:text-left">
            <h2 className="text-2xl font-bold mb-3">{t('footer.contact')}</h2>
            <ul className="flex flex-col gap-1 text-base">
              <li>+55 41 99992-3767</li>
              <li>gabriel.gmnogueira@gmail.com</li>
              <li>Rua X - Campo Pequeno</li>
              <li>Colombo - PR</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-sm text-center text-gray_6 sm:mt-16 sm:text-left">
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
