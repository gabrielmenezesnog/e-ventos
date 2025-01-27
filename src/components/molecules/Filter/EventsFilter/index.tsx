"use client";

import Input from "@/components/atoms/Input";
import { iTickets } from "@/interfaces/iTickets";
import { useState, useEffect, SetStateAction } from "react";

interface EventsFilterProps {
  tickets: iTickets[];
  onFilter: (filteredTickets: iTickets[]) => void;
}

const EventsFilter = ({ tickets, onFilter }: EventsFilterProps) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const uniqueLocations = Array.from(
    new Set(tickets.map((ticket) => ticket.local))
  );

  const maxTicketPrice = tickets.reduce(
    (max, ticket) => Math.max(max, ticket.price),
    0
  );

  useEffect(() => {
    let filteredTickets = tickets;

    if (startDate) {
      filteredTickets = filteredTickets.filter(
        (ticket) =>
          new Date(ticket.date).toISOString().split("T")[0] >= startDate
      );
    }

    if (endDate) {
      filteredTickets = filteredTickets.filter(
        (ticket) => new Date(ticket.date).toISOString().split("T")[0] <= endDate
      );
    }

    if (location) {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.local === location
      );
    }

    if (minPrice) {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.price <= parseFloat(maxPrice)
      );
    } else if (maxPrice !== "") {
      setMaxPrice(maxTicketPrice.toString());
    }

    onFilter(filteredTickets);
  }, [startDate, endDate, location, minPrice, maxPrice, tickets]);

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          id="startDate"
          label="Data Inicial"
          type="date"
          value={startDate}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setStartDate(e.target.value)
          }
        />

        <Input
          id="endDate"
          label="Data Final"
          type="date"
          value={endDate}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setEndDate(e.target.value)
          }
        />

        <Input
          id="location"
          label="Local"
          type="select"
          value={location}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setLocation(e.target.value)
          }
          options={uniqueLocations}
        />
      </div>
      <div className="flex flex-row items-center gap-5">
        <Input
          id="minPrice"
          label="Preço Mínimo"
          type="number"
          value={minPrice}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setMinPrice(e.target.value)
          }
        />

        <Input
          id="maxPrice"
          label="Preço Máximo"
          type="number"
          value={maxPrice}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setMaxPrice(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default EventsFilter;
