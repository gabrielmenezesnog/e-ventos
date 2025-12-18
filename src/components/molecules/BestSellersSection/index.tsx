"use client";

import React from "react";
import SectionTitle from "@/components/atoms/Title/SectionTitle";
import { iTickets } from "@/interfaces/iTickets";
import TicketsList from "@/components/atoms/TicketsList";
import { useTranslation } from "@/hooks/useTranslation";

interface iProps {
  tickets: iTickets[];
  isLoading?: boolean;
}

const BestSellersSection: React.FC<iProps> = ({ tickets, isLoading }) => {
  const { t } = useTranslation();

  if (!tickets || tickets.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <div>
        <div className="container px-5">
          <SectionTitle
            normalText={t("bestSellers.title")}
            coloredText={t("bestSellers.titleHighlight")}
            isDark={false}
          />
        </div>

        <div className="flex flex-row justify-start md:justify-center overflow-x-auto mx-5 md:mx-10">
          <TicketsList tickets={tickets} isLoading={isLoading} unlimitedWidth />
        </div>
      </div>
    </div>
  );
};

export default BestSellersSection;
