"use client";

import React from "react";
import { iTickets } from "@/interfaces/iTickets";
import Link from "next/link";
import Image from "next/image";

interface iProps {
  tickets: iTickets[];
  isLoading?: boolean;
  vertical?: boolean;
}

const TicketsList: React.FC<iProps> = ({ tickets, isLoading, vertical }) => {
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
    <ul
      className={`mt-5 flex gap-5 pr-5 ${
        vertical
          ? "flex-col max-h-[800px] overflow-y-auto"
          : "overflow-x-auto flex-row lg:max-w-[1320px] lg:overflow-x-scroll pb-5"
      } ml-5`}
    >
      {tickets.map((ticket) => (
        <li
          key={ticket.id}
          className={`flex-shrink-0 w-full p-4 bg-gray_1 shadow-md rounded-lg ${
            vertical ? "" : "max-w-[400px]"
          }`}
        >
          <div className="p-4">
            <div className="flex flex-row items-center gap-2 mb-2">
              <div className="h-2 w-3 bg-primary" />
              <h3 className="text-lg font-bold">{ticket.name}</h3>
            </div>

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

            <div className="flex flex-row items-center gap-2 mt-6">
              <button className="bg-primary text-white font-semibold">
                <Link href={`/event/${ticket.id}`}>Comprar</Link>
              </button>

              <button className="bg-gray_5 text-black font-semibold flex items-center justify-center gap-1">
                <span>+</span>
                <Image
                  src="/images/shopping_cart.svg"
                  alt="Adicionar ao Carrinho"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TicketsList;
