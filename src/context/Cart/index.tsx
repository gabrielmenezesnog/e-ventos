"use client";

import { iCartTicket } from "@/interfaces/iCartTicket";
import React, { createContext, useContext, useState, ReactNode } from "react";

type CartDrawerContextType = {
  isOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  cartTickets: iCartTicket[];
  setCartTickets: React.Dispatch<React.SetStateAction<iCartTicket[]>>;
};

const CartDrawerContext = createContext<CartDrawerContextType | undefined>(
  undefined
);

export function CartDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartTickets, setCartTickets] = useState<iCartTicket[]>([]);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  return (
    <CartDrawerContext.Provider
      value={{ isOpen, toggleDrawer, closeDrawer, cartTickets, setCartTickets }}
    >
      {children}
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawer() {
  const context = useContext(CartDrawerContext);
  if (!context) {
    throw new Error(
      "useCartDrawer deve ser usado dentro de um CartDrawerProvider"
    );
  }
  return context;
}
