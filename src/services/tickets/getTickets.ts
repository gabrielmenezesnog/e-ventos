import { api } from "../api";
import { baseURL } from "../api/config";
import { iTickets } from "@/interfaces/iTickets";
import { iQueryFilters } from "@/interfaces/iFilters";

interface TicketsResponse {
  error: boolean;
  data: iTickets[];
  isLoading: boolean;
}

export const getTickets = async (
  filters?: iQueryFilters
): Promise<TicketsResponse> => {
  let url = `${baseURL}/tickets`;

  if (filters) {
    const queryParams = new URLSearchParams(filters).toString();
    url += `?${queryParams}`;
  }

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
