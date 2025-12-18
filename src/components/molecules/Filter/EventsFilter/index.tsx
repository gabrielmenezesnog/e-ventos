"use client";

import SearchBar from "@/components/atoms/SearchBar";
import FilterSidebar from "@/components/molecules/FilterSidebar";
import Button from "@/components/atoms/Button";
import { iTickets } from "@/interfaces/iTickets";
import { useTranslation } from "@/hooks/useTranslation";
import { useState, useMemo } from "react";

interface EventsFilterProps {
  tickets: iTickets[];
  onFilter: (filteredTickets: iTickets[]) => void;
}

const EventsFilter = ({ tickets, onFilter }: EventsFilterProps) => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const locationOptions = Array.from(
    new Set(tickets.map((ticket) => ticket.local))
  );

  const filteredResults = useMemo(() => {
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

    return filtered;
  }, [tickets, name, startDate, endDate, location, minPrice, maxPrice]);

  const handleApplyFilters = () => {
    onFilter(filteredResults);
    setIsSidebarOpen(false);
  };

  const handleClearFilters = () => {
    setName("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    onFilter(tickets);
    setIsSidebarOpen(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    const filteredByName = tickets.filter((ticket) =>
      ticket.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    onFilter(filteredByName);
  };

  return (
    <>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-row gap-4 items-center">
          <SearchBar
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder={t("filters.name")}
          />

          <Button
            type="secondary"
            onClick={() => setIsSidebarOpen(true)}
            label={t("filters.advancedFilters")}
          />
        </div>
      </div>

      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        startDate={startDate}
        endDate={endDate}
        location={location}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onLocationChange={setLocation}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        locationOptions={locationOptions}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        resultsCount={filteredResults.length}
        totalCount={tickets.length}
      />
    </>
  );
};

export default EventsFilter;
