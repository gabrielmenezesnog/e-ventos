"use client";

import React, { useState, useRef, useEffect } from "react";

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface DropdownProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-gray_1 border border-gray_3 rounded-md shadow-sm hover:bg-gray_2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
      >
        <span className="text-gray_11 font-medium">{label}</span>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray_5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute z-10 mt-1 w-full bg-gray_1 border border-gray_3 rounded-md shadow-lg transition-all duration-200 ease-in-out ${
          isOpen
            ? "opacity-100 transform scale-100 translate-y-0"
            : "opacity-0 transform scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
