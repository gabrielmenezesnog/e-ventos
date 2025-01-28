export interface iTickets {
  id: number;
  name: string;
  local: string;
  price: number;
  sold_quantity: number;
  date: string;
  description?: string;
  available_quantity?: number;
  total_tickets?: number;
  image_url?: string;
  ticket_types?: {
    type: string;
    price: number;
    available_quantity: number;
    sold_quantity: number;
  }[];
}
