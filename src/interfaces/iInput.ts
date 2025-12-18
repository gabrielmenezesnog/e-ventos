import React from "react";

export interface iInputProps {
  type: "text" | "date" | "number" | "select" | "password";
  value: string | number | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  id?: string;
  label?: string;
  options?: string[];
  className?: string;
  min?: number;
  max?: number | null;
}
