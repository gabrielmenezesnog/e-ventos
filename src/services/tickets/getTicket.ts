import { api } from "../api";
import { baseURL } from "../api/config";

export const getTicket = async (id: string) => {
  const url = `${baseURL}/tickets/${id}`;

  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
