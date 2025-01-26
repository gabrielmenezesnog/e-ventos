import PageHeader from "@/components/atoms/PageTitle";
import TicketsList from "@/components/atoms/TicketsList";
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
          <TicketsList tickets={tickets} isLoading={isLoading} vertical />
        </div>
      </div>
    </div>
  );
}
