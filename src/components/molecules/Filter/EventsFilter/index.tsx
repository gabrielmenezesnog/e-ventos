"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { iTickets } from "@/interfaces/iTickets";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";

interface EventsFilterProps {
  tickets: iTickets[];
  onFilter: (filteredTickets: iTickets[]) => void;
}

const EventsFilter = ({ tickets, onFilter }: EventsFilterProps) => {
  const { t } = useTranslation();
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
            label={t('filters.name')}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Input
            id="startDate"
            label={t('filters.startDate')}
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Input
            id="endDate"
            label={t('filters.endDate')}
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-auto -mt-1">
          <Input
            id="location"
            label={t('filters.location')}
            type="select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            options={locationOptions}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Input
            id="minPrice"
            label={t('filters.minPrice')}
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Input
            id="maxPrice"
            label={t('filters.maxPrice')}
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row items-center gap-4">
        <Button type="default" label={t('filters.filterButton')} onClick={filterTickets} />
        <Button
          type="secondary"
          label={t('filters.clearFilters')}
          onClick={resetFilters}
        />
      </div>
    </div>
  );
};

export default EventsFilter;
