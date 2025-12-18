"use client";

import React from "react";

const MagnifyingGlassIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

interface SearchBarProps {
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "Buscar...",
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray_11 mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray_5" />
        </div>
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full min-w-[300px] pl-10 pr-3 py-2 border border-gray_3 rounded-md bg-gray_1 text-gray_11 placeholder-gray_5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 h-[42px]"
        />
      </div>
    </div>
  );
};

export default SearchBar;
