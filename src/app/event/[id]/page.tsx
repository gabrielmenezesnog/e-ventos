import { Suspense } from "react";
import EventPageClient from "./EventPageClient";
import { iTickets } from "@/interfaces/iTickets";
import { iEventPageParams } from "@/interfaces/iPageParams";
import { getTicket } from "@/services/tickets/getTicket";

interface EventPageProps {
  params: Promise<iEventPageParams>;
}

const EventPage = async ({ params }: EventPageProps) => {
  const { id } = await params;

  const ticket: iTickets = await getTicket(id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventPageClient ticket={ticket} />
    </Suspense>
  );
};

export default EventPage;
