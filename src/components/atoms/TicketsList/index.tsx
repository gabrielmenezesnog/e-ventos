"use client";

import React from "react";
import { iTickets } from "@/interfaces/iTickets";
import Loading from "../Loading";
import EventCard from "../EventCard";

interface iProps {
  tickets: iTickets[];
  isLoading?: boolean;
  vertical?: boolean;
}

const TicketsList: React.FC<iProps> = ({ tickets, isLoading, vertical }) => {
  if (isLoading) {
    return <Loading />;
  }

  if (tickets.length === 0) {
    return null;
  }

  return (
    <ul
      className={`mt-5 flex gap-5 pr-5 ${
        vertical
          ? "flex-col max-h-[800px] overflow-y-auto"
          : "overflow-x-auto flex-row lg:max-w-[1320px] lg:overflow-x-scroll pb-5"
      } ml-5`}
    >
      {tickets.map((ticket) => (
        <EventCard key={ticket.id} ticket={ticket} vertical={vertical} />
      ))}
    </ul>
  );
};

export default TicketsList;
