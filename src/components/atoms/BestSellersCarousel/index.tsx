"use client";

import React from "react";
import { iTickets } from "@/interfaces/iTickets";

interface iProps {
  tickets: iTickets[];
  isLoading?: boolean;
}

const BestSellersCarousel: React.FC<iProps> = ({ tickets, isLoading }) => {
  if (isLoading) {
    return <p className="mt-5 text-gray_6">Carregando...</p>;
  }

  if (tickets.length === 0) {
    return (
      <p className="mt-5 text-gray_6">
        Não há ingressos disponíveis no momento.
      </p>
    );
  }

  return (
    <ul className="mt-5 flex gap-5 overflow-x-auto lg:max-w-[1320px] lg:flex-row lg:overflow-x-scroll lg:flex-nowrap sm:flex-col ml-5">
      {tickets.map((ticket) => (
        <li
          key={ticket.id}
          className="flex-1 min-w-[300px] p-4 bg-gray_1 shadow-md rounded-lg"
        >
          <div className="p-4">
            <h3 className="text-lg font-bold">{ticket.name}</h3>
            <p className="text-sm text-gray-600 font-medium mb-5">
              R$ {ticket.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mb-2">{ticket.local}</p>
            <p className="text-sm text-gray-600 mb-5">
              {new Date(ticket.date).toLocaleDateString("pt-BR")}
            </p>
            <p className="text-sm text-gray-600">
              {`${ticket.sold_quantity} ingressos vendidos 🔥`}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BestSellersCarousel;
