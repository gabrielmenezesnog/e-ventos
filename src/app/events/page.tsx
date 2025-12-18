import EventsPageClient from "./EventsPageClient";
import { getTickets } from "@/services/tickets/getTickets";

export default async function EventsPage() {
  const { data: tickets, isLoading } = await getTickets();

  return <EventsPageClient tickets={tickets} isLoading={isLoading} />;
}
