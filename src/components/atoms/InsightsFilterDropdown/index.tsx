"use client";

import React from "react";
import { iInsightsFilterOption } from "@/interfaces/iInsightsFilter";
import { useTranslation } from "@/hooks/useTranslation";

interface iInsightsFilterDropdownProps {
  options: iInsightsFilterOption[];
  selectedValue: string;
  onFilterChange: (value: string) => void;
}

const InsightsFilterDropdown: React.FC<iInsightsFilterDropdownProps> = ({
  options,
  selectedValue,
  onFilterChange,
}) => {
  const { t } = useTranslation();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value;
    onFilterChange(value);
  }

  return (
    <div className="w-full max-w-xs">
      <select
        value={selectedValue}
        onChange={handleChange}
        className="w-full text-sm bg-white border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:border-primary hover:border-gray-400 transition-colors duration-200"
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InsightsFilterDropdown;

