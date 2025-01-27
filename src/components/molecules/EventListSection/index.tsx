"use client";

import { useCallback, useState } from "react";
import TicketsList from "@/components/atoms/TicketsList";
import { iTickets } from "@/interfaces/iTickets";
import EventsFilter from "../Filter/EventsFilter";

interface iProps {
  tickets: iTickets[];
  isLoading: boolean;
}

const EventListSection = ({ tickets, isLoading }: iProps) => {
  const [filteredTickets, setFilteredTickets] = useState<iTickets[]>(tickets);

  const handleFilter = useCallback((filtered: iTickets[]) => {
    setFilteredTickets(filtered);
  }, []);

  return (
    <>
      <div className="mb-14">
        <EventsFilter tickets={tickets} onFilter={handleFilter} />
      </div>
      <TicketsList tickets={filteredTickets} isLoading={isLoading} vertical />
    </>
  );
};

export default EventListSection;
