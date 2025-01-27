import PageHeader from "@/components/atoms/PageTitle";
import { iTickets } from "@/interfaces/iTickets";
import { getTicket } from "@/services/tickets/getTicket";

interface EventPageProps {
  params: {
    id: string;
  };
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
        subtitle={`R$ ${ticket.price.toFixed(2)}`}
      />
    </div>
  );
};

export default EventPage;
