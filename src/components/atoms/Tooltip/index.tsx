"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "bottom-left"
    | "bottom-right";
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  delay = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const getTooltipPosition = () => {
    if (!triggerRef.current || !isVisible) return { top: 0, left: 0 };

    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipHeight = 36;
    const tooltipWidth = Math.max(content.length * 7 + 24, 100);

    switch (position) {
      case "top":
        return {
          top: rect.top - tooltipHeight - 8,
          left: rect.left + rect.width / 2 - tooltipWidth / 2,
        };
      case "bottom":
        return {
          top: rect.bottom + 8,
          left: rect.left + rect.width / 2 - tooltipWidth / 2,
        };
      case "bottom-left":
        return {
          top: rect.bottom + 8,
          left: rect.left,
        };
      case "bottom-right":
        return {
          top: rect.bottom + 8,
          left: rect.right,
        };
      case "left":
        return {
          top: rect.top + rect.height / 2 - tooltipHeight / 2,
          left: rect.left - tooltipWidth - 8,
        };
      case "right":
        return {
          top: rect.top + rect.height / 2 - tooltipHeight / 2,
          left: rect.right + 8,
        };
      default:
        return {
          top: rect.top - tooltipHeight - 8,
          left: rect.left + rect.width / 2 - tooltipWidth / 2,
        };
    }
  };

  const tooltipPosition = getTooltipPosition();

  const tooltipContent =
    isVisible && mounted ? (
      <div
        ref={tooltipRef}
        className="fixed z-[1000] px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease-in-out",
        }}
      >
        {content}
        <div
          className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
            position === "top"
              ? "top-full left-1/2 -translate-x-1/2 -mt-1"
              : position === "bottom"
              ? "bottom-full left-1/2 -translate-x-1/2 -mb-1"
              : position === "bottom-left"
              ? "bottom-full left-4 -mb-1"
              : position === "bottom-right"
              ? "bottom-full right-4 -mb-1"
              : position === "left"
              ? "left-full top-1/2 -translate-y-1/2 -mr-1"
              : "right-full top-1/2 -translate-y-1/2 -ml-1"
          }`}
        />
      </div>
    ) : null;

  return (
    <>
      <div className="relative inline-block">
        <div
          ref={triggerRef}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          className="cursor-pointer"
        >
          {children}
        </div>
      </div>
      {mounted && tooltipContent && createPortal(tooltipContent, document.body)}
    </>
  );
};

export default Tooltip;
