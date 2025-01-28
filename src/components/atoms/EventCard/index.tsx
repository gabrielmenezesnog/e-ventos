"use client";

import Button from "@/components/atoms/Button";
import { iTickets } from "@/interfaces/iTickets";
import Link from "next/link";

interface iProps {
  ticket: iTickets;
  vertical?: boolean;
}

const EventCard = ({ ticket, vertical }: iProps) => {
  const darkClass = "bg-gray_11 shadow-md";
  const lightClass = "bg-gray_1 shadow-md";

  const theme = ticket.sold_quantity > 900 ? darkClass : lightClass;
  const textClass = ticket.sold_quantity > 900 ? "text-white" : "text-gray_11";

  return (
    <li
      key={ticket.id}
      className={`flex-shrink-0 w-full p-4 ${theme} rounded-lg ${
        vertical ? "" : "max-w-[400px]"
      }`}
    >
      <div className="p-4">
        <div className="flex flex-row items-center gap-2 mb-2">
          <div className="h-2 w-3 bg-primary" />
          <h3 className={`text-lg font-bold ${textClass}`}>{ticket.name}</h3>
        </div>

        <p className={`text-sm font-medium mb-5 ${textClass}`}>
          R$ {ticket.price.toFixed(2)}
        </p>

        <p className={`text-sm mb-2 ${textClass}`}>{ticket.local}</p>

        <p className={`text-sm mb-5 ${textClass}`}>
          {new Date(ticket.date).toLocaleDateString("pt-BR")}
        </p>

        {ticket.sold_quantity > 900 && (
          <p className={`text-sm ${textClass}`}>
            {`${ticket.sold_quantity} ingressos vendidos 🔥`}
          </p>
        )}

        <div className="flex flex-row items-center gap-2 mt-6">
          <Button type="default">
            <Link href={`/event/${ticket.id}`}>Comprar</Link>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventCard;
