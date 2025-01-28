"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { iTickets } from "@/interfaces/iTickets";
import { useState } from "react";

interface EventsFilterProps {
  tickets: iTickets[];
  onFilter: (filteredTickets: iTickets[]) => void;
}

const EventsFilter = ({ tickets, onFilter }: EventsFilterProps) => {
  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const locationOptions = Array.from(
    new Set(tickets.map((ticket) => ticket.local))
  );

  const filterTickets = () => {
    let filtered = tickets;

    if (name) {
      filtered = filtered.filter((ticket) =>
        ticket.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (startDate) {
      filtered = filtered.filter(
        (ticket) => new Date(ticket.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (ticket) => new Date(ticket.date) <= new Date(endDate)
      );
    }
    if (location) {
      filtered = filtered.filter((ticket) =>
        ticket.local.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (minPrice) {
      filtered = filtered.filter(
        (ticket) => ticket.price >= parseFloat(minPrice)
      );
    }
    if (maxPrice) {
      filtered = filtered.filter(
        (ticket) => ticket.price <= parseFloat(maxPrice)
      );
    }

    onFilter(filtered);
  };

  const resetFilters = () => {
    setName("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    onFilter(tickets);
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        <div className="w-full sm:w-auto">
          <Input
            id="name"
            label="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Input
            id="startDate"
            label="Data Inicial"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Input
            id="endDate"
            label="Data Final"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-auto -mt-1">
          <Input
            id="location"
            label="Local"
            type="select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            options={locationOptions}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Input
            id="minPrice"
            label="Preço Mínimo"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Input
            id="maxPrice"
            label="Preço Máximo"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row items-center gap-4">
        <Button type="default" label="Filtrar" onClick={filterTickets} />
        <Button
          type="secondary"
          label="Limpar Filtros"
          onClick={resetFilters}
        />
      </div>
    </div>
  );
};

export default EventsFilter;
