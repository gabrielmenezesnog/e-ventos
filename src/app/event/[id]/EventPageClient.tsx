"use client";

import { useEffect } from "react";
import PageHeader from "@/components/atoms/PageTitle";
import EventBuySection from "@/components/molecules/EventBuySection";
import { iTickets } from "@/interfaces/iTickets";
import { useTranslation } from "@/hooks/useTranslation";
import { useLoading } from "@/context/Loading";

const EventPageClient = ({ ticket }: { ticket: iTickets | null }) => {
  const { t } = useTranslation();
  const { hideLoading } = useLoading();

  useEffect(() => {
    hideLoading();
  }, [hideLoading]);

  if (!ticket) {
    return (
      <div className="p-5">
        <h1>{t('eventPage.ticketNotFound')}</h1>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={ticket.name}
        subtitle={`R$ ${ticket.price.toFixed(2)} | ${t('eventPage.track')}`}
      />

      <EventBuySection ticket={ticket} />
    </div>
  );
};

export default EventPageClient;
