"use client";

import TicketTypeList from "@/components/atoms/TicketTypeList";
import { useCartDrawer } from "@/context/Cart";
import { finishShopping } from "@/services/cart/finishShopping";
import Image from "next/image";
import React from "react";

export default function CartDrawer() {
  const { isOpen, closeDrawer, cartTickets, setCartTickets } = useCartDrawer();

  const handleRemoveItem = (index: number) => {
    setCartTickets((prevTickets) => prevTickets.filter((_, i) => i !== index));
  };

  const total = cartTickets.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const convenienceFee = total * 0.05;
  const totalWithFee = total + convenienceFee;

  const handleFinishShopping = async () => {
    await finishShopping(cartTickets);

    window.location.reload();
  };

  return (
    <div
      className={`fixed top-0 ${
        isOpen ? "right-0" : "-right-full"
      } h-full bg-white transition-right duration-300 ease-in-out shadow-lg z-50 
        w-full sm:w-96`}
    >
      <button
        onClick={closeDrawer}
        className="p-2 bg-gray-200 rounded m-4 text-sm"
      >
        <Image src="/images/close.svg" alt="fechar" width={20} height={20} />
      </button>

      <h2 className="text-xl font-bold p-4 border-b">Carrinho</h2>

      <div className="p-5 overflow-y-auto h-[calc(70%-80px)]">
        {cartTickets.length === 0 ? (
          <p className="text-gray-500 text-center">Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {cartTickets.map((ticket, index) => {
              return (
                <li
                  key={index}
                  className="relative p-4 bg-gray_11 shadow-sm rounded-lg mb-5"
                >
                  <div className="flex flex-row items-center gap-2 mb-2">
                    <div className="h-2 w-3 bg-primary" />
                    <h3 className="text-white">{ticket.name}</h3>
                  </div>

                  <ul className="text-gray_5 text-base mb-5">
                    <li>Quantidade: {ticket.quantity}</li>
                    <li>{`R$ ${ticket.total_value?.toFixed(2)}`}</li>
                  </ul>

                  <TicketTypeList
                    ticketTypes={ticket.ticket_types || []}
                    selectedType={ticket.type}
                    onChangeType={() => {}}
                  />

                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="p-2 bg-gray-400 rounded m-4 text-sm absolute top-0 right-0"
                  >
                    <Image
                      src="/images/close.svg"
                      alt="fechar"
                      width={20}
                      height={20}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {cartTickets.length > 0 && (
        <div className="p-5">
          <p className="text-base">{`Valor dos itens: R$ ${total.toFixed(
            2
          )}`}</p>
          <p className="text-base mb-3">{`Taxa de conveniência: R$ ${convenienceFee.toFixed(
            2
          )}`}</p>
          <h1 className="font-semibold mb-5">{`TOTAL: R$ ${totalWithFee.toFixed(
            2
          )}`}</h1>

          <button
            onClick={() => handleFinishShopping()}
            className="text-white font-semibold w-full"
          >
            FINALIZAR COMPRA
          </button>
        </div>
      )}
    </div>
  );
}
