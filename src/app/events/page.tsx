import PageHeader from "@/components/atoms/PageTitle";
import EventListSection from "@/components/molecules/EventListSection";
import { getTickets } from "@/services/tickets/getTickets";

export default async function EventsPage() {
  const { data: tickets, isLoading } = await getTickets();

  return (
    <div>
      <PageHeader
        title="nossos eventos"
        subtitle="ESCOLHA O MELHOR PARA VOCÊ"
      />

      <div className="my-14">
        <div className="container">
          <EventListSection tickets={tickets} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
