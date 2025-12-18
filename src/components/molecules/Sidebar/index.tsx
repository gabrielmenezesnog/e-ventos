"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import { useTranslation } from "@/hooks/useTranslation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  position?: "left" | "right";
  width?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  position = "right",
  width = "w-full sm:w-[600px]",
}) => {
  const { t } = useTranslation();

  const translateClass =
    position === "left"
      ? isOpen
        ? "translate-x-0"
        : "-translate-x-[calc(100%+1.25rem)]"
      : isOpen
      ? "translate-x-0"
      : "translate-x-[calc(100%+1.25rem)]";

  const positionClass = position === "left" ? "left-5" : "right-5";

  return (
    <>
      <div
        className={`fixed inset-0 bg-white bg-opacity-30 z-[55] transition-opacity duration-300 backdrop-blur-sm ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-5 bottom-5 ${positionClass} h-[calc(100vh-40px)] bg-white transition-transform duration-300 ease-in-out shadow-lg z-[60] ${width} rounded-lg ${translateClass}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          <Button type="default" onClick={onClose} className="p-2 bg-gray-200 rounded text-sm">
            <Image
              src="/images/close.svg"
              alt={t("cart.close")}
              width={20}
              height={20}
            />
          </Button>
        </div>

        <div className={`p-5 overflow-y-auto ${footer ? "h-[calc(100%-180px)]" : "h-[calc(100%-80px)]"}`}>
          {children}
        </div>

        {footer && (
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t bg-white rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
