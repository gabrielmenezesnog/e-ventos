"use client";

import React from "react";
import SectionTitle from "@/components/atoms/Title/SectionTitle";
import { iTickets } from "@/interfaces/iTickets";
import BestSellersCarousel from "@/components/atoms/BestSellersCarousel";

interface iProps {
  tickets: iTickets[];
  isLoading?: boolean;
}

const BestSellersSection: React.FC<iProps> = ({ tickets, isLoading }) => {
  return (
    <div className="mb-10 px-5">
      <div className="container">
        <SectionTitle
          normalText="mais procurados"
          coloredText="."
          isDark={false}
        />

        <BestSellersCarousel tickets={tickets} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default BestSellersSection;
