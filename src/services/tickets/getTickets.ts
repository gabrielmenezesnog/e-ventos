import { api } from "../api";
import { baseURL } from "../api/config";
import { iTickets } from "@/interfaces/iTickets";

interface TicketsResponse {
  error: boolean;
  data: iTickets[];
  isLoading: boolean;
}

export const getTickets = async (): Promise<TicketsResponse> => {
  const url = `${baseURL}/tickets`;

  const initialState: TicketsResponse = {
    error: false,
    data: [],
    isLoading: false,
  };

  return api
    .get(url)
    .then((response) => ({
      ...initialState,
      data: response.data,
    }))
    .catch(() => ({
      ...initialState,
      error: true,
    }));
};
