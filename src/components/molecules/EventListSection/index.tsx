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
    const fetchTickets = () => {
      setIsLoading(true);
      getTickets().then(({ data }) => {
        setFilteredTickets(data);
        setIsLoading(false);
      }).catch((error) => {
        console.error('Error fetching tickets:', error);
        setIsLoading(false);
      });
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
      <TicketsList tickets={filteredTickets} isLoading={isLoading} grid />
    </>
  );
};

export default EventListSection;
