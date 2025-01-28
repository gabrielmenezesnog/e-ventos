/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useCallback } from "react";
import { iTickets } from "@/interfaces/iTickets";
import Loading from "@/components/atoms/Loading";
import Image from "next/image";
import Input from "@/components/atoms/Input";
import { useCartDrawer } from "@/context/Cart";
import { iCartTicket } from "@/interfaces/iCartTicket";
import TicketTypeList from "@/components/atoms/TicketTypeList";

interface iProps {
  ticket: iTickets;
  isLoading?: boolean;
}

const EventBuySection: React.FC<iProps> = ({ ticket, isLoading }) => {
  const [ticketType, setTicketType] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number | null>(1);
  const [selectedTickets, setSelectedTickets] = useState<iCartTicket[]>([]);
  const [hasImageError, setHasImageError] = useState(false);

  const { isOpen, toggleDrawer, cartTickets, setCartTickets } = useCartDrawer();

  const imageUrl = ticket.image_url || "/images/default-image.jpg";

  const handleChangeType = useCallback((type: string) => {
    const selectedTicketType = ticket.ticket_types?.find(
      (item) => item.type === type
    );

    setSelectedTicket(selectedTicketType);

    setTicketType(type);
    setTicketQuantity(1);
  }, []);

  const handleAddToCart = useCallback(() => {
    const isNotAvailable =
      selectedTicket?.available_quantity < (ticketQuantity || 1);

    if (ticketQuantity === null || isNotAvailable) return;

    const selectedTicketType = ticket.ticket_types?.find(
      (item) => item.type === ticketType
    );

    if (!selectedTicketType) return;

    const index =
      cartTickets.length > 0 ? cartTickets.length : selectedTickets.length;

    const newTicket: iCartTicket = {
      id: ticket.id,
      index,
      name: ticket.name,
      price: selectedTicketType.price,
      type: ticketType,
      quantity: ticketQuantity,
      total_value: selectedTicketType.price * ticketQuantity,
      ticket_types: ticket.ticket_types,
    };

    setSelectedTickets((prevState) => {
      const ticketIndex = prevState.findIndex((t) => t.type === ticketType);

      if (ticketIndex !== -1) {
        const updatedTickets = [...prevState];

        updatedTickets[ticketIndex] = {
          ...updatedTickets[ticketIndex],
          quantity: ticketQuantity,
          total_value: selectedTicketType.price * ticketQuantity,
        };

        return updatedTickets;
      }

      return [...prevState, newTicket];
    });
  }, [ticket, ticketType, ticketQuantity]);

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

  const handleGoToCart = () => {
    setCartTickets((prevTickets) => {
      const updatedTickets = [...prevTickets];

      selectedTickets.forEach((newTicket) => {
        const existingTicketIndex = updatedTickets.findIndex(
          (ticket) => ticket.index === newTicket.index
        );

        if (existingTicketIndex !== -1) {
          // Atualiza a quantidade do ticket existente
          updatedTickets[existingTicketIndex].quantity = newTicket.quantity;
        } else {
          // Adiciona o novo ticket se não existir ainda
          updatedTickets.push(newTicket);
        }
      });

      return updatedTickets;
    });

    if (!isOpen) {
      toggleDrawer();
    }
  };

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

              <TicketTypeList
                ticketTypes={ticket.ticket_types || []}
                selectedType={ticketType}
                onChangeType={handleChangeType}
              />

              {selectedTicket && (
                <div className="mb-5">
                  <h3 className="text-xs font-semibold mb-4 text-white">
                    VALOR DA UNIDADE
                  </h3>

                  <p className="text-lg font-medium text-gray_5">
                    {`R$ ${getUnityPrice()}`}
                  </p>
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-xs font-semibold mb-4 text-white">
                  QUANTIDADE
                </h3>

                <div className="flex flex-row items-center gap-3">
                  <div className="max-w-32">
                    <Input
                      type="number"
                      max={5}
                      value={ticketQuantity}
                      onChange={(e) => handleSelectTicket(e.target.value)}
                    />
                  </div>

                  <button
                    className="font-medium bg-gray_6 text-gray_11"
                    onClick={handleAddToCart}
                  >
                    {selectedTickets.length > 0 ? "ATUALIZAR" : "SELECIONAR"}
                  </button>
                </div>

                {selectedTicket?.available_quantity < (ticketQuantity || 1) && (
                  <p className="text-base text-red-500 mt-3">
                    Quantidade indisponível
                  </p>
                )}
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
                    onClick={() => handleGoToCart()}
                  >
                    ADICIONAR AO CARRINHO
                  </button>
                </div>
              )}
            </div>

            {selectedTicket && (
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
                    <li>Vendidos: {selectedTicket.sold_quantity}</li>
                    <li>Restantes: {selectedTicket.available_quantity}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBuySection;
