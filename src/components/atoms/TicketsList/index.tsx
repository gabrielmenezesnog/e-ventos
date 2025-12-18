"use client";

import React from "react";
import { iTickets } from "@/interfaces/iTickets";
import Loading from "../Loading";
import EventCard from "../EventCard";

interface iProps {
  tickets: iTickets[];
  isLoading?: boolean;
  vertical?: boolean;
  unlimitedWidth?: boolean;
  grid?: boolean;
}

const TicketsList: React.FC<iProps> = ({
  tickets,
  isLoading,
  vertical,
  unlimitedWidth,
  grid = false,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  if (tickets.length === 0) {
    return null;
  }

  return (
    <ul
      className={`mt-5 ${
        grid
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-5 pb-5"
          : `flex gap-5 ${
              vertical
                ? "flex-col max-h-[800px] overflow-y-auto"
                : `flex-row items-stretch ${
                    unlimitedWidth
                      ? "max-w-full-unlimited pb-5"
                      : "flex-wrap justify-center lg:max-w-[1320px] pb-5"
                  }`
            } px-5`
      }`}
    >
      {tickets.map((ticket) => (
        <EventCard
          key={ticket.id}
          ticket={ticket}
          vertical={vertical}
          unlimitedWidth={unlimitedWidth}
          grid={grid}
        />
      ))}
    </ul>
  );
};

export default TicketsList;
