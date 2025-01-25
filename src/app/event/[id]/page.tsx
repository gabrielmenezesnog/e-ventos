import { getTicket } from "@/services/tickets/getTicket";

interface EventPageProps {
  params: {
    id: string;
  };
}

const EventPage = async ({ params }: EventPageProps) => {
  const { id } = await params;

  const ticket = await getTicket(id);

  if (!ticket) {
    return (
      <div className="p-5">
        <h1>Erro: Ticket não encontrado</h1>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Ticket ID: {ticket.id}</h1>
      <p className="text-lg">Nome: {ticket.name}</p>
      <p className="text-lg">Descrição: {ticket.description}</p>
    </div>
  );
};

export default EventPage;
