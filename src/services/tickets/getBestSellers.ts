import { api } from "../api";
import { baseURL } from "../api/config";

export const getBestSellers = async () => {
  const url = `${baseURL}/best_sellers`;

  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
