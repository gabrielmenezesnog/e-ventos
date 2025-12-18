"use client";

import Button from "@/components/atoms/Button";
import TicketTypeList from "@/components/atoms/TicketTypeList";
import { useAuth } from "@/context/Auth";
import { useCartDrawer } from "@/context/Cart";
import { finishShopping } from "@/services/cart/finishShopping";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CartDrawer() {
  const { t } = useTranslation();
  const { isOpen, closeDrawer, cartTickets, setCartTickets } = useCartDrawer();
  const { isLoggedIn } = useAuth();

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
      <Button
        type="default"
        onClick={closeDrawer}
        className="p-2 bg-gray-200 rounded m-4 text-sm"
      >
        <Image src="/images/close.svg" alt={t('cart.close')} width={20} height={20} />
      </Button>

      <h2 className="text-xl font-bold p-4 border-b">{t('cart.title')}</h2>

      <div className="p-5 overflow-y-auto h-[calc(65%-80px)]">
        {cartTickets.length === 0 ? (
          <p className="text-gray-500 text-center">{t('cart.empty')}</p>
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
                    <li>{t('cart.quantity')} {ticket.quantity}</li>
                    <li>{`R$ ${ticket.total_value?.toFixed(2)}`}</li>
                  </ul>

                  <TicketTypeList
                    ticketTypes={ticket.ticket_types || []}
                    selectedType={ticket.type}
                    onChangeType={() => {}}
                  />

                  <Button
                    type="default"
                    onClick={() => handleRemoveItem(index)}
                    className="p-2 bg-gray-400 rounded m-4 text-sm absolute top-0 right-0"
                  >
                    <Image
                      src="/images/close.svg"
                      alt={t('cart.close')}
                      width={20}
                      height={20}
                    />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {cartTickets.length > 0 && (
        <div className="p-5">
          <p className="text-base">{`${t('cart.itemsValue')} R$ ${total.toFixed(
            2
          )}`}</p>
          <p className="text-base mb-3">{`${t('cart.convenienceFee')} R$ ${convenienceFee.toFixed(
            2
          )}`}</p>
          <h1 className="font-semibold mb-5">{`${t('cart.total')} R$ ${totalWithFee.toFixed(
            2
          )}`}</h1>

          {!isLoggedIn && (
            <p className="text-gray-500 text-center text-sm mb-3">
              {t('cart.loginMessage')}
              <span className="text-primary mx-1">
                <Link href="/auth">{t('cart.login')}</Link>
              </span>
              {t('cart.loginSuffix')}
            </p>
          )}

          <Button
            type="default"
            onClick={() => handleFinishShopping()}
            className="text-white font-semibold w-full"
            disabled={!isLoggedIn}
            label={t('cart.finishPurchase')}
          />
        </div>
      )}
    </div>
  );
}
