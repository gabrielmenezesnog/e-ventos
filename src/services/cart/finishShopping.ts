import { iCartTicket } from "@/interfaces/iCartTicket";
import { iTicketType } from "@/interfaces/iTicketType";
import { api } from "../api";
import { baseURL } from "../api/config";

// É mais ou menos assim que deveria ser

// export const finishShopping = async (cartTicket: iCartTicket[]) => {
//   const url = `${baseURL}/tickets`;

//   try {
//     const response = await api.post(url, cartTicket);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// Mas para simular a atualização na API, farei assim:

export const finishShopping = async (cartTickets: iCartTicket[]) => {
  try {
    for (const ticket of cartTickets) {
      if (ticket.id && ticket.ticket_types) {
        const url = `${baseURL}/tickets/${ticket.id}`;
        const { data: apiTicket } = await api.get(url);

        const typeIndex = apiTicket.ticket_types?.findIndex(
          (item: iTicketType) => item.type === ticket.type
        );

        if (typeIndex !== -1) {
          const updatedTicket = {
            ...apiTicket,
            ticket_types: apiTicket.ticket_types.map(
              (ticketType: iTicketType, index: number) => {
                if (index === typeIndex) {
                  return {
                    ...ticketType,
                    available_quantity:
                      ticketType.available_quantity - ticket.quantity,
                    sold_quantity: ticketType.sold_quantity + ticket.quantity,
                  };
                }
                return ticketType;
              }
            ),
            sold_quantity: apiTicket.sold_quantity + ticket.quantity,
            available_quantity: apiTicket.available_quantity - ticket.quantity,
          };

          await api.put(url, updatedTicket);
        }
      }
    }
  } catch (error) {
    console.error("Erro ao finalizar a compra:", error);
    throw error;
  }
};
