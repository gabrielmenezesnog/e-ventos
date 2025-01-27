"use client";

import React, { useState } from "react";
import { iTickets } from "@/interfaces/iTickets";
import Loading from "@/components/atoms/Loading";
import Image from "next/image";

interface iProps {
  ticket: iTickets;
  isLoading?: boolean;
}

const EventBuySection: React.FC<iProps> = ({ ticket, isLoading }) => {
  const [hasImageError, setHasImageError] = useState(false);
  const imageUrl = ticket.image_url || "/images/default-image.jpg";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray_11 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <Image
              className="rounded-md w-full h-auto object-cover"
              src={hasImageError ? "/images/default-image.jpg" : imageUrl}
              alt={ticket.name}
              width={560}
              height={440}
              onError={() => setHasImageError(true)}
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col space-y-8">
            <div>
              <p className="text-lg text-gray_5 mb-5">{ticket.description}</p>

              <h3 className="text-xs font-semibold mb-4 text-white">
                TIPO DO INGRESSO
              </h3>

              <ul className="flex flex-row items-center gap-3 mb-5">
                {ticket.ticket_types?.map((ticket) => {
                  return (
                    <li key={ticket.type}>
                      <button className="sub_button">{ticket.type}</button>
                    </li>
                  );
                })}
              </ul>

              <button className="font-medium">COMPRE AGORA</button>
            </div>

            <div>
              <h3 className="text-xs font-semibold mb-4 text-white">
                INFORMAÇÕES
              </h3>

              <div className="bg-black p-6 rounded-md shadow-sm">
                <ul className="font-normal text-lg space-y-2 text-gray_5">
                  <li>
                    Data: {new Date(ticket.date).toLocaleDateString("pt-BR")}
                  </li>
                  <li>Local: {ticket.local}</li>
                  <li>Vendidos: {ticket.sold_quantity}</li>
                  <li>Restantes: {ticket.available_quantity}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventBuySection;
