import React from "react";

interface iProps {
  type: "default" | "secondary" | "tertiary";
  onClick?: () => void;
  label?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  label,
  children,
  type,
  onClick,
  className,
  disabled,
}: iProps) => {
  const defaultClass = "bg-primary text-white font-semibold";
  const secondaryClass = "font-medium bg-white text-gray_11 border border-gray-300 hover:bg-gray-50 transition-colors duration-200";

  const buttonClass = type === "default" ? defaultClass : secondaryClass;

  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={() => handleOnClick()}
      className={className ? className : buttonClass}
      disabled={disabled}
    >
      {children || label}
    </button>
  );
};

export default Button;
