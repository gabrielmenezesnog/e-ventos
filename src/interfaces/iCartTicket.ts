import { iTicketType } from "./iTicketType";

export interface iCartTicket {
  id?: string;
  index: number;
  name?: string;
  price: number;
  type: string;
  quantity: number;
  total_value?: number;
  ticket_types?: iTicketType[];
}
