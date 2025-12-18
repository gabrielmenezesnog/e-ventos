"use client";

import { iCartTicket } from "@/interfaces/iCartTicket";
import { iComponentWithChildren } from "@/interfaces/iComponent";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

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

export function CartDrawerProvider({ children }: iComponentWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartTickets, setCartTickets] = useState<iCartTicket[]>([]);

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cartTickets");
    if (storedCart) {
      setCartTickets(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cartTickets", JSON.stringify(cartTickets));
  }, [cartTickets]);

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
