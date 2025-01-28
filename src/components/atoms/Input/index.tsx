import React from "react";

interface iProps {
  type: "text" | "date" | "number" | "select";
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

const Input = ({
  id,
  label,
  type,
  value,
  onChange,
  options,
  className,
  min = 0,
  max = null,
}: iProps) => {
  const baseClass =
    "w-full text-sm bg-gray_1 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 mb-0";

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {type === "select" ? (
        <select
          id={id}
          value={value || ""}
          onChange={onChange}
          className={`${baseClass} h-[45px] ${className || ""}`}
        >
          <option value="">Todos</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          value={value || ""}
          onChange={onChange}
          placeholder={type === "date" ? "DD/MM/YYYY" : undefined}
          pattern={type === "date" ? "\\d{2}/\\d{2}/\\d{4}" : undefined}
          className={`${baseClass} h-[45px] ${className || ""}`}
          min={min}
          max={max || undefined}
        />
      )}
    </div>
  );
};

export default Input;
