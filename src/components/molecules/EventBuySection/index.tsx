"use client";

import React, { useState, useCallback } from "react";
import { iTickets } from "@/interfaces/iTickets";
import Loading from "@/components/atoms/Loading";
import Image from "next/image";
import Input from "@/components/atoms/Input";

interface iProps {
  ticket: iTickets;
  isLoading?: boolean;
}

const EventBuySection: React.FC<iProps> = ({ ticket, isLoading }) => {
  const [ticketType, setTicketType] = useState("PISTA");
  const [ticketQuantity, setTicketQuantity] = useState<number | null>(1);
  const [selectedTickets, setSelectedTickets] = useState<
    { type: string; quantity: number }[]
  >([]);
  const [hasImageError, setHasImageError] = useState(false);

  const imageUrl = ticket.image_url || "/images/default-image.jpg";

  const handleChangeType = useCallback((type: string) => {
    setTicketType(type);
    setTicketQuantity(1);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (ticketQuantity === null) return;
    setSelectedTickets((prevTickets) => {
      const existingTicket = prevTickets.find((t) => t.type === ticketType);
      if (existingTicket) {
        return prevTickets.map((t) =>
          t.type === ticketType ? { ...t, quantity: ticketQuantity } : t
        );
      }
      return [...prevTickets, { type: ticketType, quantity: ticketQuantity }];
    });
  }, [ticketType, ticketQuantity]);

  const handleRemoveTicket = useCallback((type: string) => {
    setSelectedTickets((prevTickets) =>
      prevTickets.filter((ticket) => ticket.type !== type)
    );
  }, []);

  const handleSelectTicket = useCallback((value: string) => {
    if (value) {
      const quantity = Math.max(1, parseInt(value, 10));
      setTicketQuantity(quantity);
    } else {
      setTicketQuantity(null);
    }
  }, []);

  const getUnityPrice = useCallback(() => {
    const selectedTicket = ticket.ticket_types?.find(
      (item) => item.type === ticketType
    );
    return selectedTicket ? selectedTicket.price : 0;
  }, [ticket.ticket_types, ticketType]);

  const ticketTotalValue = useCallback(() => {
    return selectedTickets.reduce((total, { type, quantity }) => {
      const ticketPrice = ticket.ticket_types?.find(
        (item) => item.type === type
      )?.price;
      return total + (ticketPrice || 0) * quantity;
    }, 0);
  }, [selectedTickets, ticket.ticket_types]);

  if (isLoading) return <Loading />;

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
              <ul className="flex flex-row items-center gap-3 mb-8">
                {ticket.ticket_types?.map(({ type }) => (
                  <li key={type}>
                    <button
                      className={`sub_button ${
                        type === ticketType ? "selected" : ""
                      }`}
                      onClick={() => handleChangeType(type)}
                    >
                      {type}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mb-5">
                <h3 className="text-xs font-semibold mb-4 text-white">
                  VALOR DA UNIDADE
                </h3>

                <p className="text-lg font-medium text-gray_5">
                  {`R$ ${getUnityPrice()}`}
                </p>
              </div>

              <div className="mb-5">
                <h3 className="text-xs font-semibold mb-4 text-white">
                  QUANTIDADE
                </h3>

                <div className="flex flex-row items-center gap-3">
                  <div className="max-w-28">
                    <Input
                      type="number"
                      value={ticketQuantity}
                      onChange={(e) => handleSelectTicket(e.target.value)}
                    />
                  </div>

                  <button
                    className="font-medium bg-gray_6 text-gray_11"
                    onClick={handleAddToCart}
                  >
                    SELECIONAR
                  </button>
                </div>
              </div>

              {selectedTickets.length > 0 && (
                <div className="mb-3">
                  <div className="mb-5">
                    <h3 className="text-xs font-semibold mb-4 text-white">
                      INGRESSOS SELECIONADOS
                    </h3>
                    <ul className="flex flex-row items-center gap-3 rounded-md text-sm">
                      {selectedTickets.map(({ type, quantity }) => (
                        <li
                          key={type}
                          className="relative bg-black rounded-md px-3 py-1 pr-4 text-gray_5 w-fit"
                        >
                          <span>{`${type}: ${quantity}`}</span>

                          <button
                            className="icon_button text-white text-sm absolute right-0 top-0"
                            onClick={() => handleRemoveTicket(type)}
                          >
                            x
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-5">
                    <h3 className="text-xs font-semibold mb-4 text-white">
                      VALOR TOTAL
                    </h3>

                    <p className="text-lg font-medium text-gray_5">
                      {`R$ ${ticketTotalValue().toFixed(2)}`}
                    </p>
                  </div>

                  <button
                    className="font-medium text-white"
                    onClick={handleAddToCart}
                  >
                    IR PARA O CARRINHO
                  </button>
                </div>
              )}
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
