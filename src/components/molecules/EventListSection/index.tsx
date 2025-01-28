"use client";

import { useCallback, useState, useEffect } from "react";
import TicketsList from "@/components/atoms/TicketsList";
import { iTickets } from "@/interfaces/iTickets";
import { getTickets } from "@/services/tickets/getTickets";
import EventsFilter from "../Filter/EventsFilter";

interface iProps {
  tickets: iTickets[];
  isLoading: boolean;
}

const EventListSection = ({ tickets }: iProps) => {
  const [filteredTickets, setFilteredTickets] = useState<iTickets[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      const { data } = await getTickets();

      setFilteredTickets(data);
      setIsLoading(false);
    };

    fetchTickets();
  }, []);

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
