"use client";

import React from "react";
import { iTickets } from "@/interfaces/iTickets";
import Loading from "@/components/atoms/Loading";

interface iProps {
  ticket: iTickets;
  isLoading?: boolean;
}

const EventBuySection: React.FC<iProps> = ({ ticket, isLoading }) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mb-10">
      <div className="container"></div>
    </div>
  );
};

export default EventBuySection;
