import { api } from "../api";
import { baseURL } from "../api/config";

export const getUser = async () => {
  const url = `${baseURL}/user`;

  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
