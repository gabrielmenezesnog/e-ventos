import PageHeader from "@/components/atoms/PageTitle";
import EventBuySection from "@/components/molecules/EventBuySection";
import { iTickets } from "@/interfaces/iTickets";
import { iEventPageParams } from "@/interfaces/iPageParams";
import { getTicket } from "@/services/tickets/getTicket";

interface EventPageProps {
  params: Promise<iEventPageParams>;
}

const EventPage = async ({ params }: EventPageProps) => {
  const { id } = await params;

  const ticket: iTickets = await getTicket(id);

  if (!ticket) {
    return (
      <div className="p-5">
        <h1>Erro: Ticket não encontrado</h1>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={ticket.name}
        subtitle={`R$ ${ticket.price.toFixed(2)} | PISTA`}
      />

      <EventBuySection ticket={ticket} />
    </div>
  );
};

export default EventPage;
