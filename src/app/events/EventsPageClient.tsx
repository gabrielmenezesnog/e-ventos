"use client";

import PageHeader from "@/components/atoms/PageTitle";
import EventListSection from "@/components/molecules/EventListSection";
import { iTickets } from "@/interfaces/iTickets";
import { useTranslation } from "@/hooks/useTranslation";

interface EventsPageClientProps {
  tickets: iTickets[];
  isLoading: boolean;
}

export default function EventsPageClient({ tickets, isLoading }: EventsPageClientProps) {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader
        title={t('events.title')}
        subtitle={t('events.subtitle')}
      />

      <div className="my-14">
        <div className="container">
          <EventListSection tickets={tickets} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
