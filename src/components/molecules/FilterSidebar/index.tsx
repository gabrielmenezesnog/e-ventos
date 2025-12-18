"use client";

import React from "react";
import Sidebar from "@/components/molecules/Sidebar";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { useTranslation } from "@/hooks/useTranslation";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: string;
  endDate: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  locationOptions: string[];
  onApply: () => void;
  onClear: () => void;
  resultsCount: number;
  totalCount: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  startDate,
  endDate,
  location,
  minPrice,
  maxPrice,
  onStartDateChange,
  onEndDateChange,
  onLocationChange,
  onMinPriceChange,
  onMaxPriceChange,
  locationOptions,
  onApply,
  onClear,
  resultsCount,
  totalCount,
}) => {
  const { t } = useTranslation();

  const footerContent = (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-lg font-semibold text-gray_11">
          {t("filters.resultsCount")}: {resultsCount} / {totalCount}
        </p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Button type="default" label={t("filters.filterButton")} onClick={onApply} />
        <Button type="secondary" label={t("filters.clearFilters")} onClick={onClear} />
      </div>
    </div>
  );

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={t("filters.advancedFilters")}
      position="left"
      footer={footerContent}
    >
      <div className="space-y-4">
        <Input
          id="startDate"
          label={t("filters.startDate")}
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />

        <Input
          id="endDate"
          label={t("filters.endDate")}
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />

        <Input
          id="location"
          label={t("filters.location")}
          type="select"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          options={locationOptions}
        />

        <Input
          id="minPrice"
          label={t("filters.minPrice")}
          type="number"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
        />

        <Input
          id="maxPrice"
          label={t("filters.maxPrice")}
          type="number"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
        />
      </div>
    </Sidebar>
  );
};

export default FilterSidebar;