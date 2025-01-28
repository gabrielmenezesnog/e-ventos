"use client";

import React from "react";
import SectionTitle from "@/components/atoms/Title/SectionTitle";
import { iTickets } from "@/interfaces/iTickets";
import TicketsList from "@/components/atoms/TicketsList";

interface iProps {
  tickets: iTickets[];
  isLoading?: boolean;
}

const BestSellersSection: React.FC<iProps> = ({ tickets, isLoading }) => {
  return (
    <div className="mb-10">
      <div>
        <div className="container px-5">
          <SectionTitle
            normalText="mais procurados"
            coloredText="."
            isDark={false}
          />
        </div>

        <div className="flex flex-row justify-center">
          <TicketsList tickets={tickets} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default BestSellersSection;
